const makeDb = require("../db");
const makeVoluntarioList = require("./voluntario-list");
const makeVoluntarioEndpointHandler = require("./voluntario-endpoint");

let ModelFactory = require("../db/modelFactory");
const database = makeDb(ModelFactory);

const voluntarioList = makeVoluntarioList({
  database,
});
const voluntariosEndpointHandler = makeVoluntarioEndpointHandler({
  voluntarioList,
});

module.exports = voluntariosEndpointHandler;
