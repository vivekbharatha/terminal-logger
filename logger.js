const db = require('./db');
const ora = require('ora');
const moment = require('moment');

const cmder = require('./cmder');

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
    showLatestByDay(1);
    startLogging();
}

function postLog(data) {
    let o = ora().start();
    let info = db.models.logs.create(data);
    console.log(info);
    o.stop();
}

function showLatestByDay(numberOfDays) {
    let fromDate = moment().subtract(numberOfDays, 'days');
    let logs = db.models.logs.getLogsFrom(fromDate.toISOString());
    if (logs && logs.length > 0) {
        console.log('Your last 1 day / 24 hours logs\n');
        logs = db.models.logs.parse(logs);
        console.table(logs);
    } else {
        console.log(`No logs found from ${fromDate.toLocaleString()}`);
    }
}

function startLogging () {
    stdin.addListener('data', (log) =>  {
        log = log.toString().trim();
        if (!log) return;
        if (cmder.parseInput(log)) {
            return;
        };
        let date = new Date();
        let logR = `${date.toLocaleTimeString()} : ${log}`;
        postLog({date: date, log: log});
        console.log('\x1b[32m\033[1A\033[K' + logR + ' \u2713\x1b[0m');
    });
}