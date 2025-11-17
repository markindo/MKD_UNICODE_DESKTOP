
import net from 'net';
import { Buffer } from 'buffer';

import { dialog } from 'electron';
export class PrinterSocket {
    constructor(options, handlers = {}, services = {}) {
        //  this.arrArg = arrArg;
        this.options = options;

        this.handleData = handlers.handleData;
        this.onCloseCallback = handlers.onClose;
        this.onErrorCallback = handlers.onError;
        //this.onConnectedCallback = handlers.onConnected; // ⬅️ Tambahkan ini
        this.updatePrinterProcess = services.updatePrinterProcess;
        this.connection = false;
        this.reconnecting = true;
        this.startPrint = "tcp"
        this.client = new net.Socket();
        this.setupListeners();
        this.readyState = "closed"; // default

    }

    setupListeners() {
        this.client.on('data', (data) => this.onData(data));
        this.client.on('close', () => this.onClose());
        this.client.on('error', (err) => this.onError(err));
        this.client.on('timeout', () => this.onTimeout());
    }

    stop() {
        this.connection = false;
        this.client.end();     // tutup koneksi dengan cara normal (FIN)
        this.client.destroy(); // pastikan resource dibersihkan

    }
    start() {
        if (this.client.connecting || this.connection) return;
        this.client.connect(this.options, () => {
            // // this.connection = true;
            // // Set timeout jika disediakan
            // if (this.options.timeout) {
            //     this.client.setTimeout(this.options.timeout);
            // }

        });
        this.client.on("connect", () => {
            this.connection = true;
            this.readyState = "connected"; // Update state
            console.log("Socket connected:")
        })

    }

    send(data, encoding = 'utf8') {
        if (!this.client.destroyed && this.client.writable) {
            // this.connection = true;
            this.client.write(data, encoding);
        } else {
            console.warn("Cannot send: socket port " + this.options.port + " is closed/destroyed");
            dialog.showErrorBox("Error", "Cannot send: socket port " + this.options.port + " is closed/destroyed");

            this.connection = false
        }
    }
    pause() {
        this.client.pause();
    }
    sendHex(hexStr) {
        this.client.resume();
        const buffer = Buffer.from(hexStr, 'hex');
        this.send(buffer);

    }

    handleConnection() {
        // this.connection = true;
        console.log("handleConnection")
        // if (this.updatePrinterProcess) {
        //     this.updatePrinterProcess(this.arrArg, "Ready")
        //         .then((res) => console.log(res))
        //         .catch(console.error);
        // }
    }

    onData(data) {
        try {
            this.handleData?.(data);
        } catch (error) {
            console.error("Error in handleData:", error);
        }
    }

    onClose() {
        console.warn("Socket closed:");
        this.connection = false;
        this.readyState = "closed";
    }
    // onConnected() {
    //     this.connection = true;
    //     console.log("Socket connected:")
    // }


    onError(err) {
        console.error("Socket error:", err);
        this.onErrorCallback?.(err);
        this.connection = false;
        this.readyState = "Error";



        // if (!this.reconnecting) {
        //     this.reconnecting = true;
        //     setTimeout(() => this.reconnect(), 2000);
        // }
    }

    onTimeout() {
        console.warn("Socket timeout:");
        this.connection = false;
        if (!this.reconnecting) {
            this.reconnecting = true;
            setTimeout(() => this.reconnect(), 3000);
        }
    }

    async destroyConnection() {
        this.client.removeAllListeners();
        this.client.destroy();
        this.connection = false;
    }

    // reconnect() {
    //     console.log("Reconnecting to", this.options.host, ":", this.options.port);

    //     // Hapus listener dan hancurkan socket lama
    //     this.client.removeAllListeners();
    //     this.client.destroy();

    //     // Buat socket baru
    //     this.client = new net.Socket();
    //     this.connection = false;

    //     this.setupListeners();

    //     this.client.connect(this.options, () => {
    //         this.reconnecting = false;

    //         if (this.options.timeout) {
    //             this.client.setTimeout(this.options.timeout);
    //         }


    //     });

    //     this.client.on('error', (err) => {
    //         console.error("Reconnect failed:", err.message);
    //         // if (!this.connection) {
    //         //     setTimeout(() => this.reconnect(), 3000); // retry terus
    //         // }
    //     });
    //     this.client.on("connect", () => {
    //         this.connection = true;
    //         console.log("Socket connected:")
    //     })
    // }
}

