import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import SingIn from "./views/SingIn";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/singin" element={<SingIn />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
