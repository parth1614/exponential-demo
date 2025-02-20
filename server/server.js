require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/User')
const { calculateClick, updateUserScore } = require('./jobs/gameLogic')

const app = express()
app.use(cors())
app.use(express.json())

// MongoDB Atlas connection with error handling
const uri = process.env.MONGODB_URI
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err))

app.post('/api/click', async (req, res) => {
  const { userId } = req.body
  const result = calculateClick()
  const user = await updateUserScore(User, userId, result.points, result.prize)
  res.json({ ...result, user })
})

app.get('/api/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(user)
})

app.post('/api/user', async (req, res) => {
  const user = new User()
  await user.save()
  res.json(user)
})

const PORT = process.env.PORT || 5001

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) 