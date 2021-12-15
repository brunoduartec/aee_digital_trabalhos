const mongoose = require("mongoose");
var deepPopulate = require("mongoose-deep-populate")(mongoose);

const { Schema } = mongoose;

const atividadeGenericFormSchema = new Schema({
  NAME: {
    type: String,
    require: true,
  },
  PAGES: [
    {
      PAGE_NAME: {
        type: String,
        require: true,
      },
      QUIZES: [
        {
          type: Schema.Types.ObjectId,
          require: true,
          ref: "atividade_generic_quiz",
        },
      ],
    },
  ],
});

atividadeGenericFormSchema.plugin(
  deepPopulate
  // options /* more on options below */
);

module.exports = {
  model: mongoose.model("atividade_generic_form", atividadeGenericFormSchema),
  schema: atividadeGenericFormSchema,
  populate: ["PAGES.QUIZES", "PAGES.QUIZES.QUESTIONS", "PAGES.QUIZES.QUESTIONS.GROUP"],
};
