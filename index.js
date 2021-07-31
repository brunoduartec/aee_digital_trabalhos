const http = require("http");

const api = require("./api")();

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "local";
const config = require("./env.json")[env];

console.log("ENVIRONMENT => ", env)

const port = process.env.PORT || config.port;

let server_http = http.Server(api);
server_http.listen(port, "0.0.0.0", function () {
  console.log("API is running on port: " + port);
});
