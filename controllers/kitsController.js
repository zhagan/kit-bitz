const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    console.log("getiing all of my kits");
    db.Kit.find({ createdBy: req.user.id }).populate('createdBy').then( dbKit => {
    //  db.Kit.findById({createdBy: dbUser.inventory}).populate('kits')
      // .then(dbInventory => {
      //   res.json(dbInventory.parts);
      //   console.log(dbInventory);
      // })
      res.json(dbKit);
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
    var kitId;
    //console.log(req.user.id + " USER ID");
    //console.log(req.file);
    // var kitData = {
    //     kitName: req.body.get('kitName'),
    //     bom: req.body.get('file')
    // };

    //console.log(req.body);
    db.Kit.create(req.body)
      .then( dbKit => {
        // return db.User.findOneAndUpdate({"_id":req.user.id}, {$push: {"inventory":dbPart._id}});
        kitId = dbKit.id;
        return db.Kit.findOne({ _id: dbKit.id });
      })
    //db.User.findOneAndUpdate({_id:req.user.id}, inventory:req.body)
      // .create(req.body)
      .then( dbKit => {
        return db.Kit.findOneAndUpdate( { _id : dbKit.id},{ createdBy: req.user.id, bom:req.files});
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
