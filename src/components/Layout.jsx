
import Header from "./header/Header";
import { Container } from "@chakra-ui/react";
import Footer from "./Footer.jsx"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxW="container.md" marginTop="140px">
        {children}
      </Container>
      <Footer />
    </>
  );
};
export default Layout;
