const GS = require('google-spreadsheet');
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

function postLog(data) {
    doc.addRow(1, data, function(err) {
        if(err) {
          console.log(err);
        }
    });
}

function startLogging () {
    stdin.addListener("data", (log) =>  {
        log = log.toString().trim();
        if (!log) return;
        let date = new Date();
        let logR = `${date.toLocaleTimeString()} : ${log}`;
        console.log('\033[1A\033[K' + logR);
        postLog({date, log});
    });
}