const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const Connection = require("./db/connection")();
const ModelFactory = require("./db/modelFactory");
const AtividadeModel = require("./atividades/atividade-model");
const AtividadeCentroModel = require("./atividades_centro/atividade_centro-model");
const AtividadeCentroSummaryModel = require("./atividades_centro_summary/atividade_centro_summary-model");

ModelFactory.insertModel("atividade", AtividadeModel);
ModelFactory.insertModel("atividade_centro", AtividadeCentroModel);
ModelFactory.insertModel(
  "atividade_centro_summary",
  AtividadeCentroSummaryModel
);

const {
  atividadeController,
  atividadeCentroController,
  atividadeCentroSummaryController,
} = require("./controllers");

const app = express();
app.options("*", cors()); // include before other routes

app.use((req, res, next) => {
  console.log("Acessou o Middleware!", req);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  app.use(cors());
  next();
});

app.use(bodyParser.json());

app.use("/api/v1/healthcheck", require("./healthcheck"));

app.get("/", function (req, res) {
  const package = require("./package.json");
  const versionInfo = {
    name: package.name,
    version: package.version,
    description: package.description,
  };
  res.json(versionInfo);
});

app.all("/api/v1/atividades", atividadeController);
app.use("/api/v1/atividades/:id", atividadeController);

app.all("/api/v1/atividades_centro", atividadeCentroController);
app.use("/api/v1/atividades_centro/:id", atividadeCentroController);

app.all("/api/v1/atividade_centro_summary", atividadeCentroSummaryController);
app.use(
  "/api/v1/atividade_centro_summary/:id",
  atividadeCentroSummaryController
);

module.exports = function () {
  return app;
};
