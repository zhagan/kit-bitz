const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    console.log("getting all parts");
    db.User.findById({ _id: req.user.id })

      .then(dbUser => {
        res.json(dbUser.inventory);
      })
  },

  findById: function (req, res) {
    console.log(req.params.id);
    db.Part
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: function (req, res) {

    let partData = req.body;
    partData._id = req.body.item.mpn;
  //db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )
  db.User.find( { $and: [ { _id: req.user.id },{ inventory:{$elemMatch: {MPN:partData._id}}} ] }).count().then(
    count => {
  if(count > 0){
    console.log("part exists");
  }else{
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
      .then(dbModel => res.json(dbModel))
      .then(
        // console.log(partData._id)
        db.Part.findOneAndUpdate({ _id: partData._id }, partData, { upsert: true }, () => {
          console.log(partData._id)
        })
        )
      }
      });
    },

  update: function (req, res) {
    console.log('Update part route hit');
    // db.User.findById(req.user.id).then( dbUser => {
    //   console.log('request:'. req.body.data);
    // })
    var partId = req.body.id;
    var newQty = req.body.qty;
    
    db.User.findById(req.user.id).then(dbUser => {
      dbUser.inventory.forEach( item => {
        if (item.MPN === partId) {
          item.Qty = newQty;
        }
      });

      dbUser.save();
      res.json({msg: 'Qty updated'});
    })
    .catch( error => {
      res.json({error: 'failed'});
    })
    
    // db.Part
    //   .findOneAndUpdate({ _id: req.params.id }, req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },

  remove: function (req, res) {
    console.log("MPN: " + req.params.id);
    console.log("User: " + req.user.id);
    db.User
      .findOneAndUpdate({ _id: req.user.id }, {
        $pull: {
          inventory: {
            MPN: req.params.id
          }
        }
      })

      //   .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  }
};
