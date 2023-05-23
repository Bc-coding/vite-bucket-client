import { Text, Link, Stack } from "@chakra-ui/react";
import Layout from "../components/Layout";
import styled from "@emotion/styled";

export default function LoginSignupMsg() {
  return (
    <Layout>
      <LoginMsgContainer>
        <Stack spacing={3}>
          <Text fontSize='6xl'>Hi! 👋</Text>
          <Text fontSize='5xl'>Please log in or register</Text>
          <Text fontSize='2xl'>
            You need to{" "}
            <LinkSpan>
              <Link href={`/login`}>log in</Link>
            </LinkSpan>{" "}
            to see your bucket list
          </Text>
          <Text fontSize='2xl'>
            Not registered?
            <LinkSpan>
              <Link href={`/signup`}>Join us </Link>
            </LinkSpan>{" "}
            to start creating your bucket list
          </Text>
        </Stack>
      </LoginMsgContainer>
    </Layout>
  );
}

const LoginMsgContainer = styled.div({
  marginTop: "160px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const LinkSpan = styled.span({
  color: "hotpink",
});
