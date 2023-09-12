const router = require('express').Router();
const userController = require('../controllers/userController');
const isAuth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

router.get('/', isAuth, isAdmin, userController.getUsers);
router.get('/:id', isAuth, isAdmin, userController.getUserById);
router.get('/role/:role', isAuth, userController.getUsersByRole);

module.exports = router;
