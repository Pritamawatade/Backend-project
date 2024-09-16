import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    axios.get('/api/jokes')
      .then((response) => {
        setJokes(response.data)
      })
      .catch((error) => {
        console.error('Error fetching jokes:', error)
      })
  })
  return (
    <>
      <h1>Stay hard </h1>
      <p>JOKESc: {jokes.length}</p>

      {
        jokes.map((joke, index) => (
          <div key={joke.age}>
            <h3>{joke.name}</h3>
            <p>{joke.joke}</p>

          </div>
        ))
      }
    </>
  )
}

export default App
