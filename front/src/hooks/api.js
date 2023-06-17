import { useUser } from "../UserContext";
import useFetchPost from "./useFetchPost";

export function useUserActions() {
  const fetchPost = useFetchPost();
  const [, setUser] = useUser();

  const signin = (name, last_name, role, mail, pwd) =>
    fetchPost("http://localhost:3000/signin", {
      name,
      last_name,
      role,
      mail,
      pwd,
    }).then((data) => setUser(data));

  const login = (mail, pwd) =>
    fetchPost("http://localhost:3000/login", { mail, pwd }).then((data) =>
      setUser(data)
    );

  const logout = () => setUser();

  return { signin, login, logout };
}
