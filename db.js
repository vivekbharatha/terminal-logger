const sqlite3 = require('better-sqlite3');
const db = new sqlite3('./database.db', {});

let _module = {};

// init
_module.init = () => {
    return db.prepare(`
    CREATE TABLE IF NOT EXISTS logs (
        date datetime PRIMARY KEY,
        log text NOT NULL
    )
    `).run();
};

const logCreateStmt = db.prepare('INSERT INTO logs (date, log) VALUES (?, ?)');
const logLatestStmt = db.prepare('SELECT * FROM logs ORDER BY date DESC LIMIT ?');

let logs = {};

logs.create = (data) => {
    return logCreateStmt.run(data.date, data.log);
};

logs.getLatest = (numberOfRecords) => {
    return logLatestStmt.all(numberOfRecords);
}

logs.reset = () => {
    db.exec('DELETE from logs');
    console.log('logs reset done');
}

_module.db = db;
_module.models = {
    logs: logs
};

module.exports = _module;