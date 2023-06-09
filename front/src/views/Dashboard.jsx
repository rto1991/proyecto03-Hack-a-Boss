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
import { useState } from "react";

function Dashboard() {
  const [enPapelera, setEnPapelera] = useState(false);
  const [user] = useUser();
  const {
    dir,
    setFiles,
    files,
    makeFolder,
    info,
    setInfo,
    changeDir,
    renameDir,
    renameFile,
    deleteDir,
    deleteFile,
    uploadFile,
    downloadFile,
    moveFile,
    filesInTrash,
    moveToTrash,
    recoverFromTrash,
  } = useFilesActions();

  if (!user || user.status == "error") {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainApp">
      <TopNavBar></TopNavBar>
      <FileSearch
        makeFolder={makeFolder}
        enPapelera={enPapelera}
        setEnPapelera={setEnPapelera}
        dir={dir}
        setFiles={setFiles}
        setInfo={setInfo}
        info={info}
        changeDir={changeDir}
        files={files}
        filesInTrash={filesInTrash}
      ></FileSearch>
      <SideMenu
        dir={dir}
        makeFolder={makeFolder}
        info={info}
        setInfo={setInfo}
      ></SideMenu>
      <FileArea
        setEnPapelera={setEnPapelera}
        filesInTrash={filesInTrash}
        recoverFromTrash={recoverFromTrash}
        moveToTrash={moveToTrash}
        enPapelera={enPapelera}
        moveFile={moveFile}
        uploadFile={uploadFile}
        deleteFile={deleteFile}
        deleteDir={deleteDir}
        makeFolder={makeFolder}
        renameFile={renameFile}
        changeDir={changeDir}
        dir={dir}
        setFiles={setFiles}
        files={files}
        renameDir={renameDir}
        downloadFile={downloadFile}
        info={info}
      ></FileArea>
      <Footer></Footer>
    </div>
  );
}

export default Dashboard;
