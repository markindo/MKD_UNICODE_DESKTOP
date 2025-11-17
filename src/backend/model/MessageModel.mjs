// models/printerModel.js
import { getDB } from '../database/database.mjs';
export async function deleteMessage(id) {
    const db = await getDB();
    return await db.prepare('DELETE FROM message WHERE id_printer = ?').run(id);
}
export async function addMessage(messages) {
    const db = await getDB();
    db.exec("BEGIN TRANSACTION");
    try {
        const stmt = await db.prepare(`
      INSERT INTO message (id_printer, field_name, field_value)
      VALUES (?, ?, ?)
    `);

        // jalankan insert multiple
        for (const msg of messages) {
            await stmt.run(msg.id_printer, msg.field_name, msg.field_value);
        }

        await db.exec("COMMIT");

        return { success: true, totalInserted: messages.length };
    } catch (err) {
        await db.exec("ROLLBACK");
        console.error("Insert error:", err);
        return { success: false, error: err.message };
    } finally {
        await db.close();
    }
}
export async function getMessagesByPrinterId(id_printer, productSum) {
    const db = await getDB();
    return await db.prepare('SELECT * FROM message WHERE id_printer = ? and flag =0 order by id asc limit ?').all(id_printer, productSum);
}

export async function countMessagesByPrinterId(id_printer) {
    const db = await getDB();
    const result = await db.prepare(`SELECT COUNT(*) as total,
                                        SUM(flag=0 ) as unprinted,
                                        SUM(flag=1 ) as printed
                                        FROM message WHERE id_printer = ?`).get(id_printer);
    return result;
}

export async function updateMessageFlag(id, flag) {
    const db = await getDB();
    await db.prepare(`UPDATE message SET flag = ? WHERE id = ?`).run(flag, id);
    return { success: true };
}