const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  score: { type: Number, default: 0 },
  prizes: { type: Number, default: 0 }
}, {
  collection: 'user'  // Specify the exact collection name
})

module.exports = mongoose.model('User', userSchema) 