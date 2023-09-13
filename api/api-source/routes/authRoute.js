const router = require('express').Router();
const authController = require('../controllers/authController');
const isAuth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

router.get('/get-auth', isAuth, authController.getAuth);
router.post('/register', isAuth, authController.register);
router.post('/login', authController.login);

module.exports = router;
