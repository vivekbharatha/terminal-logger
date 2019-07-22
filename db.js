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

let log = {};

log.create = (data) => {
    return logCreateStmt.run(data.date, data.log);
};

_module.db = db;
_module.models = {
    log: log 
};

module.exports = _module;