const mongoose = require("mongoose");
var deepPopulate = require("mongoose-deep-populate")(mongoose);
const { Schema } = mongoose;

const questionSchema = new Schema({
  QUESTION: {
    type: String,
    require: true,
  },
  ANSWER_TYPE: {
    type: String,
    require: true,
  },
  PRESET_VALUES: [
    {
      type: String,
      require: false,
    },
  ],
});

questionSchema.plugin(
  deepPopulate
  // options /* more on options below */
);

module.exports = {
  model: mongoose.model("atividade_generic_question", questionSchema),
  schema: questionSchema,
};
