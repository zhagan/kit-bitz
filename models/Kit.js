var mongoose = require("mongoose");
var filePluginLib = require('mongoose-file');
var filePlugin = filePluginLib.filePlugin;

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var KitSchema = new Schema({
  // `title` is of type String
  newbom: String,
  designer: String,
  kitUrl: String,
  pcbUrl: String,
  faceplateUrl: String,
  fileUpload: Object,
  //octopartBom: Object,
  // `body` is of type String
  components: {
    type: Schema.Types.ObjectId,
    ref: "Bom"
  }
  //throughHole: Boolean

});

// This creates our model from the above schema, using mongoose's model method
var Kit = mongoose.model("Kit", KitSchema);

// Export the Note model
module.exports = Kit;
