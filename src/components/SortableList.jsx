import { useState, useContext } from "react";
import {
  SimpleGrid,
  Select,
  Box,
  Flex
} from "@chakra-ui/react";
import IdeaCardCollection from "./IdeaCardCollection";
import styled from "@emotion/styled";
import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function SortableList({ items }) {
  const [sortOption, setSortOption] = useState("date");

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortItems = (items, sortOption) => {
    switch (sortOption) {
      case "title":
        return items.sort((a, b) => a.title.localeCompare(b.title));
      case "date":
        return items.sort((a, b) => a.date - b.date);
      case "createdAt":
        return items.sort((a, b) => a.createdAt - b.createdAt);
      default:
        return items;
    }

  }

  const sortedItems = sortItems(items, sortOption);

  console.log(sortedItems)

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + 9;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = sortedItems.slice(
    itemOffset,
    endOffset
  );
  const pageCount = Math.ceil(
    sortedItems.length / 9
  );


  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * 9) % sortedItems.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  return (
    <>
      <Flex mb='8'>
        <Select mr='4' maxWidth={235} value={sortOption} onChange={handleSortOptionChange}>
          <option value="title">Title</option>
          <option value="date">Date</option>
          <option value="createdAt">CreatedAt</option>
        </Select>
        <Select maxWidth={235} value={sortOption} onChange={handleSortOptionChange}>
          <option value="title">Title</option>
          <option value="date">Date</option>
          <option value="createdAt">CreatedAt</option>
        </Select>
      </Flex>
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
  )
}

export default SortableList;


const ReactPaginateWrapper = styled("div")`
      margin: 40px 0;
      width: 100%;

      ul {
        list - style - type: none;
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
        background - color: #f1f4f9;
    }
  }
      `;