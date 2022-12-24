import Header from "./header";
import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Container, Flex } from "@chakra-ui/react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Flex flexDir={"column"} h="100vh">
      <Container flex="1" as="main">
        <Header />
        {children}
      </Container>
      <Footer />
    </Flex>
  );
}
