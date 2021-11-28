const mongoose = require("mongoose");
var deepPopulate = require("mongoose-deep-populate")(mongoose);
const { Schema } = mongoose;

const atividadeGenericQuizSummarysSchema = new Schema({
  CENTRO_ID: {
    type: String,
    require: true,
  },
  ANSWERS: [
    {
      type: Schema.Types.ObjectId,
      require: false,
    },
  ],
});

atividadeGenericQuizSummarysSchema.plugin(
  deepPopulate
  // options /* more on options below */
);

module.exports = {
  model: mongoose.model(
    "atividade_generic_quiz_summary",
    atividadeGenericQuizSummarysSchema
  ),
  schema: atividadeGenericQuizSummarysSchema,
};
