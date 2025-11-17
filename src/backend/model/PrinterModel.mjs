// models/printerModel.js
import { getDB } from '../database/database.mjs';

export async function getPrinters() {
    const db = await getDB();
    return db.prepare('SELECT * FROM printer').all();
}

export async function getPrinterById(id) {
    const db = await getDB();
    return await db.get('SELECT * FROM printer WHERE id = ?', id);
}

export async function addPrinter(printer) {
    const db = await getDB();
    return db.prepare(
        `INSERT INTO 
            printer (ip_address, port, port_ack, name, line ,product_sum) 
        VALUES 
            (?, ?, ?, ?, ?, ?)`
    )
        .run(
            printer.ip_address,
            printer.port,
            printer.port_ack,
            printer.name,
            printer.line,
            printer.product_sum
        );
}

// export async function updatePrinter(printer) {
//     const db = await getDB();
//     return await db.prepare(
//         `UPDATE 
//             printer 
//         SET 
//             ip_address = ?, 
//             port = ?,
//             port_zbc = ?,
//             name = ?, 
//             line = ? 
//         WHERE
//             id = ?`)
//         .run(
//             printer.ip_address,
//             printer.port,
//             printer.port_zbc,
//             printer.name,
//             printer.line,
//             printer.id
//         );
// }
export async function updatePrinterStatus(printer) {
    const db = await getDB();
    return await db.prepare(
        `UPDATE 
            printer 
        SET
            message=?,
            status=?,
            system_counter=?,
            product_counter =?,
            marking_counter =?,
            counter =?
           
        WHERE 
            id = ?
        `
    ).run(
        printer.message,
        printer.status,
        printer.systemCounter,
        printer.productCounter,
        printer.markingCounter,
        printer.counter,

        printer.id
    )
}

export async function updatePrinterById(printer) {
    const db = await getDB();
    if (!printer.id) {
        throw new Error("Missing printer.id");
    }
    const { id, ...fields } = printer;
    const keys = Object.keys(fields);
    if (keys.length === 0) {
        throw new Error("No fields to update");
    }
    const setClause = keys.map(key => `${key} = ?`).join(", ");
    const values = keys.map(key => fields[key]);
    const query = `UPDATE printer SET ${setClause} WHERE id = ?`;
    const stmt = await db.prepare(query);
    await stmt.run(...values, id);
    return { success: true, updatedId: id };
}


export async function deletePrinter(id) {
    const db = await getDB();
    return await db.prepare('DELETE FROM printer WHERE id = ?').run(id);
}
