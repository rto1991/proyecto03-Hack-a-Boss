import useFetch from "./useFetch";

export const useLogin = () => useFetch(`http://localhost:3000/users/login`);
export const useNewUser = () => useFetch(`http://localhost:3000/newUser`);
