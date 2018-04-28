const router = require('express').Router();
const createKitController = require('../../controllers/createKitController');

router.route('/')
  .get(createKitController.findAll)
  .post(createKitController.create);

router
  .route('/:id')
  .get(createKitController.findById)
  .put(createKitController.update)
  .delete(createKitController.remove);

module.exports = router;
