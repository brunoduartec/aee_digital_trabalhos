const mongoose = require("mongoose");
const { Schema } = mongoose;

const atividadeSchema = new Schema({
  NOME_ATIVIDADE: {
    type: String,
    require: true,
  },
});

module.exports = {
  model: mongoose.model("atividade", atividadeSchema),
};
