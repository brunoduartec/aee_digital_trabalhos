const makeDb = require("../db");
const makeAtividadeCentroList = require("./atividade_centro-list");
const makeAtividadeCentroEndpointHandler = require("./atividade_centro-endpoint");

let ModelFactory = require("../db/modelFactory");
const database = makeDb(ModelFactory);

const atividade_centroList = makeAtividadeCentroList({
  database,
});
const atividadesCentroEndpointHandler = makeAtividadeCentroEndpointHandler({
  atividade_centroList,
});

module.exports = atividadesCentroEndpointHandler;
