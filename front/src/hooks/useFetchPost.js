import { useUser } from "../UserContext";
import Swal from "sweetalert2";

function useFetchPost() {
  const [user] = useUser();
  const post = async (url, body) => {
    try {
      const isFormData = body instanceof FormData;
      const headers = {};
      if (user) headers.Authorization = `${user.data.token}`;
      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      } else {
        headers["Content-type"] = "multipart/form-data";
      }

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: isFormData ? body : JSON.stringify(body),
      });
      const mensaje = await res.json();
      if (!res.ok) {
        throw new Error("API error: " + mensaje.message);
      } else {
        if (mensaje.status == "success") {
          Swal.fire({
            title: "Info!",
            text: mensaje.message,
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      }
      return await mensaje;
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return post;
}

export default useFetchPost;
