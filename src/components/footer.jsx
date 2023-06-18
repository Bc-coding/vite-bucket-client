
import styled from "@emotion/styled";



const Footer = ({ children }) => {
  return (
    <FooterContainer>
      <p>Hi</p>
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
