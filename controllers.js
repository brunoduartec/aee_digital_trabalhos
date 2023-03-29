const adaptRequest = require("./helpers/adapt-request");
const Logger = require("./helpers/logger");

function getModelName(path) {
  let modelName = path.slice(8, path.length);
  modelName = modelName.split("?")[0];

  return modelName;
}

module.exports.generic_controller = function genericController(req, res) {
  const correlationId= req.correlationId()
  const logger = new Logger()
  logger.setCorrelation(correlationId)

  const httpRequest = adaptRequest(req);
  const originalUrl = req.originalUrl;
  const modelName = getModelName(originalUrl);

  const handleGeneric = require("./model_generic")({
    modelName: modelName,
  });

  handleGeneric(httpRequest, logger)
    .then(({ headers, statusCode, data }) => {
      logger.info(`${httpRequest.method}:${httpRequest.path}`, {
        httpRequest,
        data
      })
      res.set(headers).status(statusCode).send(data);
    })
    .catch((e) => {
      logger.error(e, {
        httpRequest
      });
      res.status(500).end();
    });
};
