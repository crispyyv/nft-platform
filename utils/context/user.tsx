import { useRouter } from "next/router";
import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { generateURI, sendGet, sendPost } from "../api";

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
    const result = await sendGet(generateURI(`api/v1/user/`));
    if (!result.error) {
      setUser(result.data);
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
      if (result?.data === "success") {
        await setUserContext();
      }
    } finally {
      console.log(user);
    }
  };

  const register = async (nickname: string, password: string) => {
    try {
      const result = await sendPost(generateURI("api/v1/user/create"), {
        nickname,
        password,
      });
      //@ts-ignore
      if (result?.data?.id) {
        await setUserContext(result.data.id);
      }
    } finally {
      console.log(user);
    }
  };

  return { login, register, logout };
};
