const mongoose = require("mongoose");
const { Schema } = mongoose;

const participantesSchema = new Schema({
  TIPO: {
    type: Schema.Types.ObjectId,
    ref: "participante",
  },
  QUANTIDADE: {
    type: Number,
    require: true,
  },
});

const atividadeCentroSummarySchema = new Schema({
  CENTRO_ID: {
    type: Schema.Types.ObjectId,
    require: false,
  },
  ATIVIDADE: {
    type: Schema.Types.ObjectId,
    ref: "atividade",
  },
  ATUADORES_HABILITADOS: [participantesSchema],
  ATUADORES: [participantesSchema],
  RECEPTORES: [participantesSchema],
});

module.exports = {
  model: mongoose.model(
    "atividade_centro_summary",
    atividadeCentroSummarySchema
  ),
  schema: atividadeCentroSummarySchema,
  populate: [
    "ATIVIDADE",
    "ATUADORES_HABILITADOS.TIPO",
    "ATUADORES.TIPO",
    "RECEPTORES.TIPO",
  ],
};
