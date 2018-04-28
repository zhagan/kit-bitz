const router = require('express').Router();
const partsController = require('../../controllers/partsController');
const Axios = require('axios');
const mustBeLoggedIn = require('../../middleware/mustBeLoggedIn');

function getParts(req, res) {

  var keyword = req.body.keyword;

  var question = {
    q: keyword,
    start: 0,
    limit: 10
  };

  var url = 'http://octopart.com/api/v3/parts/search?';
  url += '&apikey=d7585fa3';
  url += '&include[]=specs';
  url += '&include[]=imagesets';
  url += '&include[]=category_uids';

  return Axios.get(url, {
    params: question
  })
    .then(response => {
      response.data.results.forEach(result => {

        console.log(result.item);

      });

      res.send(response.data);
    })
    .catch(error => {
      res.json(error);
    });
}

router.route('/')
  .get(mustBeLoggedIn(), partsController.findAll)
  .post(mustBeLoggedIn(), partsController.create);

router.route('/search/')
  .post(getParts);


// Matches with "/api/parts/:id"
router
  .route('/:id')
  .get(mustBeLoggedIn(), partsController.findById)
  .put(mustBeLoggedIn(), partsController.update)
  .delete(mustBeLoggedIn(), partsController.remove);

module.exports = router;
