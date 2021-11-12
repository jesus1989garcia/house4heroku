const express = require('express')
const router = express.Router()
const houseController = require('../controllers/houseController')
const uploader = require('../configs/storage.config')

router.get('/list', houseController.list )
router.get('/properties', houseController.listHouses)
router.get('/detail_house/:id', houseController.detailHouse)

router.post('/create_house', houseController.createHouse)

router.put('/edit_house/:owner/:house',uploader.single('photos'), houseController.editHouse)
router.put('/edit_house/:owner/:house/imgs',uploader.array('photos'), houseController.editHouseImgs)
router.put('/edit_house/:owner/:house/location', houseController.editCoords)
router.put('/edit_house/:owner/:house/citatella', houseController.editCitatella)

router.delete('/delete_house/:owner/:house', houseController.deleteHouse)

module.exports = router