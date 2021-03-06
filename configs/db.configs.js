const mongoose = require('mongoose')

const DB_NAME = process.env.DB_NAME || 'house4ya'
//const MONGODB_URI = `mongodb://localhost:27017/${DB_NAME}`
const MONGODB_URI = `mongodb+srv://carlos:carlos123@cluster0.i1e2u.mongodb.net/whateverdatabase?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URI, { useUnifiedTopology:true ,useNewUrlParser: true })
.then( () => {
  console.info(`Connected to the database: ${MONGODB_URI}`)
})
.catch(error => {
  console.error('Database connection error:', error)
})