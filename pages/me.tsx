import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Box, Button, Flex } from "@chakra-ui/react";

import Layout from "../components/Layout";
import { generateURI, sendGet, sendPost } from "../utils/api";
import { useAuth, UserContext } from "../utils/context/user";
import axios from "axios";

const me = () => {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();
  const [tokens, setTokens] = useState([]);
  const [updateTokens, setUpdateTokens] = useState(true);
  const { deleteUser } = useAuth();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/auth/signin");
    }
  }, [user, loading]);

  useEffect(() => {
    if (user && updateTokens) {
      const fetchUserTokens = async () => {
        const tokens = await sendGet(
          generateURI(`api/v1/nft-token?user_cookie=${user?.cookie}`)
        ).catch(console.error);
        setTokens(tokens?.data);
        setUpdateTokens(false);
      };
      fetchUserTokens();
    }
  }, [user, updateTokens]);

  const handleAddTokens = async () => {
    const response = await sendPost(
      generateURI(`api/v1/nft-token/create?user_cookie=${user?.cookie}`),
      {}
    ).catch(console.error);

    if (response) {
      setUpdateTokens(true);
    }
  };
  const handleDeleteAccount = async () => {
    const response = await axios.delete(
      generateURI(`api/v1/user?user_cookie=${user?.cookie}`)
    );
    if (response?.data?.data === "success") {
      deleteUser();
    }
  };

  return (
    <Layout title="User zone">
      <Flex flexDir="column">
        <Box>Nickname: {JSON.stringify(user)}</Box>
        <Box>Count of tokens: {tokens?.length}</Box>
        {tokens?.length > 0 && (
          <Box>List of tokens: {JSON.stringify(tokens)}</Box>
        )}
      </Flex>
      <Flex>
        <Button onClick={handleAddTokens}>Add token</Button>
      </Flex>
      <Flex>
        <Button onClick={handleDeleteAccount} colorScheme="red">
          Delete account
        </Button>
      </Flex>
    </Layout>
  );
};

export default me;
