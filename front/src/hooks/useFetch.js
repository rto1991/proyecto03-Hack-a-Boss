import { useUser } from "../UserContext";
import Swal from "sweetalert2";

function useFetch() {
  const [user] = useUser();
  const get = async (url) => {
    try {
      const headers = {};
      if (user) headers.Authorization = `${user.data.token}`;
      headers["Content-Type"] = "application/json";
      const res = await fetch(url, { headers });
      if (!res.ok) {
        const mensaje = await res.json();
        const error = new Error("API error:" + mensaje.message);
        error.httpStatus = 500;
        throw error;
      }
      return await res.json();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  return get;
}
export default useFetch;
