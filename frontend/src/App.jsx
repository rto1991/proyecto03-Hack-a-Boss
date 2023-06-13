import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyCloudService from './MyCloudService'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <MyCloudService />
    </>
  )
}

export default App
