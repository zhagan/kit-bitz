const db = require('../models');

// Defining methods for the kitsController
module.exports = {
  findAll: function(req, res) {
    console.log('getting all of my kits');
    db.Kit.find({ }).populate('createdBy').then( dbKit => {

      res.json(dbKit);
    });

  },
  findById: function(req, res) {
    db.Kit
      .findById(req.params.id).populate('createdBy')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Kit.create(req.body)
      .then( dbKit => {
        return db.Kit.findOne({ _id: dbKit.id });
      })
      .then(dbKit => {
        // parse BOM string to store in database
        const BOM = JSON.parse(req.body.BOM);
        return db.Kit.findOneAndUpdate( { _id : dbKit.id},{ createdBy: req.user.id, bom:BOM});
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        res.status(422).json(err);
        console.log(err);
      });
  },
  update: function(req, res) {
    db.Kit
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Kit
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
