import { ChakraProvider } from "@chakra-ui/react";
import { AppPropsType } from "next/dist/next-server/lib/utils";
import { useState } from "react";
import { User, UserContext } from "../utils/context/user";

function MyApp({ Component, pageProps }: AppPropsType) {
  const [user, setUser] = useState<User | null>(null);
  return (
    <ChakraProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
  );
}
export default MyApp;
