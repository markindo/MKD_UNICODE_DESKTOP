import ExcelJS from "exceljs";
import { Readable } from "stream";
import { addMessage, deleteMessage } from "../model/MessageModel.mjs"
import { updatePrinterById } from "../model/PrinterModel.mjs";
export async function uploadData(UPLOAD_DIR, path, fileInfo) {
    //ipcMain.handle("save-file", async (event, fileInfo) => {
    try {
        const { name, data, idPrinter } = fileInfo;
        const parseName = name.split(".")
        const ext = parseName[parseName.length - 1]
        console.log(ext)
        const buffer = Buffer.from(data, "base64");
        // fs.writeFileSync(filePath, buffer);
        // upload file excel
        const workbook = new ExcelJS.Workbook();
        const stream = bufferToStream(buffer);
        if (ext == "csv") {
            await workbook.csv.read(stream, { map: undefined }); // options opsional
        }
        else if (ext == "xlsx") {
            await workbook.xlsx.read(stream);
        }
        const worksheet = workbook.worksheets[0]
        const batchSize = 1000;
        let batch = [];
        let totalInserted = 0;
        deleteMessage(idPrinter)
        for (let i = 2; i <= worksheet.rowCount; i++) {
            const row = worksheet.getRow(i);
            let serial = joinArr(row.values).slice(0, 14);
            // console.log(joinArr(row.values))
            console.log(row.values)
            if (!serial) continue; // skip baris kosong
            batch.push({
                id_printer: parseInt(idPrinter),
                field_name: "code",
                field_value: serial.toString().trim(),

            });

            if (batch.length === batchSize) {

                await addMessage(batch);

                totalInserted += batch.length;
                // console.log(`Inserted ${totalInserted} records so far...`);
                batch = [];
            }

        }

        // Simpan sisa data
        if (batch.length > 0) {
            await addMessage(batch);
            totalInserted += batch.length;
        }

        const dataSave = {
            id: parseInt(idPrinter),
            max_message: totalInserted,
            system_counter: 0
        }
        updatePrinterById(dataSave)
        console.log("masuksini")
        return { success: true, path: "C:", max_message: totalInserted };
    } catch (err) {
        console.error(err);
        return { success: false, error: err.message };
    }
}
function bufferToStream(buffer) {
    // Node 16+ : Readable.from(buffer) juga bekerja, tapi ini cara kompatibel
    return Readable.from([buffer]);
}
function joinArr(arr) {
    return arr.filter(Boolean).join("");
}