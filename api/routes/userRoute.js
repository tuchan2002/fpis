const router = require('express').Router();
const userController = require('../controllers/userController');
const isAuth = require('../middlewares/auth');

router.get('/', isAuth, userController.getUsers);
router.get('/:id', isAuth, userController.getUserById);
router.get('/role/:role', isAuth, userController.getUsersByRole);

module.exports = router;
