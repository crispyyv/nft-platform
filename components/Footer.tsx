import { Box, Container } from "@chakra-ui/react";
import React from "react";

export default function Footer() {
  return (
    <Box
      as="footer"
      mt="auto"
      h={14}
      borderTop="1px solid"
      borderColor="gray.100"
    >
      <Container
        maxW="container.xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
        h="100%"
      >
        All right reserved
      </Container>
    </Box>
  );
}
