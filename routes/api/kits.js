const router = require('express').Router();
const kitsController = require('../../controllers/kitsController');

router.route('/')
  .get(kitsController.findAll)
  .post(kitsController.create);

// Matches with "/api/kits/:id"
router
  .route('/:id')
  .get(kitsController.findById)
  .put(kitsController.update)
  .delete(kitsController.remove);

module.exports = router;
