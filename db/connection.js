const envconfig = require("../helpers/envconfig")
const env = envconfig.NODE_ENV;
const config = require("../env.json")[env];

const mongoConfig = config.mongo;
const Logger = require("../helpers/logger");
const logger = new Logger();

const mongoose = require("mongoose");
const connection = `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`;

let hasConnected = false;

const connectWithRetry = (callback) => {
  if (hasConnected) return;
  logger.info("MongoDB connection with retry");
  mongoose
    .connect(connection, mongoConfig.options)
    .then(() => {
      logger.info("MongoDB is connected");
      hasConnected = true;
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      logger.error( `MongoDB connection unsuccessful, retry after 5 seconds.: ${err}` );
      setTimeout(connectWithRetry, 5000);
    });
};

module.exports = connectWithRetry;
