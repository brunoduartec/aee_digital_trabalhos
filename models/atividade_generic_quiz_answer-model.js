const mongoose = require("mongoose");
var deepPopulate = require("mongoose-deep-populate")(mongoose);
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
    type: Schema.Types.ObjectId,
    ref: "atividade_generic_question",
    required: true
  },
  ANSWER: {
    type: String,
    require: false,
  },
});

answerSchema.plugin(
  deepPopulate
  // options /* more on options below */
);

module.exports = {
  model: mongoose.model("atividade_generic_quiz_answer", answerSchema),
  schema: answerSchema,
  populate: ["QUESTION_ID"],
};
