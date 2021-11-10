const mongoose = require("mongoose");
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
  PRESET_VALUES:[
    {
      type: String,
      require:false
    }
  ]
});

const atividadeGenericQuizSchema = new Schema({
  CATEGORY: {
    type: String,
    require: true,
  },
  QUESTIONS: [questionSchema],
});

module.exports = {
  model: mongoose.model("atividade_generic_quiz", atividadeGenericQuizSchema),
  schema: atividadeGenericQuizSchema,
};
