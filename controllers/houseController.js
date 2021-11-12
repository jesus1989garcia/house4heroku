const House = require('../models/house-model')
const createError = require('http-errors')
const User = require('../models/users-model')
const { json } = require('express')

module.exports.list = (req, res, next) => {
  House.find()
  .then(houses => res.status(200).json(houses))
  .catch(next)
}

module.exports.createHouse = (req, res, next) => {
  const house = new House({
    address: req.body.address,
    description: req.body.description,
    squareMetres: req.body.squareMetres,
    propertyType: req.body.propertyType,
    price: req.body.price,
    owner: req.user._id

  })
  house.save()
  .then(result => {
    
    User.findByIdAndUpdate(req.user._id, { $push:{houses: result.house} } )
    .then( response => res.json(response))
  })
  .catch(next)
}

module.exports.listHouses = (req, res, next) => {
  const user = req.user._id
  // House.find( {owner: user})
  // .then(houses => res.json(houses))
  // .catch(next)
  User.findById(req.user._id).populate('houses')
  .then(response => res.json(response))
  .catch(next)
  
}    

module.exports.editHouse = (req, res, next) => {   //maybe it'bb be bether send it in the body instead of  params
  if ((req.user._id) == (req.params.owner)) { 
  House.findById(req.params.house)
    .then(house => {
      
        Object.keys(req.body).forEach(prop => house[prop] = req.body[prop])
        if (req.file) house.photos = req.file.secure_url
        house.save()
        .then(house => res.status(201).json(house))
    
  })
    .catch(next)
  } else { res.json("you have not permission")}
}

module.exports.editHouseImgs = (req, res, next) => {   //maybe it'bb be bether send it in the body instead of  params
  if ((req.user._id) == (req.params.owner)) { 
  House.findById(req.params.house)
    .then(house => {
      
        Object.keys(req.body).forEach(prop => house[prop] = req.body[prop])
        if (req.files) house.photos = req.files.map(photo => photo.secure_url)
        house.save()
        .then(house => res.status(201).json(house))
    
  })
    .catch(next)
  } else { res.json("you have not permission")}
}

module.exports.editCoords = (req,res,next) => { 
  House.findByIdAndUpdate({_id:req.params.house},{$set:{latitude: req.body.lat, longitude: req.body.lng}})
  .then(houseLoc => {
    res.status(201).json(houseLoc)
    
   })
  // House.findById(req.params.house)
  //.then(console.log("weybo" + req.body.city))
   .catch(next)
}

module.exports.editCitatella = (req,res,next) => { 
  House.findByIdAndUpdate({_id:req.params.house},{$set:{ LaCity: req.body.ciudad}})
  .then(houseLoc => {
    res.status(201).json(houseLoc)
    
   })
  // House.findById(req.params.house)
  .then(console.log("city in back-end " + JSON.stringify(req.body)) )
   .catch(next)

   //JSON.stringify(req.body)) )
}

module.exports.deleteHouse = (req, res, next) => {
  if ((req.user._id) == (req.params.owner)) {
    House.findByIdAndDelete(req.params.house)
    .then(house => {
      res.status(200).json('house deleted successfully')
    })
    .catch(next)
  } else {
    res.json('you have no permission')
  }

}

module.exports.detailHouse = (req, res, next) => {
  House.findById(req.params.id)
  .then(house => {
    res.status(200).json(house)
    console.log(req.params.id)
  })
  .catch(next)
}

