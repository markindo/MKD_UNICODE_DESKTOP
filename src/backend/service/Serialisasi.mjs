import { PrinterSocket } from "./tcpsocket.mjs";
import { getMessagesByPrinterId, countMessagesByPrinterId, updateMessageFlag } from "../model/MessageModel.mjs";
import { addLog } from "../model/LogModel.mjs";
export class Serialisasi {
    constructor(host, port, portAck, id, systemCounter = 0, productCounter = 0, markingCounter = 0, productSum = 1, counter = 0) {
        this.host = host
        this.port = port
        this.portAck = portAck
        this.client = null
        this.client2 = null
        this.id = id
        this.out = { id: id, counter: 0, }
        this.flag = {
            dataSend: 0
        }
        this.lastMsg = ""
        this.messages = []
        this.systemCounter = systemCounter
        this.productCounter = productCounter
        this.markingCounter = markingCounter
        this.status = "n/a"
        this.counter = counter
        this.productSum = productSum

    }
    async connect() {
        const options = {
            host: this.host,
            port: this.port,
            keepAlive: true,
            // timeout: 10000
        };

        const handlers = {
            handleData: this.handleData,
            onClose: (arrArg) => console.log("Closed", arrArg[4]),
            onError: (err, arrArg) =>
                console.error("Error:", err.message, "on", arrArg[4]),
        };
        const handlers2 = {
            handleData: this.handleData2,
            onClose: (arrArg) => console.log("Closed2", arrArg[4]),
            onError: (err, arrArg) =>
                console.error("Error:", err.message, "on", arrArg[4]),
        };

        if (this.client != null) {
            this.client = null
        }
        if (this.client2 != null) {
            this.client2 = null
        }
        console.log("Connecting to printer", options)
        this.client = new PrinterSocket(options, handlers);
        this.client.start();
        options.port = this.portAck
        this.client2 = new PrinterSocket(options, handlers2);
        this.client2.start();
        this.messages = await getMessagesByPrinterId(this.id, this.productSum)


    }
    stop() {
        //  this.client.stop()
        this.client2.stop()
        setTimeout(() => {
            this.client.stop()
        }, 1000
        )

    }

    get() {
        return this.out
    }
    async startPrint() {
        console.log("Starting")
        if (this.client != null && this.client.connection == true) {
            this.client.send("Start;\r\n")

        }
    }
    async stopPrint() {
        console.log("Stopping")
        if (this.client != null && this.client.connection == true) {
            this.client.send("Stop;\r\n")

        }
    }


    handleData = async (data) => { //kirim message ke printer
        // console.log("Data received: ", data);
        console.log("Data received1: ", data);
    }
    handleData2 = async (data) => { // membaca ACK dari printer
        const ack = data.toString()
        try {
            const parsingLine = ack.split("\r\n")
            parsingLine.forEach(async line => {
                const parse = line.split(";")
                if (parse[1] == "MarkingCounterChanged") {
                    this.markingCounter = parse[2]
                    console.log("Counter", this.counter)
                    let msgSend = "SetVars;"
                    let msg = ""
                    let counting = 1

                    this.messages.forEach(async (msg, i) => {
                        msgSend += `QR${counting};~1${msg.field_value};B1.${counting};${msg.field_value.toString().slice(0, 7)};B2.${counting};${msg.field_value.toString().slice(-7)};`
                        counting++
                    });
                    msgSend += `\r\n`
                    //console.log("msgSend", msgSend)
                    this.client.send(msgSend)
                    this.messages.forEach(async (msg, i) => {
                        await updateMessageFlag(msg.id, 1)
                        0
                    });
                    const dataLog = {
                        "id_printer": this.id,
                        "message": JSON.stringify(this.messages),
                        "system_counter": this.systemCounter,
                        "product_counter": this.productCounter,
                        "marking_counter": this.markingCounter,
                        "counter": this.counter,
                        "status": this.status

                    }
                    await addLog(dataLog)
                    this.messages = []
                    this.messages = await getMessagesByPrinterId(this.id, this.productSum)
                    this.systemCounter++

                    this.counter += 1 * this.productSum
                    // SetVars;Var1;abc;Var2;123;Ser1;001;<CR><LF></LF>
                }
                else if (parse[1] == "ProductCounterChanged") {
                    this.productCounter = parse[2]
                    console.log("ProductCounterChanged:", this.productCounter);
                }

                else if (parse[1] == "StatusChanged") {
                    this.status = parse[2]
                    console.log("StatusChanged:", this.status);
                }
            });
        } catch (error) {
            console.error("Error parsing ACK:", error);
        }
        // console.log("Data received: ", data);

        // this.lastMsg = this.messages[this.counter].field_value
        // console.log("To Printer", this.messages[this.counter].field_value)
        // this.client.send(this.messages[this.counter].field_value)
        // updateMessageFlag(this.messages[this.counter].id, 1)
        // if (this.counter >= this.messages.length - 1) {
        //     console.log("All messages sent");
        //     this.messages = await getMessagesByPrinterId(this.id)
        //     this.counter = 0
        //     return;
        // }

    }
}