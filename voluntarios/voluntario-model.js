const mongoose = require("mongoose");
const { Schema } = mongoose;

const voluntarioSchema = new Schema({
  NOME: {
    type: String,
    require: true,
  },
  ATIVIDADE_ID: {
    type: Schema.Types.ObjectId,
    ref: "atividade",
    require: true,
  },
});

module.exports = {
  model: mongoose.model("voluntario", voluntarioSchema),
};
