// models/printerModel.js
import { getDB } from '../database/database.mjs';
export async function addLog(printer) {
    const db = await getDB();
    return db.prepare(
        `INSERT INTO 
            log (
                    id_printer,
                    message,
                    system_counter,
                    product_counter,
                    marking_counter,
                    counter,
                    status
                    ) 
        VALUES 
            (?, ?, ?, ?, ?, ?,?)`
    )
        .run(
            printer.id_printer,
            printer.message,
            printer.system_counter,
            printer.product_counter,
            printer.marking_counter,
            printer.counter,
            printer.status
        );
}
export async function getLogByDate(printer) {
    console.log("data printerku", printer)
    const db = await getDB();
    return db.prepare(
        `SELECT id_printer, message, system_counter, product_counter, marking_counter, counter, status, timestamp
         From 
            Log 
        where 
            id_printer =? 
        and 
            timestamp between ? and ?           `
    )
        .all(
            printer.id_printer,
            printer.start_date,
            printer.end_date
        );
}