var mongoose = require('mongoose');

// bcrypt is the hashing algorithm we'll use to protect stored credentials.
const bcrypt = require('bcrypt');

// for hash strength
const WORK_FACTOR = 10;


// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var UserSchema = new Schema({

  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  email: String,
  password: String,
  website: String,
  userImgPath: {
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
  createdAt: Date,
  kitsCreated: Array,

  inventory: [{
    _id: false,
    MPN: { type: String },
    Qty: Number,
    Snippet: String,
    Img: String
  }]
});

UserSchema.pre('save', function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      // let mongoose know we're done now that we've hashed the plaintext password
      next();
    });
  });
});

UserSchema.methods.validatePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};



// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model('User', UserSchema);

// Export the Note model
module.exports = User;
