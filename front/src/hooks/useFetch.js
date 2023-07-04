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
      const mensaje = await res.json();
      if (!res.ok) {
        const error = new Error("API error:" + mensaje.message);
        error.httpStatus = 500;
        throw error;
      } else {
        if (mensaje.status == "success") {
          let timerInterval;
          Swal.fire({
            icon: "success",
            title: mensaje.message,
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              timerInterval = setInterval(() => {}, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
            }
          });
        }
      }

      return mensaje;
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
