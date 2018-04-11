const router = require("express").Router();
const partsController = require("../../controllers/partsController");
const octopartjs = require('octopartjs');
const Axios = require('axios');

const mustBeLoggedIn = require('../../middleware/mustBeLoggedIn');

// Matches with "/api/books"

function getParts(req, res){
  //res.json("get ppappapapaparts");

  var keyword = req.body.keyword;

    var  question = {
            q: keyword,
            start: 0,
            limit: 10
        };

    var url = "http://octopart.com/api/v3/parts/search?";
    url += '&apikey=d7585fa3';
    url += '&include[]=specs';
    url += '&include[]=imagesets';
    url += '&include[]=category_uids';

    return Axios.get(url, {
      params: question
    })
      .then(response => {
        response.data.results.forEach( result => {

          console.log(result.item);

        });
        //console.log(response.body);
        res.send(response.data);
      })
      .catch(error => {
        res.json(error);
      });

    // return axios.get("/api/parts");
}

router.route("/")
  .get(mustBeLoggedIn(), partsController.findAll)
  .post(mustBeLoggedIn(), partsController.create);

router.route("/search/")
  .post(getParts);


// Matches with "/api/parts/:id"
router
  .route("/:id")
  .get(mustBeLoggedIn(), partsController.findById)
  .put(mustBeLoggedIn(), partsController.update)
  .delete(mustBeLoggedIn(), partsController.remove);

module.exports = router;
