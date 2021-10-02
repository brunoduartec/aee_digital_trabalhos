const mongoose = require("mongoose");
const { Schema } = mongoose;

const participantesSchema = new Schema({
  TIPO: {
    type: String,
    require: true,
  },
});

module.exports = {
  model: mongoose.model("participante", participantesSchema),
  schema: participantesSchema,
};
