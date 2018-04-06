const router = require("express").Router();
const partRoutes = require("./parts");
const authRoutes = require("./auth");
const usersRoutes = require("./users");

// Book routes
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);

router.use("/parts", partRoutes);

module.exports = router;
