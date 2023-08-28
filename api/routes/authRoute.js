const router = require('express').Router();
const authController = require('../controllers/authController');
const isAuth = require('../middlewares/auth');

router.get('/get-auth', isAuth, authController.getAuth);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
