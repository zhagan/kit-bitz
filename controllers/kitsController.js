const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    console.log("getting all parts");
    db.User.findById({ _id: req.user.id}).then( dbUser => {
      db.Inventory.findById({_id: dbUser.inventory}).populate('parts')
      .then(dbInventory => {
        res.json(dbInventory.parts);
        console.log(dbInventory);
      })
    });
    // .then( dbUser => {
    //   console.log(dbUser);
    //   dbUser.inventory.find({}).populate('parts')
    //   .then( dbParts => {
    //     console.log(dbParts);
    //   });
    //   console.log(dbUser);
    // })
    // db.Part
    //   .find({})Inventory
    // //.sort({ date: -1 })
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
  //  console.log("get PAAAAART");
    db.Part
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    // console.log(req);
    var partId;
    db.Part.create(req.body)
      .then( dbPart => {
        // return db.User.findOneAndUpdate({"_id":req.user.id}, {$push: {"inventory":dbPart._id}});
        partId = dbPart.id;
        return db.User.findOne({_id:req.user.id});
      })
    //db.User.findOneAndUpdate({_id:req.user.id}, inventory:req.body)
      // .create(req.body)
      .then( dbUser => {
        return db.Inventory.findOneAndUpdate( { _id: dbUser.inventory }, {$push: {"parts": partId}});
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        res.status(422).json(err);
        console.log(err);
      });
  },
  update: function(req, res) {
    db.Part
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Part
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
