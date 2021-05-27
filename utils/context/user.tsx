import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { generateURI, sendPost } from "../api";

export type User = {
  id?: number;
  nickname?: string;
};

export const UserContext = createContext<{
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {},
});

export const useAuth = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const setUserContext = async (redirect?: string) => {
    const result = await axios.get(generateURI("api/v1/user"), {
      withCredentials: true,
    });
    if (!result) {
      setUser(result);
    }
    if (redirect) {
      router.push(redirect);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const login = async (nickname: string, password: string) => {
    try {
      const result = await sendPost(generateURI("login"), {
        nickname,
        password,
      });
      //@ts-ignore
      if (result?.data) {
        Cookies.set(
          result?.data?.set_cookie?.key,
          result?.data?.set_cookie?.value
        );
        setTimeout(async () => await setUserContext(), 300);
      }
    } finally {
      console.log(user);
    }
  };

  const register = async (nickname: string, password: string) => {
    try {
      const result = await sendPost("/api/signup", {
        nickname,
        password,
      });
      if (result.ok) {
        await setUserContext().catch(console.error);
      }
    } finally {
      console.log(user);
    }
  };

  return { login, register, logout };
};
