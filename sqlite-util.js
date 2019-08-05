const db = require('./db');
const fs = require('fs');

let sqlite = {};

sqlite.exportToCsv = (tablename) =>  {
    var allLogs = db._db.prepare('SELECT * FROM logs').all();
    var filename = 'TERMINAL_LOGGER_LOGS_' + new Date().toLocaleString() + '.csv';
    var wStream = fs.createWriteStream(`./${filename}`);
    wStream.write(Object.keys(allLogs[0]).join(',') + '\n');
    allLogs.forEach((log) => {
        wStream.write(Object.values(log).join(',') + '\n');
    });

    wStream.end();
    console.log('Exported logs to csv:', filename);
};

module.exports = sqlite;