const mongoose = require("mongoose");
var deepPopulate = require("mongoose-deep-populate")(mongoose);
const { Schema } = mongoose;

const groupQuestionSchema = new Schema({
  GROUP_NAME:
    {
      type: String,
      require: false,
    },
  GROUP:[
      {
          type: Schema.Types.ObjectId,
          ref: "atividade_generic_question"
      }
  ],
  IS_MULTIPLE:{
    type: Boolean,
    require: false,
    default: false,
  }
});

groupQuestionSchema.plugin(
  deepPopulate
  // options /* more on options below */
);

module.exports = {
  model: mongoose.model("atividade_generic_group_question", groupQuestionSchema),
  schema: groupQuestionSchema,
  populate:["GROUP"]
};
