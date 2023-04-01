import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import {
  Link,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { DELETE_POST_BY_USER } from "../queries";

const PostItem = ({ post }) => {
  const {
    category,
    completed,
    createdAt,
    date,
    desc,
    id,
    location,
    memo,
    title,
    updatedAt,
  } = post.getPostBucketList.post;

  const dateCreatedAt = new Date(parseInt(createdAt));

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [handlePostDelete] = useMutation(DELETE_POST_BY_USER, {
    variables: {
      input: {
        postId: id,
      },
    },
    // to observe what the mutation response returns
    onCompleted: data => {
      console.log(data);
    },
  });

  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <>
      <ButtonWrapper>
        <Button onClick={handleGoBack}>Back</Button>
        <Link href="/add-new-idea">
          <Button colorScheme="teal">Add another idea</Button>
        </Link>
      </ButtonWrapper>
      <CoverImage
        src="https://gaijinpot.scdn3.secure.raxcdn.com/app/uploads/sites/4/2014/12/hello-kitty-1024x640.jpg"
        alt=""
      />
      <PostDetails>
        <DetailRow>
          <h1>💡{title}</h1>
        </DetailRow>
        <DetailRow>
          <DetailItem>
            <IconAndLabel>
              <h4 style={{ marginLeft: "8px" }}>📝 Item details</h4>
            </IconAndLabel>
            <IconAndLabel>
              <div id="category">category: {category}</div>
            </IconAndLabel>
            <IconAndLabel>
              <div id="location">location: {location}</div>
            </IconAndLabel>
            <IconAndLabel>
              <div id="created-at">
                created at: {dateCreatedAt.toLocaleDateString("en-uk")}
              </div>
            </IconAndLabel>
            <IconAndLabel>
              <div id="completed">completed: {completed ? "Yes" : "No"}</div>
            </IconAndLabel>
          </DetailItem>
          {/* <DetailItem>
              <h4>Author</h4>
              <AuthorImage src={author.photo} />
              <AuthorName>{author.name}</AuthorName>
            </DetailItem> */}
          <DetailItem>
            {/* <StyledLink to={`./module/${modules[0]["id"]}`}> */}
            <Link href={`/updatepost/${id}`}>
              <Button as="a" aria-label="update post">
                <EditIcon />
              </Button>
            </Link>

            <Button onClick={onOpen}>
              <DeleteIcon />
            </Button>
            {/* </StyledLink> */}

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Are you absolutely sure?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  This will permanently delete the post and this action cannot
                  be undone.
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handlePostDelete();
                      onClose();
                      handleGoBack();
                    }}
                  >
                    Yes delete it !
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </DetailItem>
        </DetailRow>
        <ModuleListContainer>
          <DetailItem>
            <h4>🖊️ Description</h4>
            {desc}
          </DetailItem>
        </ModuleListContainer>
      </PostDetails>{" "}
    </>
  );
};

export default PostItem;

const CoverImage = styled.img({
  objectFit: "cover",
  maxHeight: 400,
  width: "100%",
  borderRadius: 4,
  marginBottom: 30,
});

const PostDetails = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  borderRadius: 4,
  marginBottom: 30,
  border: `solid 1px lightgrey`,

  h1: {
    width: "100%",
    textAlign: "center",
    marginBottom: 5,
  },
  h4: {
    fontSize: "1.2em",
    marginBottom: 5,
  },
});

const DetailRow = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  paddingBottom: 20,
  marginBottom: 20,
  borderBottom: `solid 1px lightgrey`,
});

const DetailItem = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  alignSelf: "center",
  button: {
    marginBottom: "5px",
  },
});

// const StyledLink= styled(Link)({
//   textDecoration: "none",
//   color: "white",
// });

const AuthorImage = styled.img({
  height: 30,
  width: 30,
  marginBottom: 8,
  borderRadius: "50%",
  objectFit: "cover",
});

const AuthorName = styled.div({
  lineHeight: "1em",
  fontSize: "1em",
});

const IconAndLabel = styled.div({
  display: "flex",
  flex: "row",
  alignItems: "center",
  maxHeight: 20,
  width: "100%",
  div: {
    marginLeft: 8,
  },
  svg: {
    maxHeight: 16,
  },
});

const ModuleListContainer = styled.div({
  width: "100%",
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    marginTop: 5,
    li: {
      fontSize: "1em",
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: 2,
    },
  },
});

const ButtonWrapper = styled.div({
  marginBottom: "30px",
  display: "flex",
  justifyContent: "space-between",
});
