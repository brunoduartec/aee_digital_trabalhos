const cluster = require("cluster")
const proc = require("proc")
const http = require("http");

const api = require("./api")();

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const config = require('./env.json')[env]

const port = process.env.PORT || config.port;

if (cluster.isMaster) {
    createMasterNode(cluster)
} else {
    createSlaveNode();
}


function createMasterNode(cluster) {
    // for (let i = 0; i < require("os").cpus().length; i++) {
    cluster.fork();
    // }

    console.log("Cluster " + proc.pid + " is online");
    cluster.on("online", function (worker) {
        console.log("Worker " + worker.process.pid + " is online")
    })
    cluster.on("exit", function (worker, code, signal) {
        console.log("worker " + worker.process.pid + " died.")
    })
}

function createSlaveNode() {
    let server_http = http.Server(api);
    server_http.listen(port, "0.0.0.0", function () {
        console.log("API is running on port: " + port)
    })


}