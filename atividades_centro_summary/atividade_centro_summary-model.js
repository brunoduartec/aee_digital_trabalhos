const mongoose = require("mongoose");
const { Schema } = mongoose;

const participantesSchema = new Schema({
  TIPO: {
    type: String,
    require: true,
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
  ATUADORES_HABILITADOS: [participantesSchema],
  ATUADORES: [participantesSchema],
  RECEPTORES: [participantesSchema],
});

module.exports = {
  model: mongoose.model(
    "atividade_centro_summary",
    atividadeCentroSummarySchema
  ),
};
