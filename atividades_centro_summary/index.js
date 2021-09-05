const makeDb = require("../db");
const makeAtividadeCentroList = require("./atividade_centro_summary-list");
const makeAtividadeCentroEndpointHandler = require("./atividade_centro_summary-endpoint");

let ModelFactory = require("../db/modelFactory");
const database = makeDb(ModelFactory);

const atividade_centro_summaryList = makeAtividadeCentroList({
  database,
});
const atividadesCentroSummaryEndpointHandler =
  makeAtividadeCentroEndpointHandler({
    atividade_centro_summaryList,
  });

module.exports = atividadesCentroSummaryEndpointHandler;
