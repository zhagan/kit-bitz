const router = require('express').Router();
const db = require('../../models');

router.route('/')
  // POST to /api/users will create a new user
  .post((req, res, next) => {
    db.User.create(req.body)
      .then(user => {

        const { id, username } = user;
        res.json({
          id, username
        });
      })
      .catch(err => {
        // if this error code is thrown, that means the username already exists.
        // let's handle that nicely by redirecting them back to the create screen
        // with that flash message
        if (err.code === 11000) {
          res.status(400).json({
            message: 'Username already in use.'
          });
        }

        // otherwise, it's some nasty unexpected error, so we'll just send it off to
        // to the next middleware to handle the error.
        next(err);
      });
  });

router.route('/getuser')
// POST to /api/users will create a new user
  .get((req, res, next) => {
    db.User.findOne({_id:req.user.id})
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        // if this error code is thrown, that means the username already exists.
        // let's handle that nicely by redirecting them back to the create screen
        // with that flash message
        if (err.code === 11000) {
          res.status(400).json({
            message: 'no user found'
          });
        }

        // otherwise, it's some nasty unexpected error, so we'll just send it off to
        // to the next middleware to handle the error.
        next(err);
      });
  });

module.exports = router;
