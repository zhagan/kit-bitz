var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var InventorySchema = new Schema({
  
  parts: [{
    type: Schema.Types.ObjectId,
    ref: 'Part',
    default: []
  }],

});

// This creates our model from the above schema, using mongoose's model method
var Inventory = mongoose.model('Inventory', InventorySchema);

// Export the Article model
module.exports = Inventory;
