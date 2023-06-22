import { useState, useContext, useMemo } from "react";
import {
  SimpleGrid,
  Select,
  Box,
  Flex,
  Input,
  Text,
  Progress
} from "@chakra-ui/react";
import IdeaCardCollection from "./IdeaCardCollection";
import styled from "@emotion/styled";
import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function SortableList({ items }) {
  const [sortOption, setSortOption] = useState("date");
  const [filterOption, setFilterOption] = useState("all");
  const [searchTerm, setSearchTerm] = useState(""); // Add this state variable

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterOptionChange = (event) => {
    setFilterOption(event.target.value);
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

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

  const applyFilter = (items, filterOption) => {
    return items.filter((item) => {
      switch (filterOption) {
        case "all":
          return true;
        case "completed":
          return item.completed === true;
        case "incomplete":
          return item.completed === false || item.completed === null;
        default:
          return true;
      }
    });
  }

  const sortedItems = useMemo(() => sortItems(items, sortOption), [items, sortOption])

  const filteredItems = useMemo(() => applyFilter(sortedItems, filterOption), [sortedItems, filterOption])

  const completedItems = useMemo(() => filteredItems.filter((item) => item.completed), [filteredItems])

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + 9;
  //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = useMemo(() => {
    return filteredItems
      .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(itemOffset, endOffset);
  }, [filteredItems, itemOffset, searchTerm]);

  // Error handling: if the user requests a page that doesn't exist,
  if (currentItems.length === 0 && filteredItems.length > 0) {
    // If the current page has no items but there are items in the filtered list,
    // adjust the item offset to the previous page.
    const lastPageOffset = Math.floor(filteredItems.length / 9) * 9;
    setItemOffset(lastPageOffset);
  } else if (filteredItems.length === 0) {
    // If there are no items in the filtered list, reset the item offset to 0.
    setItemOffset(0);
  }


  const pageCount = Math.ceil(
    filteredItems.length / 9
  );

  // debounce function to prevent multiple clicks
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }


  // Invoke when user click to request another page.
  const handlePageClick = debounce((event) => {
    const newOffset =
      (event.selected * 9) % sortedItems.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  }, 500);

  return (
    <>

      <Box mb='8'>
        <Progress value={completedItems.length} max={filteredItems.length} colorScheme='pink' size='sm' />
        <Text>
          ✨ {completedItems.length} out of {filteredItems.length} items completed
        </Text>
      </Box>
      <Flex mb='8'>
        <Select mr='4' maxWidth={235} value={sortOption} onChange={handleSortOptionChange}>
          <option value="title">Title</option>
          <option value="date">Date</option>
          <option value="createdAt">CreatedAt</option>
        </Select>
        <Select maxWidth={235} value={filterOption} onChange={handleFilterOptionChange}>
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option>
        </Select>
        <Input
          ml="4"
          maxWidth={235}
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchTermChange} // Add this input element
        />
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