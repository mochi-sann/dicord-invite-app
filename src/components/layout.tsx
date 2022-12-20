import Header from "./header";
import Footer from "./footer";
import type { ReactNode } from "react";
import { Container } from "@chakra-ui/react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Container as="main">{children}</Container>
      <Footer />
    </>
  );
}
