// uploadWorker.mjs
import { parentPort } from "worker_threads";
import ExcelJS from "exceljs";
import { Readable } from "stream";

import { addMessage, deleteMessage } from "../model/MessageModel.mjs";
import { updatePrinterById } from "../model/PrinterModel.mjs";

parentPort.on("message", async (fileInfo) => {
    try {
        const { name, data, idPrinter } = fileInfo;

        const ext = name.split(".").pop();
        const buffer = Buffer.from(data, "base64");

        const workbook = new ExcelJS.Workbook();
        const stream = Readable.from([buffer]);

        if (ext === "csv") {
            await workbook.csv.read(stream);
        } else if (ext === "xlsx") {
            await workbook.xlsx.read(stream);
        }

        const worksheet = workbook.worksheets[0];

        deleteMessage(idPrinter);

        let totalInserted = 0;
        const batchSize = 1000;
        let batch = [];

        for (let i = 2; i <= worksheet.rowCount; i++) {
            const row = worksheet.getRow(i);
            let serial = joinArr(row.values).slice(0, 14);

            if (!serial) continue;

            batch.push({
                id_printer: Number(idPrinter),
                field_name: "code",
                field_value: serial.trim(),
            });

            if (batch.length === batchSize) {
                await addMessage(batch);
                totalInserted += batch.length;
                batch = [];
            }
        }

        if (batch.length > 0) {
            await addMessage(batch);
            totalInserted += batch.length;
        }

        await updatePrinterById({
            id: Number(idPrinter),
            max_message: totalInserted,
            system_counter: 0,
        });

        parentPort.postMessage({
            success: true,
            max_message: totalInserted
        });

    } catch (err) {
        parentPort.postMessage({
            success: false,
            error: err.message
        });
    }
});

function joinArr(arr) {
    return arr.filter(Boolean).join("");
}
