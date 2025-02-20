require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/User')
const { calculateClick, updateUserScore } = require('./jobs/gameLogic')

const app = express()

app.use(cors({
  origin: [
    'https://exponential-demo-henna.vercel.app',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}))

app.use(express.json())

// MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
})

// Basic health check route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' })
})

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

// For Vercel, we export the app instead of calling listen
module.exports = app 