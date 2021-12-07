const mongoose = require("mongoose");
var deepPopulate = require("mongoose-deep-populate")(mongoose);
const { Schema } = mongoose;

const atividadeCentroSummarySchema = new Schema({
  CENTRO_ID: {
    type: Schema.Types.ObjectId,
    require: false,
  },
  ATIVIDADE: {
    type: Schema.Types.ObjectId,
    ref: "atividade",
  },
  ATUADORES_HABILITADOS: [
    {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "participante",
    },
  ],
  ATUADORES: [
    {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "participante",
    },
  ],
  RECEPTORES: [
    {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "participante",
    },
  ],
});

atividadeCentroSummarySchema.plugin(
  deepPopulate
  // options /* more on options below */
);

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
