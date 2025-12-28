
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, 'backend', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.all("SELECT * FROM stores WHERE slug LIKE '%hamoda%' OR name LIKE '%hamoda%'", (err, rows) => {
        if (err) {
            console.error("Error querying stores:", err);
            return;
        }
        console.log("Found stores:", rows);
    });
});

db.close();
