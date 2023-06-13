import { useState } from 'react'
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
