const makeDb = require("../db");
const makeAtividadeList = require("./atividade-list");
const makeAtividadeEndpointHandler = require("./atividade-endpoint");

let ModelFactory = require("../db/modelFactory");
const database = makeDb(ModelFactory);

const atividadeList = makeAtividadeList({
  database,
});
const atividadesEndpointHandler = makeAtividadeEndpointHandler({
  atividadeList,
});

module.exports = atividadesEndpointHandler;
