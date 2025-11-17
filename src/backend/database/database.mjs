import { DatabaseSync } from 'node:sqlite';

let db;

export async function getDB() {
  const filename = 'db.sqlite';
  db = new DatabaseSync(filename);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS printer (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip_address TEXT,
      port INTEGER DEFAULT 0,
      port_ack INTEGER DEFAULT 0,
      name TEXT DEFAULT '',
      message TEXT DEFAULT '',
      status TEXT DEFAULT "n/a",
      system_counter INTEGER DEFAULT 0,
      product_counter INTEGER DEFAULT 0,
      marking_counter INTEGER DEFAULT 0,
      line INTEGER DEFAULT 0,
      counter INTEGER DEFAULT 0,
      product_sum INTEGER DEFAULT 1,
      max_message INTEGER DEFAULT 0
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS message (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_printer INTEGER,
      field_name TEXT,
      field_value TEXT,
      flag INTEGER DEFAULT 0,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_printer) REFERENCES printer(id) ON DELETE CASCADE
    )
  `);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_printer INTEGER,
      message TEXT,
      system_counter INTEGER DEFAULT 0,
      product_counter INTEGER DEFAULT 0,
      marking_counter INTEGER DEFAULT 0,
      counter INTEGER DEFAULT 0,
      flag INTEGER DEFAULT 0,
      status TEXT DEFAULT "n/a",
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_printer) REFERENCES printer(id) ON DELETE CASCADE
    )
  `);
  return db;
}
