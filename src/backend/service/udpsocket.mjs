import dgram from "dgram";
import { Buffer } from "buffer";
import { dialog } from 'electron';

export class PrinterSocket {
    constructor(options, handlers = {}, services = {}) {
        this.options = options; // { host, port }
        this.handleData = handlers.handleData;
        this.onCloseCallback = handlers.onClose;
        this.onErrorCallback = handlers.onError;
        this.updatePrinterProcess = services.updatePrinterProcess;

        this.connection = false;
        this.reconnecting = true;
        this.readyState = "closed"; // default

        this.client = dgram.createSocket("udp4");
        this.setupListeners();

    }

    setupListeners() {
        this.client.on("message", (msg, rinfo) => this.onData(msg, rinfo));
        this.client.on("close", () => this.onClose());
        this.client.on("error", (err) => this.onError(err));
    }

    start() {
        // UDP tidak perlu connect, tapi bisa "bind" kalau mau terima data
        if (this.connection) return;
        this.client.bind(() => {
            this.connection = true;

            console.log("UDP socket ready (client)");
        });
    }

    stop() {
        this.connection = false;
        this.client.close();
    }

    send(data, encoding = "utf8") {
        if (!this.connection) {
            console.warn("Cannot send: UDP socket not ready");
            dialog.showErrorBox("Error", "Printer belum terhubung/ koneksi error");

            return;
        }
        const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data, encoding);
        this.client.send(buffer, this.options.port, this.options.host, (err) => {
            if (err) {
                console.error("UDP send error:", err);
            }
        });
    }

    sendHex(hexStr) {
        const buffer = Buffer.from(hexStr, "hex");
        this.send(buffer);
    }

    onData(data, rinfo) {
        try {
            this.handleData?.(data, rinfo);
        } catch (error) {
            console.error("Error in handleData:", error);
        }
    }

    onClose() {
        console.warn("UDP socket closed");
        this.connection = false;
        this.readyState = "closed";
        //this.onCloseCallback?.();
    }

    onError(err) {
        console.error("UDP socket error:", err);
        this.connection = false;
        this.readyState = "error";
        this.onErrorCallback?.(err);
    }

    async destroyConnection() {
        this.client.removeAllListeners();
        this.client.close();
        this.connection = false;
    }
}
