import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import Card from "../components/Card";
import Layout from "../components/Layout";
import { generateURI } from "../utils/api";

export interface MarketProps {
  tokens: Record<any, any>[];
}

export default function market({ tokens }: MarketProps) {
  return (
    <Layout>
      {tokens?.length > 0 ? (
        <SimpleGrid columns={[1, 2, 1, 2]}>
          {tokens?.map((el) => (
            <Card {...el} />
          ))}
        </SimpleGrid>
      ) : (
        <Box w="full" display="flex" justifyContent="center">
          <Text>No available tokens now 🤯🤯🤯</Text>{" "}
        </Box>
      )}
    </Layout>
  );
}

export const getServerSideProps = async () => {
  try {
    const response = await axios.get(generateURI("api/v1/nft-token/all"), {});
    const tokens = response.data.data;

    return { props: { tokens } };
  } catch (err) {
    console.log("error:", err);
    return { props: { tokens: null } };
  }
};
