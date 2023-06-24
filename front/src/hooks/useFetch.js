import { useUser } from "../UserContext";

function useFetch() {
  const [user] = useUser();
  const get = async (url) => {
    const headers = {};
    if (user) headers.Authorization = `${user.data.token}`;
    const res = await fetch(url, {headers});
    if (!res.ok) {
      const mensaje = await res.json();
      throw new Error("API error: " + mensaje.message);
    }
    return await res.json();
  };
  return get;
}
export default useFetch;
