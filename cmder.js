const db = require('./db');

let _module = {};

_module.regexp = {
    LIST_X: /^LIST_(\d+)$/,
    RESET_LOGS: /^RESET_LOGS$/
}

_module.parseInput = (input) => {
    let flag = false;
    for(var cmd in _module.regexp) {
        if (_module.regexp[cmd].test(input)) {
            flag = true;
            _module[cmd](input);
            return flag;
        }
    }

    return flag;
};

_module.LIST_X = (data) => {
    let n = data.match(_module.regexp.LIST_X)[1];
    n = parseInt(n);
    let logs = db.models.logs.getLatest(n);
    console.log(logs);
}

_module.RESET_LOGS = () => {
    db.models.logs.reset();
}

module.exports = _module;