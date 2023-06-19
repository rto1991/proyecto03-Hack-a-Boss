import { useState } from "react";
import { useUser } from "../UserContext";
import useFetch from "./useFetch";
import useFetchPost from "./useFetchPost";

export function useUserActions() {
  const fetchPost = useFetchPost();
  const get = useFetch();
  const [, setUser] = useUser();
  try {
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

    const validate = (regCode) =>
      get("http://localhost:3000/users/validate/" + regCode).then((data) =>
        setUser(data)
      );

    const recoverPassword = (mail) =>
      fetchPost("http://localhost:3000/users/recoverPassword", { mail }).then(
        (data) => setUser(data)
      );

    const resetPassword = (recoverCode, newPassword) =>
      fetchPost("http://localhost:3000/users/resetPassword", {
        recoverCode,
        newPassword,
      }).then((data) => setUser(data));

    const logout = () => setUser();
    return { signin, login, logout, validate, recoverPassword, resetPassword };
  } catch (error) {
    console.log(error);
  }
}

export function useFilesActions() {
  const get = useFetch();
  const [files, setFiles] = useState();
  const [info, setInfo] = useState([]);
  const dir = () => {
    get("http://localhost:3000/dir").then((data) => setFiles(data));
  };

  const makeFolder = (folderName) => {
    get("http://localhost:3000/makeFolder/" + folderName).then((data) =>
      setInfo(data)
    );
  };

  return { dir, makeFolder, info, files };
}
