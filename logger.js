const GS = require('google-spreadsheet');
const ora = require('ora');
const env = require('./env.json');

let doc;

let stdin = process.openStdin();

console.log('Welcome logger!');

init(() => {
    console.log('Connected to google sheet!');
    console.log('Start typing the log and hit that enter');
    console.log('---------------------------------------');

    startLogging();
});

function init(cb) {
    //TODO:: validations
    console.log("Initializing.....");

    doc = new GS(env.sheet_id);
    doc.useServiceAccountAuth(env, (err) => {
        if (err) {
            console.log(err);
            return process.exit(1);
        }
        return cb();
    });
}

function postLog(data, cb) {
    let o = ora().start();
    doc.addRow(1, data, function(err) {
        o.stop();
        if(err) {
          console.log(err);
        }
        return cb(err);
    });
}

function startLogging () {
    stdin.addListener('data', (log) =>  {
        log = log.toString().trim();
        if (!log) return;
        let date = new Date();
        let logR = `${date.toLocaleTimeString()} : ${log}`;
        postLog({date, log}, (err) => {
            console.log('\x1b[32m\033[1A\033[K' + logR + ' \u2713');
        });
    });
}