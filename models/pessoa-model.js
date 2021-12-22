const mongoose = require("mongoose");
var deepPopulate = require("mongoose-deep-populate")(mongoose);
const { Schema } = mongoose;

const pessoaSchema = new Schema({
  NOME: {
    type: String,
    require: true,
  },
  "E-MAIL": {
    type: String,
    require: true,
  },
  CELULAR: {
    type: String,
    require: true,
  },
});

pessoaSchema.plugin(
  deepPopulate
  // options /* more on options below */
);

module.exports = {
  model: mongoose.model("pessoa", pessoaSchema),
  schema: pessoaSchema,
};
