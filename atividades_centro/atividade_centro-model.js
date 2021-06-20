const mongoose = require("mongoose");
const { Schema } = mongoose;

const atividadeCentroSchema = new Schema({
  ATIVIDADE_ID: {
    type: String,
    require: true,
  },
  CENTRO_ID: {
    type: String,
    require: false,
  },
  HORINI: {
    type: String,
    require: false,
  },
  HORFIM: {
    type: String,
    require: false,
  },
  DIA_SEMANA: {
    type: String,
    require: false,
  },
  NUMERO_TURMA: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model("atividade_centro", atividadeCentroSchema);
