const mongoose = require("mongoose");
var deepPopulate = require("mongoose-deep-populate")(mongoose);
const { Schema } = mongoose;

const atividadeGenericQuizSchema = new Schema({
  CATEGORY: {
    type: String,
    require: true,
  },
  QUESTIONS: [
    {
      type: Schema.Types.ObjectId,
      ref: "atividade_generic_question",
    },
  ],
});

atividadeGenericQuizSchema.plugin(
  deepPopulate
  // options /* more on options below */
);

module.exports = {
  model: mongoose.model("atividade_generic_quiz", atividadeGenericQuizSchema),
  schema: atividadeGenericQuizSchema,
  populate: ["QUESTIONS"],
};
