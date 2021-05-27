import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { generateURI, sendPost } from "../api";

export type User = {
  id?: number;
  nickname?: string;
  cookie?: string;
};

export const UserContext = createContext<{
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}>({
  user: null,
  setUser: () => {},
  loading: false,
  setLoading: () => {},
});

export const useAuth = () => {
  const router = useRouter();
  const { setUser, setLoading } = useContext(UserContext);
  const setUserContext = async (cookie: string, redirect?: string) => {
    const result = await axios.get(
      generateURI(`api/v1/user?user_cookie=${cookie}`)
    );
    if (result.data) {
      setUser({ ...result.data.data, cookie });
      router.push("/me");
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
      const result = await sendPost("/api/login", {
        nickname,
        password,
      });
      //@ts-ignore
      if (result?.ok) {
        await setUserContext(result.cookie).catch(console.error);
      } else {
        throw new Error("error");
      }
    } finally {
    }
  };

  const register = async (nickname: string, password: string) => {
    try {
      const result = await sendPost("/api/signup", {
        nickname,
        password,
      });
      if (result?.ok) {
        await setUserContext(result.cookie).catch(console.error);
      } else {
        throw new Error("error");
      }
    } finally {
    }
  };

  const getUser = async () => {
    const cookies = parseCookies();

    if (cookies.user_cookie) {
      setLoading(true);
      await setUserContext(cookies.user_cookie);
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    Object.keys(Cookies.get()).forEach(function (cookieName) {
      Cookies.remove(cookieName);
    });
    setUser(null);
    router.push("/auth/signin");
  };

  return { login, register, logout, getUser, deleteUser };
};
