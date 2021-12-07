const mongoose = require("mongoose");
var deepPopulate = require("mongoose-deep-populate")(mongoose);
const { Schema } = mongoose;

const participantesSchema = new Schema({
  TIPO: {
    type: String,
    require: true,
  },
});

participantesSchema.plugin(
  deepPopulate
  // options /* more on options below */
);

module.exports = {
  model: mongoose.model("participante", participantesSchema),
  schema: participantesSchema,
};
