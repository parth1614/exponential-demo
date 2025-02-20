import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const initUser = async () => {
      const userId = localStorage.getItem('userId')
      if (userId) {
        const { data } = await axios.get(`https://exponential-demo-qobz.vercel.app/api/user/${userId}`)
        setUser(data)
      } else {
        const { data } = await axios.post('https://exponential-demo-qobz.vercel.app/api/user')
        localStorage.setItem('userId', data._id)
        setUser(data)
      }
    }
    initUser()
  }, [])

  const handleClick = async () => {
    if (clicking) return
    setClicking(true)

    try {
      const { data } = await axios.post('https://exponential-demo-qobz.vercel.app/api/click', {
        userId: user._id
      })

      setUser(data.user)

      if (data.points === 10) {
        alert('Bonus! You got 10 points!')
      }
      if (data.prize) {
        alert('Congratulations! You won a prize!')
      }
    } catch (err) {
      console.error(err)
    }

    setClicking(false)
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="App">
      <h1>Score: {user.score}</h1>
      <h2>Prizes: {user.prizes}</h2>
      <button
        className={clicking ? 'clicking' : ''}
        onClick={handleClick}
      >
        Click Me!
      </button>
    </div>
  )
}

export default App 