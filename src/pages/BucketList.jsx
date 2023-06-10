
import { useState, useContext } from "react";
import {
  SimpleGrid,
  Button,
  Link,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Layout from "../components/Layout";
import { useQuery } from "@apollo/client";
import { READ_ALL_BUCKET_LIST_BY_USER } from "../queries/index";
import { QueryResult } from "../components/index";
import styled from "@emotion/styled";
import AuthContext from "../context/authContext";
import ReactPaginate from "react-paginate";
import LoginSignupMsg from "../components/LoginSignupMsg";
import EmptyBucketMsg from "../components/EmptyBucketMsg";
import IdeaCardCollection from "../components/IdeaCardCollection";
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
            // <>
            //   <SimpleGrid
            //     spacing={4}
            //     templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
            //   >
            //     <IdeaCardCollection currentItems={currentItems} />
            //   </SimpleGrid>
            //   <ReactPaginateWrapper>
            //     <ReactPaginate
            //       breakLabel='...'
            //       nextLabel={<ChevronRightIcon />}
            //       onPageChange={handlePageClick}
            //       pageRangeDisplayed={5}
            //       pageCount={pageCount}
            //       previousLabel={<ChevronLeftIcon />}
            //       renderOnZeroPageCount={null}
            //     />
            //   </ReactPaginateWrapper>
            // </>
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

const ReactPaginateWrapper = styled("div")`
  margin: 40px 0;
  width: 100%;

  ul {
    list-style-type: none;
    display: flex;
    justify-content: space-between;

    > li:not(:first-child, :last-child) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

    > li.selected {
      background: #879dd4;
      color: white;
    }

    > li:hover:not(.active, :first-child, :last-child) {
      background-color: #f1f4f9;
    }
  }
`;
