import { useUser } from "../UserContext";
import "./Dashboard.css";

// react-router components
import { Navigate } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";
import SideMenu from "./components/SideMenu";
import FileArea from "./components/FileArea";
import Footer from "./components/Footer";
import FileSearch from "./components/FileSearch";

function Dashboard() {
  const [user] = useUser();

  if (!user || user.status == "error") {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainApp">
      <TopNavBar></TopNavBar>
      <FileSearch></FileSearch>
      <SideMenu></SideMenu>
      <FileArea></FileArea>
      <Footer></Footer>
    </div>
  );
}

export default Dashboard;
