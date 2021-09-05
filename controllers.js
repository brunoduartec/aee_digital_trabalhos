const handleAtividadeRequest = require("./atividades");
const handleAtividadeCentroRequest = require("./atividades_centro");
const handleAtividadeCentroSummaryRequest = require("./atividades_centro_summary");

const adaptRequest = require("./helpers/adapt-request");

module.exports.atividadeCentroSummaryController =
  function atividadeCentroSummaryController(req, res) {
    const httpRequest = adaptRequest(req);
    handleAtividadeCentroSummaryRequest(httpRequest)
      .then(({ headers, statusCode, data }) => {
        res.set(headers).status(statusCode).send(data);
      })
      .catch((e) => {
        console.log(e);
        res.status(500).end();
      });
  };

module.exports.atividadeController = function atividadeController(req, res) {
  const httpRequest = adaptRequest(req);
  handleAtividadeRequest(httpRequest)
    .then(({ headers, statusCode, data }) => {
      res.set(headers).status(statusCode).send(data);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).end();
    });
};

module.exports.atividadeCentroController = function atividadeCentroController(
  req,
  res
) {
  const httpRequest = adaptRequest(req);
  handleAtividadeCentroRequest(httpRequest)
    .then(({ headers, statusCode, data }) => {
      res.set(headers).status(statusCode).send(data);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).end();
    });
};
