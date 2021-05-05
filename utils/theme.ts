import { extendTheme } from "@chakra-ui/react";
// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
// 3. extend the theme
//@ts-ignore
const theme = extendTheme({ config });
export default theme;
