import { useUser } from "../UserContext";

function useFetchPost() {
  const [user] = useUser();
  const post = async (url, body) => {
    const isFormData = body instanceof FormData;

    const headers = {};
    if (user) headers.Authorization = `${user.data.token}`;
    if (!isFormData) headers["Content-Type"] = "application/json";

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });
    if (!res.ok) {
      const mensaje = await res.json();
      throw new Error("API error: " + mensaje.message);
    }
    return await res.json();
  };

  return post;
}

export default useFetchPost;
