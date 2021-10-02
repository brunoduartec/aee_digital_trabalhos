const mongoose = require("mongoose");
const { Schema } = mongoose;

const atividadeSchema = new Schema({
  NOME_ATIVIDADE: {
    type: String,
    require: true,
  },
  RECEIVER_ALIAS: {
    type: String,
    require: true,
  },
  ATOR_ALIAS: {
    type: String,
    require: true,
  },
  COORDENADOR_ALIAS: {
    type: String,
    require: true,
  },
});

module.exports = {
  model: mongoose.model("atividade", atividadeSchema),
  schema: atividadeSchema,
};
