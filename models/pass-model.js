const mongoose = require("mongoose");
var deepPopulate = require("mongoose-deep-populate")(mongoose);
const { Schema } = mongoose;

const passSchema = new Schema({
  user: {
    type: String,
    require: true,
  },
  pass: {
    type: String,
    require: true,
  },
  groups: [
    {
      type: String,
      require: true,
    },
  ],
  scope_id: {
    type: String,
    require: true,
  },
});

passSchema.plugin(
  deepPopulate
  // options /* more on options below */
);

module.exports = {
  model: mongoose.model("pass", passSchema),
  schema: passSchema,
};
