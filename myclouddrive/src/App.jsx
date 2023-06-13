import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"
import './App.css'
import Root from "./Routs/Root"
import Login from "./Routs/Login"
import Signup from "./Routs/Signup"
import MyCloudService from './MyCloudService'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
)

function App() {

  return (
    <>
    {/* <RouterProvider router={router} /> */}
     <MyCloudService />
    </>
  )
}

export default App
