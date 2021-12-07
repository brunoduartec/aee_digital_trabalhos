const mongoose = require("mongoose");
var deepPopulate = require("mongoose-deep-populate")(mongoose);
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
  COORDENADOR_ID: {
    type: Schema.Types.ObjectId,
    required: false,
  },
});

atividadeCentroSchema.plugin(
  deepPopulate
  // options /* more on options below */
);

module.exports = {
  model: mongoose.model("atividade_centro", atividadeCentroSchema),
  schema: atividadeCentroSchema,
  populate: ["ATIVIDADE"],
};
