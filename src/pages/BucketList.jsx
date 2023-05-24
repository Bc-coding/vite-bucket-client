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
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
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

function IdeaCardCollection({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

const BucketList = () => {
  // CONTEXT
  const { isUserLoggedIn } = useContext(AuthContext);

  const {
    loading: readAllListLoading,
    error: readAllListError,
    data: readAllListData,
    refetch,
  } = useQuery(READ_ALL_BUCKET_LIST_BY_USER, { fetchPolicy: "network-only" });

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + 9;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = readAllListData?.readAllBucketList.posts.slice(
    itemOffset,
    endOffset
  );
  const pageCount = Math.ceil(
    readAllListData?.readAllBucketList.posts.length / 9
  );

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * 9) % readAllListData?.readAllBucketList.posts.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const IdeaCardCollection = ({ currentItems }) => {
    // console.log(customElements);
    console.log(currentItems);
    return (
      <>
        {currentItems.map((item, i) => (
          <IdeaCard key={i} item={item} />
        ))}
      </>
    );
  };

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
          {readAllListData?.readAllBucketList.posts.length > 0 ? (
            <>
              <SimpleGrid
                spacing={4}
                templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
              >
                <IdeaCardCollection currentItems={currentItems} />
              </SimpleGrid>
              <ReactPaginateWrapper>
                <ReactPaginate
                  breakLabel='...'
                  nextLabel={<ChevronRightIcon />}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel={<ChevronLeftIcon />}
                  renderOnZeroPageCount={null}
                />
              </ReactPaginateWrapper>
            </>
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
