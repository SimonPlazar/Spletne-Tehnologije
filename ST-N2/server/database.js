const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
        db.run(`CREATE TABLE IF NOT EXISTS fingerprints (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hash TEXT UNIQUE
        )`);
    }
});

function checkFingerprint(hash, callback) {
    db.get("SELECT * FROM fingerprints WHERE hash = ?", [hash], (err, row) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, !!row);
        }
    });
}

function addFingerprint(hash, callback) {
    db.run("INSERT INTO fingerprints (hash) VALUES (?)", [hash], (err) => {
        if (err && err.code === 'SQLITE_CONSTRAINT') {
            callback(null, true);
        } else if (err) {
            callback(err, null);
        } else {
            callback(null, false);
        }
    });
}

function resetDatabase(callback) {
    db.run("DELETE FROM fingerprints", (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

module.exports = {checkFingerprint, addFingerprint, resetDatabase};
