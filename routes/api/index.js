const router = require('express').Router();
const partRoutes = require('./parts');
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const createkitRoutes = require('./createkit');
const kitsRoutes = require('./kits');

// Book routes
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/parts', partRoutes);
router.use('/createkit', createkitRoutes);
router.use('/kits', kitsRoutes);

module.exports = router;
