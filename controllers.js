const adaptRequest = require("./helpers/adapt-request");
const logger = require("./helpers/logger");

function getModelName(path) {
  let modelName = path.slice(8, path.length);
  modelName = modelName.split("?")[0];

  return modelName;
}

module.exports.generic_controller = function genericController(req, res) {
  const httpRequest = adaptRequest(req);
  const originalUrl = req.originalUrl;
  const modelName = getModelName(originalUrl);

  const handleGeneric = require("./model_generic")({
    modelName: modelName,
  });

  handleGeneric(httpRequest)
    .then(({ headers, statusCode, data }) => {
      logger.info(`controller:handleGeneric`);
      res.set(headers).status(statusCode).send(data);
    })
    .catch((e) => {
      logger.error(`controller:handleGeneric: ${e}`)
      res.status(500).end();
    });
};
