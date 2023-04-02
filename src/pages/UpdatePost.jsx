import React from "react";
import styled from "@emotion/styled";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  FormControl,
  Textarea,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { FcIdea, FcOrganization, FcGlobe, FcCloseUpMode } from "react-icons/fc";
import { UPDATE_BUCKET_LIST_BY_USER, GET_POST_BY_USER } from "../queries";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { QueryResult } from "../components/index";

const UpdatePost = () => {
  let { postId } = useParams();
  let history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();

  const {
    loading: getPostLoading,
    error: getPostError,
    data: getPostData,
    refetch,
  } = useQuery(GET_POST_BY_USER, {
    variables: {
      input: {
        postId: postId,
      },
    },
    onCompleted: data => {
      //console.log("completed fetching: ", data);

      setValue("title", data.getPostBucketList.post.title);
      setValue("location", data.getPostBucketList.post.location);
      setValue("category", data.getPostBucketList.post.category);
      setValue("desc", data.getPostBucketList.post.desc);

      setValue(
        "emoji",
        data.getPostBucketList.post.emoji == null
          ? null
          : data.getPostBucketList.post.emoji
      );
    },
  });

  const [handleBucketListUpdate, { data, loading, error }] = useMutation(
    UPDATE_BUCKET_LIST_BY_USER,
    // to observe what the mutation response returns
    {
      onCompleted: data => {
        console.log("completed: ", data);
        history.push(`/post/${data.updateBucketList.post.id}`);
      },
    }
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = values => {
    // console.log(values);
    handleBucketListUpdate({
      variables: {
        input: {
          postId: postId,
          post: {
            ...values,
          },
        },
      },
    });
  };
  return (
    <Layout>
      <Section>
        <QueryResult
          error={getPostError}
          loading={getPostLoading}
          data={getPostData}
        >
          <FormContainer>
            <Flex
              flexDirection="column"
              width="100wh"
              height="100vh"
              paddingTop="80px"
              alignItems="center"
              bg={colorMode === "light" ? "white" : "gray.800"}
              borderRadius="8px"
            >
              <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
              >
                <Heading color="pink.400">Edit your bucket idea</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={4} p="1rem" boxShadow="md">
                      <FormControl isInvalid={errors.email}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<Icon as={FcIdea} />}
                          />
                          {/* register your input into the hook by invoking the "register" function */}
                          <Input
                            required
                            id="title"
                            name="title"
                            type="title"
                            placeholder={"Title"}
                            autoFocus
                            {...register("title")}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<Icon as={FcOrganization} />}
                          />
                          {/* register your input into the hook by invoking the "register" function */}
                          <Input
                            required
                            id="category"
                            name="category"
                            type="category"
                            placeholder={"category"}
                            autoFocus
                            {...register("category")}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<Icon as={FcGlobe} />}
                          />
                          {/* register your input into the hook by invoking the "register" function */}
                          <Input
                            required
                            id="location"
                            name="location"
                            type="location"
                            placeholder={"Location"}
                            autoFocus
                            {...register("location")}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<Icon as={FcCloseUpMode} />}
                          />
                          {/* register your input into the hook by invoking the "register" function */}
                          <Input
                            id="emoji"
                            name="emoji"
                            type="emoji"
                            placeholder={"Paste an emoji"}
                            autoFocus
                            {...register("emoji")}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl>
                        <Textarea
                          placeholder={"A brief decription"}
                          id="desc"
                          name="desc"
                          type="decs"
                          autoFocus
                          {...register("desc")}
                        />
                      </FormControl>
                      <Button
                        borderRadius={0}
                        type="submit"
                        variant="solid"
                        colorScheme="pink"
                        width="full"
                        isLoading={isSubmitting}
                      >
                        Submit
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </Stack>
            </Flex>
          </FormContainer>
        </QueryResult>
      </Section>
    </Layout>
  );
};

export default UpdatePost;

const Section = styled.div({
  width: "100%",
  minHeight: "800px",
  borderRadius: "8px",
  backgroundColor: "pink",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "60px 0",
});

const FormContainer = styled.div({
  width: "80%",
  borderRadius: "8px",
  // backgroundColor: "gray.700",
});
