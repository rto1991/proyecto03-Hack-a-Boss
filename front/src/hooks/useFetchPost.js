import { useUser } from "../UserContext";

function useFetchPost() {
  const [user] = useUser();
  const post = async (url, body) => {
    const isFormData = body.uploadedFile instanceof FormData;
    console.log(isFormData, body.uploadedFile.get("uploadedFile"));
    const headers = {};
    if (user) headers.Authorization = `${user.data.token}`;
    !isFormData
      ? (headers["Content-Type"] = "application/json")
      : (headers["Content-type"] = body.uploadedFile.get("uploadedFile").type);
    headers["content-length"] = `${body.uploadedFile.get("uploadedFile").size}`;

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: isFormData ? body.uploadedFile : JSON.stringify(body),
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
