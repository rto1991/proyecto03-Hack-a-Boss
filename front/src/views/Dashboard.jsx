import { useUser } from "../UserContext";
import "./Dashboard.css";

// react-router components
import { Navigate } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";
import SideMenu from "./components/SideMenu";
import FileArea from "./components/FileArea";
import Footer from "./components/Footer";

function Dashboard() {
  const [user] = useUser();

  if (!user || user.status == "error") {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainApp">
      <TopNavBar></TopNavBar>
      <FileArea></FileArea>
      <Footer></Footer>
      <SideMenu></SideMenu>
    </div>
  );
}

export default Dashboard;
