const mongoose = require("mongoose");
const { Schema } = mongoose;

const voluntarioSchema = new Schema({
  TIPO: {
    type: String,
    require: true,
  },
  QUANTIDADE: {
    type: Number,
    require: true,
  },
});

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
  ATUADORES_HABILITADO: [voluntarioSchema],
  ATUADORES: [voluntarioSchema],
  RECEPTORES: [voluntarioSchema],
  COORDENADOR_ID: {
    type: Schema.Types.ObjectId,
    required: false,
  },
});

module.exports = {
  model: mongoose.model("atividade_centro", atividadeCentroSchema),
  populate: ["ATIVIDADE"],
};
