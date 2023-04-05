import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import styled from "@emotion/styled";
import { Text, Link, Stack } from "@chakra-ui/react";

export default function Confirm() {
  let { confirmationCode } = useParams();
  console.log(confirmationCode);

  return (
    <Layout>
      <ConfirmContainer>
        <Stack spacing={3}>
          <Text fontSize="6xl">Hi! 👋</Text>
          <Text fontSize="5xl">Account confirmed</Text>
          <Text fontSize="2xl">
            Please
            <LinkSpan>
              <Link href={`/login`}>log in</Link>
            </LinkSpan>{" "}
            to see your bucket list
          </Text>
        </Stack>
      </ConfirmContainer>
    </Layout>
  );
}

const ConfirmContainer = styled.div({
  marginTop: "160px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const LinkSpan = styled.span({
  color: "hotpink",
  marginLeft: "5px",
});
