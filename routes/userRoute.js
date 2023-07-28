const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);
router.get("/role/:role", userController.getUsersByRole);

module.exports = router;
