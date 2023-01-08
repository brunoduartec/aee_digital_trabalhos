const mongoose = require("mongoose");
const {
  Schema
} = mongoose;

const atividadeGenericQuizSummarysInfoSchema = new Schema({
  CENTRO_ID: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  REGIONAL_ID: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  SUMMARY_INFO_ID: {
    type: Schema.Types.ObjectId,
    required: false
  },
  QUESTION: {
    type: Schema.Types.ObjectId,
    ref: "atividade_generic_question",
    require: true
  },
  ANSWER: {
    type: String,
    require: false,
  }
});

module.exports = {
  model: mongoose.model(
    "atividade_generic_quiz_summary_response",
    atividadeGenericQuizSummarysInfoSchema
  ),
  schema: atividadeGenericQuizSummarysInfoSchema
};