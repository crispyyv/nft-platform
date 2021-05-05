import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { useAuth } from "../utils/context/user";

export default function LoginOrRegisterForm({ isLogin = true }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const { login, register } = useAuth();

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    setLoading(true);
    if (isLogin) {
      login(email, password);
    } else {
      register(email, password);
    }
    setLoading(false);
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="650px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>{isLogin ? "Login" : "Register"}</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="test@test.com"
                size="lg"
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="*******"
                size="lg"
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </FormControl>
            <Button
              variantColor="teal"
              variant="outline"
              size="lg"
              type="submit"
              width="full"
              mt={6}
              isLoading={loading}
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
            <Link href={isLogin ? "/auth/signup" : "/auth/signin"}>
              <Text
                as="a"
                fontFamily="heading"
                fontWeight="medium"
                display="block"
                mt={4}
                transition="all"
                transitionDuration=".3s"
                cursor="pointer"
                color="gray.400"
                _hover={{ color: "purple.500" }}
              >
                * {isLogin ? "Don't have an account?" : "Have an account?"}
              </Text>
            </Link>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
