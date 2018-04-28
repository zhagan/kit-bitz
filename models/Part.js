var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var PartSchema = new Schema({
  // `title` is of type String
  _id: {
    type: String
  },
  Part: {
    type: String,
    enum: ['resistor', 'capacitor','transistor','diode','trimmer','socket','header','fuse','bead','misc'],
    required: false
  },
  item: {
    type: Object
  },
  snippet: {
    type: String
  }
});

// This creates our model from the above schema, using mongoose's model method
var Part = mongoose.model('Part', PartSchema);

// Export the Note model
module.exports = Part;
