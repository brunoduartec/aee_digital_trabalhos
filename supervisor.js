const forever = require('forever-monitor');


function exit() {
    child.max = 0;
    child.stop();
}

process.on("SIGINT", exit);
process.on("SIGTERM", exit);


const child = new(forever.Monitor)('index.js', {
    max: Number.MAX_VALUE,
    silent: false,
    args: []
});

child.on('start', function (process, data) {
    console.log("API <PID>: " + data.pid);
    console.log("Is API Running: " + child.running);
})

child.on('restart', function (process, data) {
    console.log('API restarting <PID>: ' + data.pid);
})

child.on('exit', function () {
    console.log('API has exited after all attempts to restart');
});


child.start();