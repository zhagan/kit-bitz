const router = require("express").Router();
const kitsController = require("../../controllers/kitsController");
const octopartjs = require('octopartjs');
const Axios = require('axios');

// Matches with "/api/books"

function getKits(req, res){
  //res.json("get ppappapapaparts");
}

router.route("/")
//  .get(kitsController.findAll)
  .post(kitsController.create);

router.route("/search/")
  .post(getKits);


// Matches with "/api/kits/:id"
router
  .route("/:id")
  .get(kitsController.findById)
  .put(kitsController.update)
  .delete(kitsController.remove);

module.exports = router;
