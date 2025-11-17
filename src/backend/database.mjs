import { DatabaseSync } from 'node:sqlite';

export class SQLiteDatabase {
    constructor(filename = 'db.sqlite') {
        this.db = new DatabaseSync(filename);
        this.initTables();
    }

    initTables() {
        // Tabel printer
        this.db.exec(`
      CREATE TABLE IF NOT EXISTS printer (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip_address TEXT,
        port INTEGER DEFAULT 0,
        port_zbc INTEGER DEFAULT 0,
        name TEXT DEFAULT '',
        line INTEGER DEFAULT 0,
        counter INTEGER DEFAULT 0
      )
    `);

        // Tabel message dengan timestamp otomatis
        this.db.exec(`
      CREATE TABLE IF NOT EXISTS message (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_printer INTEGER,
        field_name TEXT,
        field_value TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_printer) REFERENCES printer(id) ON DELETE CASCADE
      )
    `);
    }

    // --- CRUD Printer ---
    getPrinters() {
        return this.db.prepare('SELECT * FROM printer').all();
    }

    addPrinter(printer) {
        const result = this.db
            .prepare(
                'INSERT INTO printer (ip_address, port, port_zbc, name, line, counter) VALUES (?, ?, ?, ?, ?, ?)'
            )
            .run(
                printer.ip_address,
                printer.port,
                printer.port_zbc,
                printer.name,
                printer.line,
                printer.counter
            );
        console.log(result);
        return result;

    }

    editPrinter(printer) {
        return this.db
            .prepare(
                'UPDATE printer SET ip_address = ?, port = ?, port_zbc = ?, name = ?, line = ?, counter = ? WHERE id = ?'
            )
            .run(
                printer.ip_address,
                printer.port,
                printer.port_zbc,
                printer.name,
                printer.line,
                printer.counter,
                printer.id
            );
    }

    deletePrinter(id) {
        return this.db.prepare('DELETE FROM printer WHERE id = ?').run(id);
    }

    // --- CRUD Message ---
    getMessages() {
        return this.db.prepare('SELECT * FROM message').all();
    }

    getMessagesByPrinter(id_printer) {
        return this.db
            .prepare('SELECT * FROM message WHERE id_printer = ? ORDER BY timestamp DESC')
            .all(id_printer);
    }

    addMessage(message) {
        return this.db
            .prepare('INSERT INTO message (id_printer, field_name, field_value) VALUES (?, ?, ?)')
            .run(message.id_printer, message.field_name, message.field_value);
    }

    deleteMessage(id) {
        return this.db.prepare('DELETE FROM message WHERE id = ?').run(id);
    }

    clearMessagesByPrinter(id_printer) {
        return this.db.prepare('DELETE FROM message WHERE id_printer = ?').run(id_printer);
    }
}
