var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var KitSchema = new Schema({

  kitName: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  description: String,
  designer: String,
  kitUrl: String,
  pcbUrl: String,
  faceplateUrl: String,
  kitImgPath: {
    path: {
      type: String,
      //required: true,
      trim: true
    },
    name: {
      type: String
      //  required: true
    },
    originalname: {
      type: String
      //  required: true
    }
  },
  bom: Array
});

// This creates our model from the above schema, using mongoose's model method
var Kit = mongoose.model('Kit', KitSchema);

// Export the Note model
module.exports = Kit;
