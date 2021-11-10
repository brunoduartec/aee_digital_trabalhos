const mongoose = require("mongoose");
const { Schema } = mongoose;

const answerSchema = new Schema({
  CENTRO_ID: {
    type: Schema.Types.ObjectId,
    require: false,
  },
  QUIZ_ID: {
    type: Schema.Types.ObjectId,
    require: false,
  },
  QUESTION_ID: {
    type: String,
    require: true,
  },
  ANSWER: {
    type: String,
    require: true,
  },
});

module.exports = {
  model: mongoose.model("atividade_generic_quiz_answer", answerSchema),
  schema: answerSchema,
};
