const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    console.log("getting all parts");
    db.User.findById({ _id: req.user.id })
      .populate('parts')
      .then(console.log())


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
  findById: function (req, res) {
    //  console.log("get PAAAAART");
    db.Part
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {

    let partData = req.body;
    partData._id = req.body.item.mpn;

    db.User.findOneAndUpdate({ _id: req.user.id }, {
      $push: {
        inventory: {
          MPN: partData._id,
          Qty: 1,
          Img: req.body.item.imagesets[0].small_image.url,
          Snippet: req.body.snippet
        }
      }
    })
      .then(dbModel => res.json(dbModel));
  },
  update: function (req, res) {
    db.Part
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Part
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
