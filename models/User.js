var mongoose = require("mongoose");
var filePluginLib = require('mongoose-file');
var filePlugin = filePluginLib.filePlugin;

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  
  username: String,
  email: String,
  password: String,
  website: String,
  userImg: Object,
  createdAt: Date,
  kitsCreated: Array,

  inventory: {
    type: Schema.Types.ObjectId,
    ref: "Inventory"
  }
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the Note model
module.exports = User;
