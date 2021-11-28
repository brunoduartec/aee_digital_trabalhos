const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const Connection = require("./db/connection")();
const ModelFactory = require("./db/modelFactory");

const models = [
  "atividade_centro_summary",
  "atividade_centro",
  "atividade_generic_form",
  "atividade_generic_quiz_answer",
  "atividade_generic_question",
  "atividade_generic_quiz",
  "atividade",
  "participante",
];

for (let index = 0; index < models.length; index++) {
  const model = models[index];

  const modelInfo = require(`./models/${model}-model`);
  ModelFactory.insertModel(model, modelInfo);
}

const controllers = require("./controllers");

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

for (let index = 0; index < models.length; index++) {
  const model = models[index];

  let controller = controllers["generic_controller"];
  app.all(`/api/v1/${model}`, controller);
  app.use(`/api/v1/${model}/:id`, controller);
}

module.exports = function () {
  return app;
};
