const mongoose = require("mongoose");
const {
  Schema
} = mongoose;

const atividadeGenericFormSchema = new Schema({
  NAME: {
    type: String,
    require: true,
  },
  PAGES: [{
    PAGE_NAME: {
      type: String,
      require: true,
    },
    QUIZES: [{
      type: Schema.Types.ObjectId,
      require: true,
      ref: "atividade_generic_quiz",
    }, ]
  }]
});

module.exports = {
  model: mongoose.model("atividade_generic_form", atividadeGenericFormSchema),
  schema: atividadeGenericFormSchema,
  populate: ["PAGES.QUIZES"],
};