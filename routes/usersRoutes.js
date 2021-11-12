var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')

/* GET users listing. */
router.get('/', usersController.list)  //justchecking
router.get('/favourites', usersController.listFavs)

router.post('/add_favourites/:id', usersController.addFavourites)

router.delete('/delete_favourite/:id', usersController.deleteFavourite)


module.exports = router;
