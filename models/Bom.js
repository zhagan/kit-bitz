var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BOMSchema = new Schema({
  // `title` is of type String
  kitName: String,
  fileUpload: Object
  //octopartBom: Object,
  // `body` is of type String

  //throughHole: Boolean

});

// This creates our model from the above schema, using mongoose's model method
var Bom = mongoose.model('Bom', BOMSchema);

// Export the Note model
module.exports = Bom;
