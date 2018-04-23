const router = require("express").Router();
const createKitController = require("../../controllers/createKitController");
const octopartjs = require('octopartjs');
const Axios = require('axios');

// Matches with "/api/books"

function getKits(req, res){
  //res.json("get ppappapapaparts");
}

router.route("/")
  .get(createKitController.findAll)
  .post(createKitController.create);

router.route("/search/")
  .post(getKits);


// Matches with "/api/createkit/:id"
router
  .route("/:id")
  .get(createKitController.findById)
  .put(createKitController.update)
  .delete(createKitController.remove);

module.exports = router;
