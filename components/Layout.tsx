import { Container, Flex } from "@chakra-ui/react";
import Head from "next/head";
import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <Flex minH="100vh" flexDir="column">
    <Head>
      <title>{title} | iNFT</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <Container maxW={"container.xl"} as="main">
      {children}
    </Container>
    <Footer />
  </Flex>
);

export default Layout;
