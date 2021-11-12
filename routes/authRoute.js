var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController')
const isAuth = require('../middlewares/isAuth.mid')
const uploader = require('../configs/storage.config')

/* GET home page. */
router.post('/register', authController.register );
router.post('/login', authController.login )
router.post('/logout', isAuth.isAuthenticated, authController.logout )

router.get('/profile', isAuth.isAuthenticated, authController.profile )

router.put('/profile', uploader.single('avatar'), isAuth.isAuthenticated, authController.updateProfile )

module.exports = router;
