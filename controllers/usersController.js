const User = require('../models/users-model')
const createError = require('http-errors')
const House = require('../models/house-model')

module.exports.list = (req, res, next) => {
  User.find()
  .then( users => res.status(200).json(users))
}

module.exports.addFavourites = (req, res, next) => {
  user = req.user._id
  //House.findByIdAndUpdate(req.params.id, {interested:req.user._id})
  console.log(`this is the id en params  => ${req.params.id}`)
  
  House.findByIdAndUpdate(req.params.id, {$addToSet:{interested:req.user._id} })
  //.then( house => { 
  // User.findByIdAndUpdate(user, { $addToSet:{favourites: house.interested}})
  // .then( response => res.status(201).json(response))
  .catch(next)
 // })
}

module.exports.listFavs = (req, res, next) => {
  // User.findById(req.user._id).populate('favourites')
  House.find({interested: req.user._id})
  .then(response => res.json(response))
}

module.exports.deleteFavourite = (req, res, next) => {
  House.findByIdAndUpdate(req.params.id, {$pull:{interested:req.user._id}})
  .catch(next)
}