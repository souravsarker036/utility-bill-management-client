import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-blue-600">Tailwind + DaisyUI Working ✅</h1>
      <button className="btn btn-primary mt-5">Click Me</button>
    </div> 
    </>
  )
}

export default App
