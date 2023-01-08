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
  FORM_ID: {
    type: Schema.Types.ObjectId,
    required: false
  },
  CREATED: {
    type: Date,
    require: true
  }
});

module.exports = {
  model: mongoose.model(
    "atividade_generic_quiz_summary_info",
    atividadeGenericQuizSummarysInfoSchema
  ),
  schema: atividadeGenericQuizSummarysInfoSchema
};