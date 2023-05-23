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
import ReactPaginate from "react-paginate";
import LoginSignupMsg from "../components/LoginSignupMsg";
import EmptyBucketMsg from "../components/EmptyBucketMsg";

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
                return (
                  <>
                    <IdeaCard key={i} item={item} />
                    <ReactPaginate
                      breakLabel='...'
                      nextLabel='next >'
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel='< previous'
                      renderOnZeroPageCount={null}
                    />
                  </>
                );
              })}
            </SimpleGrid>
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
