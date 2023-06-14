import { useUser } from "../UserContext";
import useFetchPost from "./useFetchPost";

export function useUserActions() {
  const fetchPost = useFetchPost();
  const [, setUser] = useUser();

  const signup = (name, email, password) =>
    fetchPost("https://overflow.anxoso.com/signup", {
      name,
      email,
      password,
    }).then((data) => setUser(data));

  const login = (mail, pwd) =>
    fetchPost("http://localhost:3000/login", { mail, pwd }).then((data) =>
      setUser(data)
    );

  const logout = () => setUser();

  return { signup, login, logout };
}
