function useFetch() {
  const get = async (url) => {
    const res = await fetch(url, {});
    if (!res.ok) {
      const mensaje = await res.json();
      throw new Error("API error: " + mensaje.message);
    }
    return await res.json();
  };
  return get;
}
export default useFetch;
