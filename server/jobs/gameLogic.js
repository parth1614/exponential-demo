const calculateClick = () => {
  const result = { points: 1, prize: false }

  // 50% chance for bonus points (10 points)
  const bonusRoll = Math.random()
  if (bonusRoll < 0.5) {  // This gives exactly 50% chance
    result.points = 10
  }

  // 25% chance for prize
  const prizeRoll = Math.random()
  if (prizeRoll < 0.25) {  // This gives exactly 25% chance
    result.prize = true
  }

  return result
}

const updateUserScore = async (User, userId, points, prize) => {
  const update = {
    $inc: {
      score: points,
      prizes: prize ? 1 : 0
    }
  }

  return await User.findByIdAndUpdate(userId, update, { new: true })
}

module.exports = { calculateClick, updateUserScore } 