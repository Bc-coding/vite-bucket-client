import React from "react";
import styled from "@emotion/styled";
import Logo from "./header/Logo";

/**
 * Footer is useless component to make our app look a little closer to a real website!
 */
const Footer = ({ children }) => {
  return (
    <FooterContainer>
      <Logo />
    </FooterContainer>
  );
};

export default Footer;

/** Footer styled components */
const FooterContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  // color: "pink",
  marginTop: 30,
  height: 100,
  // padding: 20,
  backgroundColor: "white",
  borderTop: `solid 1px lightgrey`,
});
