const handleAtividadeRequest = require("./model_generic")({
  modelName: "atividade",
});
const handleAtividadeCentroRequest = require("./model_generic")({
  modelName: "atividade_centro",
});
const handleAtividadeCentroSummaryRequest = require("./model_generic")({
  modelName: "atividade_centro_summary",
});
const handleParticipanteRequest = require("./model_generic")({
  modelName: "participante",
});

const handleAtividadeGenericQuiz = require("./model_generic")({
  modelName: "atividade_generic_quiz",
});

const handleAtividadeGenericQuizAnswer = require("./model_generic")({
  modelName: "atividade_generic_quiz_answer",
});

const handleAtividadeGenericForm = require("./model_generic")({
  modelName: "atividade_generic_form",
});

const handleAtividadeGenericQuestion = require("./model_generic")({
  modelName: "atividade_generic_question",
});

const adaptRequest = require("./helpers/adapt-request");

module.exports.atividade_centro_summary_controller =
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

module.exports.atividade_controller = function atividadeController(req, res) {
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

module.exports.atividade_centro_controller = function atividadeCentroController(
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

module.exports.participante_controller = function participanteController(
  req,
  res
) {
  const httpRequest = adaptRequest(req);
  handleParticipanteRequest(httpRequest)
    .then(({ headers, statusCode, data }) => {
      res.set(headers).status(statusCode).send(data);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).end();
    });
};

module.exports.atividade_generic_quiz_controller =
  function atividadeGenericQuizController(req, res) {
    const httpRequest = adaptRequest(req);
    handleAtividadeGenericQuiz(httpRequest)
      .then(({ headers, statusCode, data }) => {
        res.set(headers).status(statusCode).send(data);
      })
      .catch((e) => {
        console.log(e);
        res.status(500).end();
      });
  };

module.exports.atividade_generic_quiz_answer_controller =
  function atividadeGenericQuizAnswerController(req, res) {
    const httpRequest = adaptRequest(req);
    handleAtividadeGenericQuizAnswer(httpRequest)
      .then(({ headers, statusCode, data }) => {
        res.set(headers).status(statusCode).send(data);
      })
      .catch((e) => {
        console.log(e);
        res.status(500).end();
      });
  };

module.exports.atividade_generic_form_controller =
  function atividadeGenericFormController(req, res) {
    const httpRequest = adaptRequest(req);
    handleAtividadeGenericForm(httpRequest)
      .then(({ headers, statusCode, data }) => {
        res.set(headers).status(statusCode).send(data);
      })
      .catch((e) => {
        console.log(e);
        res.status(500).end();
      });
  };

module.exports.atividade_generic_question_controller =
  function atividadeGenericQuestionController(req, res) {
    const httpRequest = adaptRequest(req);
    handleAtividadeGenericQuestion(httpRequest)
      .then(({ headers, statusCode, data }) => {
        res.set(headers).status(statusCode).send(data);
      })
      .catch((e) => {
        console.log(e);
        res.status(500).end();
      });
  };
