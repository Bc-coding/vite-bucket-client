import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  SimpleGrid,
  Heading,
  Text,
  Button,
  Link,
  Stack,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { useQuery, useLazyQuery } from "@apollo/client";
import { READ_ALL_BUCKET_LIST_BY_USER } from "../queries/index";
import { QueryResult } from "../components/index";
import styled from "@emotion/styled";
import AuthContext from "../context/authContext";
import IdeaCard from "../components/IdeaCard";
import { ReactComponent as CurlyArrow } from "../assets/curved-arrow.svg";

const BucketList = () => {
  // CONTEXT
  const { isUserLoggedIn } = useContext(AuthContext);

  const {
    loading: readAllListLoading,
    error: readAllListError,
    data: readAllListData,
    refetch,
  } = useQuery(READ_ALL_BUCKET_LIST_BY_USER, { fetchPolicy: "network-only" });

  if (isUserLoggedIn) {
    return (
      <Layout>
        <ButtonWrapper>
          <Link href='/add-post'>
            <Button colorScheme='pink'>Add an idea</Button>
          </Link>
        </ButtonWrapper>
        <QueryResult
          error={readAllListError}
          loading={readAllListLoading}
          data={readAllListData}
        >
          {readAllListData?.readAllBucketList.posts.length > 1 ? (
            <SimpleGrid
              spacing={4}
              templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
            >
              {readAllListData?.readAllBucketList.posts.map((item, i) => {
                return <IdeaCard key={i} item={item} />;
              })}
            </SimpleGrid>
          ) : (
            <>
              <Stack spacing={6}>
                <CurlyArrow iconname='curlyArrow' />
                <Heading fontSize='4xl'>
                  Your bucket list is currently empty
                </Heading>
                <Text fontSize='2xl'>
                  Let's create your first bucket list item by clicking the
                  button above
                </Text>
              </Stack>
            </>
          )}
        </QueryResult>
      </Layout>
    );
  } else {
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
};

export default BucketList;

const ButtonWrapper = styled.div({
  marginBottom: "30px",
});

const LoginMsgContainer = styled.div({
  marginTop: "160px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const LinkSpan = styled.span({
  color: "hotpink",
});
