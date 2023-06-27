import { useUser } from "../UserContext";
import Swal from "sweetalert2";
import fileSaver from "file-saver";

function useFileDownload() {
  const [user] = useUser();
  const getFile = async (url, fileName) => {
    try {
      const headers = {};
      if (user) headers.Authorization = `${user.data.token}`;
      headers["Content-Disposition"] = "attachment: filename = " + fileName;
      const res = await fetch(url, { headers });
      const blob = await res.blob();
      if (!res.ok) {
        const mensaje = await res.json();
        const error = new Error("API error:" + mensaje.message);
        error.httpStatus = 500;
        throw error;
      }
      fileSaver.saveAs(blob, fileName);
      return res;
    } catch (error) {
      Swal.fire({
        title: "Error en GetFile!",
        text: error,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return getFile;
}

export default useFileDownload;
