const env = process.env.NODE_ENV ? process.env.NODE_ENV : "local";
const config = require("../env.json")[env];

const mongoConfig = config.mongo;

const mongoose = require("mongoose");
const connection = process.env.DB_STRING_CONNECTION;

let hasConnected = false;

const connectWithRetry = (callback) => {
  if (hasConnected) return;
  console.log("MongoDB connection with retry");
  mongoose
    .connect(connection, mongoConfig.options)
    .then(() => {
      console.log("MongoDB is connected");
      hasConnected = true;
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      console.log(
        "MongoDB connection unsuccessful, retry after 5 seconds.",
        err
      );
      setTimeout(connectWithRetry, 5000);
    });
};

module.exports = connectWithRetry;
