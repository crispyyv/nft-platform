import { ChakraProvider } from "@chakra-ui/react";
import { AppPropsType } from "next/dist/next-server/lib/utils";
import { useEffect, useState } from "react";
import { useAuth, User, UserContext } from "../utils/context/user";

function MyApp({ Component, pageProps }: AppPropsType) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { getUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => await getUser().catch(console.error);
    fetchUser();
  }, []);
  return (
    <ChakraProvider>
      <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
  );
}
export default MyApp;
