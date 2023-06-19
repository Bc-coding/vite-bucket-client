
import styled from "@emotion/styled";
import {
  Text,
} from "@chakra-ui/react";


const Footer = ({ children }) => {
  return (
    <FooterContainer>
      <Text><a href="mailto:buckettesting@hotmail.com?subject = Feedback&body = Message">
        Send Feedback
      </a></Text>
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
  color: "hotpink",
  marginTop: 30,
  height: 100,
  // padding: 20,
  borderTop: `solid 1px lightgrey`,
});
