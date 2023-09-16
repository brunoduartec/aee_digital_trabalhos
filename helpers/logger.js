module.exports = class Logger {
    static info(data) {
      console.log("[INFO]", data);
    }
  
    static error(error) {
      console.log("[ERROR]", error);
    }
  };
  