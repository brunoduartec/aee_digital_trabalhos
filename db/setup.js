const Database = require('../helpers/Database')

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const config = require('../env.json')[env]

const database = new Database(config.mysql).getInstance();

const fs = require('fs');
const path = require('path');
const readline = require('readline');

function bootstrap() {
    let rl = readline.createInterface({
        input: fs.createReadStream('banco_alianca.sql'),
        terminal: false
    });
    rl.on('line', function (chunk) {
        database.query(chunk.toString('ascii'), function (err, sets, fields) {
            if (err) console.log(err);
        });
    });
}

module.exports = {
    bootstrap
}