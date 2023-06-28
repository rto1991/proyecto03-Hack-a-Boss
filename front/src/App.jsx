import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import SingIn from "./views/SingIn";
import PasswordRecovery from "./views/PasswordRecovery";
import PasswordChange from "./views/PasswordChange";
import EditProfile from "./views/EditProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/singin" element={<SingIn />} />
      <Route path="/validate/:regCode" element={<Home />} />
      <Route path="/passwordRecovery" element={<PasswordRecovery />} />
      <Route path="/passwordChange" element={<PasswordChange />} />
      <Route path="/editProfile" element={<EditProfile />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
