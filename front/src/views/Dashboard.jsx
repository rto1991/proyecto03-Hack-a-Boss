import { useUser } from "../UserContext";
import "./Dashboard.css";

// react-router components
import { Navigate } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";
import SideMenu from "./components/SideMenu";
import FileArea from "./components/FileArea";
import Footer from "./components/Footer";
import FileSearch from "./components/FileSearch";
import { useFilesActions } from "../hooks/api";

function Dashboard() {
  const [user] = useUser();
  const { dir, setFiles, files, makeFolder, info, setInfo, changeDir } =
    useFilesActions();

  if (!user || user.status == "error") {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainApp">
      <TopNavBar></TopNavBar>
      <FileSearch
        setInfo={setInfo}
        info={info}
        changeDir={changeDir}
        files={files}
      ></FileSearch>
      <SideMenu
        dir={dir}
        makeFolder={makeFolder}
        info={info}
        setInfo={setInfo}
      ></SideMenu>
      <FileArea
        changeDir={changeDir}
        dir={dir}
        setFiles={setFiles}
        files={files}
      ></FileArea>
      <Footer></Footer>
    </div>
  );
}

export default Dashboard;
