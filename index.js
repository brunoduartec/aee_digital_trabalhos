const http = require("http");

const api = require("./api")();
const Logger = require("./helpers/logger");
const logger = new Logger();

const envconfig = require("./helpers/envconfig")
const env = envconfig.NODE_ENV;

const config = require("./env.json")[env];

logger.info(`ENVIRONMENT => ${env}`)

const port = envconfig.PORT || config.port;

let server_http = http.Server(api);
server_http.listen(port, "0.0.0.0", function () {
  logger.info(`API is running on port: ${port}`);
});
