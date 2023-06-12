import useFetch from "fetch-suspense";
import { useUser } from "../UserContext";
import useFetchPost from "./useFetchPost";

export const useQuestions = () =>
  useFetch("https://overflow.anxoso.com/questions");
export const useQuestion = (id) =>
  useFetch(`https://overflow.anxoso.com/questions/${id}`);

// ---

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

// ---

export function useQAActions() {
  const fetchPost = useFetchPost();

  const sendQuestion = (title, question) =>
    fetchPost("https://overflow.anxoso.com/questions", { title, question });

  const sendAnswer = (id, answer) =>
    fetchPost(`https://overflow.anxoso.com/questions/${id}/answer`, { answer });

  return { sendQuestion, sendAnswer };
}
