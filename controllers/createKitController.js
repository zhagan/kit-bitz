const db = require('../models');
var uuid = require('node-uuid');

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    console.log('getting all of my kits');
    db.Kit.find({ createdBy: req.user.id }).populate('createdBy').then( dbKit => {

      res.json(dbKit);
    });

  },
  findById: function(req, res) {
  //  console.log("get PAAAAART");
    db.Kit
      .findById(req.params.id).populate('createdBy')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    //var kitId;

    console.log('file ' + req.files);

    //save files to server upload folder

    var imgFile = req.files;
    var uniqueName = uuid.v4() + '.' + imgFile.file.name.split('.').pop();
    console.log(uniqueName);
    var imgPath = './uploads/kit-pics/' + uniqueName;
    imgFile.file.mv(imgPath, function(err) {
      if (err)
        return res.status(500).send(err);

      console.log('File uploaded!');
    });

    var kitImg = {};

    kitImg['path'] = imgPath;
    kitImg['name'] = uniqueName;
    kitImg['originalname'] = imgFile.file.name;



    db.Kit.create(req.body)
      .then( dbKit => {
        return db.Kit.findOne({ _id: dbKit.id });
      })
      .then(dbKit => {
        // parse BOM string to store in database
        const BOM = JSON.parse(req.body.BOM);
        return db.Kit.findOneAndUpdate( { _id : dbKit.id},{ createdBy: req.user.id, bom:BOM, kitImgPath:kitImg});
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
