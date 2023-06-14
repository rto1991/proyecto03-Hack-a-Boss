import { useUser } from "../UserContext";

function useFetchPost() {
  const [user] = useUser();
  const post = async (url, body) => {
    const isFormData = body instanceof FormData;

    const headers = {};
    if (user) headers.Authorization = `Bearer ${user.token}`;
    if (!isFormData) headers["Content-Type"] = "application/json";

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error("API error: " + res.status);
    }
    return await res.json();
  };

  return post;
}

export default useFetchPost;
