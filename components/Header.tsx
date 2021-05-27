import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Heading,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { default as NextLink } from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../utils/context/user";

const Header = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { user } = useContext(UserContext);
  return (
    <Box as={"header"} w={"100%"} shadow={"base"} marginBottom="auto">
      <Container
        as="nav"
        maxW={"container.xl"}
        height={"14"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <NextLink href="/">
          <Heading
            cursor="pointer"
            as="a"
            color="purple.400"
            textAlign="center"
            fontSize="32"
          >
            iNFT
          </Heading>
        </NextLink>{" "}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <NextLink href="/market">
            <Text
              as="a"
              fontFamily="heading"
              fontWeight="medium"
              padding={4}
              transition="all"
              transitionDuration=".3s"
              cursor="pointer"
              _hover={{ color: "purple.400" }}
            >
              Market
            </Text>
          </NextLink>

          {!user?.cookie ? (
            <NextLink href="/auth/signup">
              <Text
                as="a"
                fontFamily="heading"
                fontWeight="medium"
                padding={4}
                transition="all"
                transitionDuration=".3s"
                cursor="pointer"
                _hover={{ color: "purple.400" }}
              >
                SignUp
              </Text>
            </NextLink>
          ) : (
            <NextLink href="/me">
              <Text
                as="a"
                fontFamily="heading"
                fontWeight="medium"
                padding={4}
                transition="all"
                transitionDuration=".3s"
                cursor="pointer"
                _hover={{ color: "purple.400" }}
              >
                {user.nickname}
              </Text>
            </NextLink>
          )}
          {}
          <IconButton
            padding={4}
            background={"none"}
            aria-label={"Change color theme"}
            variant="ghost"
            size={"lg"}
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
