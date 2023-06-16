
import { useState, useContext } from "react";
import {
  Button,
  Link,
} from "@chakra-ui/react";

import Layout from "../components/Layout";
import { useQuery } from "@apollo/client";
import { READ_ALL_BUCKET_LIST_BY_USER } from "../queries/index";
import { QueryResult } from "../components/index";
import styled from "@emotion/styled";
import AuthContext from "../context/authContext";

import LoginSignupMsg from "../components/LoginSignupMsg";
import EmptyBucketMsg from "../components/EmptyBucketMsg";

import SortableList from "../components/SortableList";



const BucketList = () => {
  // CONTEXT
  const { isUserLoggedIn } = useContext(AuthContext);

  const {
    loading: readAllListLoading,
    error: readAllListError,
    data: readAllListData,
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
          {readAllListData?.readAllBucketList?.posts?.length > 0 ? (
            <SortableList items={readAllListData?.readAllBucketList?.posts} />
          ) : (
            <EmptyBucketMsg />
          )}
        </QueryResult>
      </Layout>
    );
  } else {
    return <LoginSignupMsg />;
  }
};

export default BucketList;

const ButtonWrapper = styled.div({
  marginBottom: "30px",
});


