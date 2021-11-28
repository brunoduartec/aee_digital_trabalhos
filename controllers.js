const adaptRequest = require("./helpers/adapt-request");

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
      res.set(headers).status(statusCode).send(data);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).end();
    });
};
