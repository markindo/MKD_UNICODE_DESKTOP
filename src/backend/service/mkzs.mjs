//import { PrinterSocket } from "./tcpsocket.mjs";
import { PrinterSocket } from "./udpsocket.mjs"
import { Buffer } from "buffer";
import { dialog } from 'electron';


const error0x2 = [
    "No Error",
    "Error: Print File 01",
    "Error: Print File 02",
    "Error: Print File 03",
    "Error: Print File 04",
    "Error: Print File 05",
    "Error: Print File 06",
    "Error: Print File 07",
    "Error: Print File 08",
]
const error0x3 = [
    "No Error",
    "Error: Host SelfCheck Error 01 - Controller is unregistered. ",
    "Error: Host SelfCheck Error 02 - Fail to detect RAM.",
    "Error: Host SelfCheck Error 01 - Fail to detect EEPROM.",
    "Error: Host SelfCheck Error 01 - Internal error. Please update software.",
    "Error: Host SelfCheck Error 01 - Fail to initialize communication.",
]
const error0x4 = [
    "No Error",
    "Error: Abnormal Shutdown-01",
    "Error: Abnormal Shutdown-01",
    "Error: Abnormal Shutdown-01",
    "Error: Abnormal Shutdown-01",
    "Error: Abnormal Shutdown-01",
    "Error: Abnormal Shutdown-02"
]
const error0x5 = [
    "No Error",
    " NOx. Head Selfcheck-01",
]

const error0x6 = [
    "No Error",
    "Error: NOx. Ink Box Check-01",
    "Error: NOx. Ink Box Check-02",
    "Error: NOx. Ink Box Check-03",
    "Error: NOx. Ink Box Check-04",
    "Error: NOx. Low Ink Value-01",
    "Error: NOx. Low Ink Value-01"
]
const error0x7 = [
    "No Error",
    "Error: NOx. Printhead Communication-01",
    "Error: NOx. Printhead Communication-02",
    "Error: NOx. Printhead Communication-03",
    "Error: NOx. Printhead Communication-04",
    "Error: NOx. Printhead Communication-05",
    "Error: NOx. Printhead Communication-06",
    "Error: NOx. Printhead Communication-07",
    "Error: NOx. Printhead Communication-08",
    "Error: NOx. Printhead Communication-09",
    "Error: NOx. Printhead Communication-0A",
    "Error: NOx. Printhead Communication-0B",
    "Error: NOx. Printhead Communication-0C",
    "Error: NOx. Printhead Communication-0D",
    "Error: NOx. Printhead Communication-0E",
    "Error: NOx. Printhead Communication-0F",
    "Error: NOx. Printhead Communication-10",
]
const error0x8 = [
    "No Error",
    "Print Overspeed-01",
    "Error: Print Overspeed-02",
    "Error: Print Overspeed-03",
]
function getDec2byte(x, y) {
    const buf = Buffer.from([x, y]);
    const decLE = buf.readUInt16LE(0);
    return decLE;
}
export class MKZS {
    constructor(host, port, id) {
        this.host = host
        this.port = port
        this.client = null
        this.out = { id: id, counter: 0, }
        this.status = {}
        this.lastMsg = ""
        this.targetCount = 0
        this.startCount = 0
        this.startPrint = "mkx"
        this.sendInterval = null
        this.printerStatus = "stop"
        this.triggerCount = 0
        this.printCount = 0
        this.errorStatus = "No Error"
        this.speed = 0
        this.ink1 = 0
        this.ink2 = 0
        //this.dataSend = ["a513200085000000e4be015014000000060001000200080004000510091056fd"]
        //this.flag = {
        //    dataSend: 0
        //}

    }
    stop() {
        this.client.stop()
    }
    start() {
        const options = {
            host: this.host,
            port: this.port,
            keepAlive: true,
            // timeout: 10000
        };
        const handlers = {
            handleData: this.handleData,
            onClose: (arrArg) => {
                console.log("Closed", arrArg[4])
                dialog.showErrorBox("Error", "Koneksi Printer Terputus");
            },
            onError: (err, arrArg) => {
                console.error("Error:", err.message, "on", arrArg[4])
                dialog.showErrorBox("Error", "Koneksi Printer Error " + err.message);
            }
        };
        this.client = new PrinterSocket(options, handlers);
        this.client.start();
    }

    sendData(data) {
        console.log("Sending data to printer:", data);
        this.client.send(data)
    }
    sendHex(data) {
        try {
            console.log("Sending hex to printer:", data);
            this.client.sendHex(data)
        } catch (error) {
            dialog.showErrorBox("Error", "Printer belum terhubung/ koneksi error");
        }

    }
    get() {
        return this.client?.readyState
    }
    handleData = async (data) => {
        console.log("Data received: ", data);
        //handle ketika command slah
        if (data[0] == 0xcc && data[1] == 0x55 && data[2] == 0x95) {
            dialog.showErrorBox("Error", "WRONG COMMAND");
            this.startPrint = false


        }
        else if (data[0] == 0xcc && data[1] == 0xa8) {
            //handle status
            this.client.readyState = "connected";
            const status = data[5]
            status == 0 ? this.printerStatus = "stop" : this.printerStatus = "start"
            this.triggerCount = getDec2byte(data[8], data[9])
            this.printCount = getDec2byte(data[10], data[11])
            this.speed = data[12]
            this.ink1 = data[15]
            if (data > 17) {
                this.ink2 = data[18]
            }
            console.log("Panjang", data.length)

            //error status
            if (data[7] == 0x20) {
                this.errorStatus = error0x2[data[6]]
            }
            else if (data[7] == 0x30) {
                this.errorStatus = error0x3[data[6]]
            }
            else if (data[7] == 0x40) {
                this.errorStatus = error0x4[data[6]]
            }
            else if (data[7] == 0x50) {
                this.errorStatus = error0x5[data[6]]
            }
            else if (data[7] == 0x51) {
                this.errorStatus = error0x5[data[6]]
            }
            else if (data[7] == 0x60) {
                this.errorStatus = error0x6[data[6]]
            }
            else if (data[7] == 0x61) {
                this.errorStatus = error0x6[data[6]]
            }
            else if (data[7] == 0x70) {
                this.errorStatus = error0x7[data[6]]
            }
            else if (data[7] == 0x71) {
                this.errorStatus = error0x7[data[6]]
            }
            else if (data[7] == 0x80) {
                this.errorStatus = error0x8[data[6]]
            }
            // console.log("trigger time", triggerTime);
            // const triggerTime = data[8] << 8 | data[9]
            // const printTime = data[10] << 8 | data[11]
            // console.log("trigger time", triggerTime);
            // console.log("print time", printTime);
        }

        //handle print msg
        else if (data[0] == 0xcc && data[1] == 0xa5) {
            this.startPrint = true
            console.log("last msg", this.lastMsg);

            // this.client.sendHex("aaa505352c362c373f")
            // this.client.sendHex(this.lastMsg)
        }

        //handle ganti job
        else if (data[0] == 0xcc && data[1] == 0xA4) {
            this.startPrint = false
            dialog.showMessageBox({
                type: "info",
                title: "Success",
                message: "Ganti Job Berhasil",
            });

            // handle data ketika ganti job

        }
        else if (data[0] == 0xcc && data[1] == 0xa1) {
            this.startPrint = false
            this.printerStatus = "start"
            dialog.showMessageBox({
                type: "info",
                title: "Success",
                message: "Start Printer Berhasil",
            });
        }
        else if (data[0] == 0xcc && data[1] == 0xa2) {
            this.printerStatus = "stop"
            this.startPrint = false
            dialog.showMessageBox({
                type: "info",
                title: "Success",
                message: "Stop Printer Berhasil",
            });


        }
        //this.client.pause();

    }
}