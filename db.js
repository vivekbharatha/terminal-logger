const sqlite3 = require('better-sqlite3');
const db = new sqlite3('./log.db', {});

let _module = {};

let logCreateStmt;
let logLatestStmt;

// init
_module.init = () => {
    db.prepare(`
    CREATE TABLE IF NOT EXISTS logs (
        date datetime PRIMARY KEY,
        log text NOT NULL,
        tz_offset int NOT NULL
    )
    `).run();
    logCreateStmt = db.prepare('INSERT INTO logs (date, log, tz_offset) VALUES (?, ?, ?)');
    logLatestStmt = db.prepare('SELECT * FROM logs ORDER BY date DESC LIMIT ?');
    logFromDateStmt = db.prepare('SELECT * FROM logs where date > ? ORDER BY date DESC');
    logAll = db.prepare('SELECT * FROM logs');
};

let logs = {};

logs.create = (data) => {

    return logCreateStmt.run(data.date.toISOString(), data.log, data.date.getTimezoneOffset());
};

logs.getLatest = (numberOfRecords) => {
    return logLatestStmt.all(numberOfRecords);
}

logs.getLogsFrom = (date) => {
    return logFromDateStmt.all(date);
}

logs.reset = () => {
    db.exec('DELETE from logs');
    console.log('logs reset done');
}

logs.parse = (logs) => {
    return logs.map((log) => {
        log.date = new Date(log.date).toLocaleString();
        delete log.tz_offset;
        return log;
    });
}

_module._db = db;
_module.models = {
    logs: logs
};

module.exports = _module;