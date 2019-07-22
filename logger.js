const db = require('./db');
const ora = require('ora');

let stdin = process.openStdin();

console.log('Welcome logger!');

init();

function init() {
    console.log("Initializing.....");
    try {
        db.init();
    } catch (e) {
        console.log('DB init error: ', e);
        process.exit(1);
    }
    console.log('Connected to db!');
    console.log('Start typing the log and hit that enter');
    console.log('---------------------------------------');
    startLogging();
}

function postLog(data, cb) {
    let o = ora().start();
    let info = db.models.log.create(data);
    console.log(info);
    o.stop();
}

function startLogging () {
    stdin.addListener('data', (log) =>  {
        log = log.toString().trim();
        if (!log) return;
        let date = new Date();
        let logR = `${date.toLocaleTimeString()} : ${log}`;
        postLog({date: date.toISOString(), log: log});
        console.log('\x1b[32m\033[1A\033[K' + logR + ' \u2713');
    });
}