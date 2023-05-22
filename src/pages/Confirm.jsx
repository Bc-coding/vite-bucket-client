import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import styled from "@emotion/styled";
import { Text, Link, Stack } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { VERIFY_EMAIL } from "../queries";
import { QueryResult } from "../components/index";

export default function Confirm() {
  let { confirmationCode } = useParams();

  const [verifyEmail, { loading, data, error }] = useMutation(VERIFY_EMAIL, {
    // to observe what the mutation response returns
    onCompleted: (data, error) => {
      if (error) {
        console.log(error);
      }
      // Store token if login is successful
      if (data) {
        console.log(data);
      }
    },
  });

  useEffect(() => {
    verifyEmail({
      variables: {
        input: {
          confirmationCode: confirmationCode,
        },
      },
    });
  }, []);

  return (
    <Layout>
      <QueryResult error={error} loading={loading} data={data}>
        <ConfirmContainer>
          <Stack spacing={3}>
            <Text fontSize='6xl'>Hi! 👋</Text>
            <Text fontSize='5xl'>Your account has been verified</Text>
            <Text fontSize='2xl'>
              Please
              <LinkSpan>
                <Link href={`/login`}>log in</Link>
              </LinkSpan>{" "}
              to start creating your bucket list
            </Text>
          </Stack>
        </ConfirmContainer>
      </QueryResult>
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
