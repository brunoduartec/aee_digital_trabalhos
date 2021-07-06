const mongoose = require("mongoose");
const { Schema } = mongoose;

const atividadeCentroSchema = new Schema({
  ATIVIDADE: {
    type: Schema.Types.ObjectId,
    ref: "atividade",
  },
  CENTRO_ID: {
    type: Schema.Types.ObjectId,
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
    type: Number,
    require: false,
  },
  NUMERO_ATUADORES_HABILITADO: [],

  NUMERO_ATUADORES_HABILITADOS: {
    type: Number,
    require: false,
  },
  NUMERO_RECEPTORES: {
    type: Number,
    require: false,
  },
  NUMERO_ATUADORES: {
    type: Number,
    require: false,
  },
  COORDENADOR_ID: {
    type: Schema.Types.ObjectId,
    required: false,
  },
});

module.exports = {
  model: mongoose.model("atividade_centro", atividadeCentroSchema),
  populate: ["ATIVIDADE"],
};
