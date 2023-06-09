import { useState } from "react";
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
import {
  FcIdea,
  FcOrganization,
  FcGlobe,
  FcCloseUpMode,
  FcCalendar,
} from "react-icons/fc";
import { CREATE_BUCKET_LIST_BY_USER } from "../queries";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const AddPost = () => {
  let history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();

  const [show, setShow] = useState(true);
  const handleFocus = () => setShow(!show);

  const [handleBucketListCreate, { data, loading, error }] = useMutation(
    CREATE_BUCKET_LIST_BY_USER,
    // to observe what the mutation response returns
    {
      onCompleted: (data) => {
        console.log("completed: ", data);
        history.push(`/post/${data.createBucketList.post.id}`);
      },
    }
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
    const newValues = {
      ...values,
      title: values?.title?.charAt(0).toUpperCase() + values?.title.slice(1),
      category:
        values?.category?.charAt(0).toUpperCase() + values?.category.slice(1),
      location:
        values?.location?.charAt(0).toUpperCase() + values?.location.slice(1),
      desc: values?.desc?.charAt(0).toUpperCase() + values?.desc.slice(1),
    };
    handleBucketListCreate({
      variables: {
        input: {
          ...newValues,
        },
      },
    });
  };

  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <Layout>
      <ButtonWrapper>
        <Button onClick={handleGoBack}>Back</Button>
      </ButtonWrapper>
      <Section>
        <FormContainer>
          <Flex
            flexDirection='column'
            width='100wh'
            paddingTop='80px'
            paddingBottom='80px'
            alignItems='center'
            bg={colorMode === "light" ? "white" : "gray.800"}
            borderRadius='8px'
          >
            <Stack
              flexDir='column'
              mb='2'
              justifyContent='center'
              alignItems='center'
            >
              <Heading color='pink.400'>New idea</Heading>
              <Box minW={{ base: "90%", md: "468px" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={4} p='1rem' boxShadow='md'>
                    <FormControl isInvalid={errors.email}>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents='none'
                          children={<Icon as={FcIdea} />}
                        />
                        {/* register your input into the hook by invoking the "register" function */}
                        <Input
                          required
                          id='title'
                          name='title'
                          type='title'
                          placeholder='What would you like to add to your list?'
                          autoFocus
                          {...register("title")}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents='none'
                          children={<Icon as={FcOrganization} />}
                        />
                        {/* register your input into the hook by invoking the "register" function */}
                        <Input
                          required
                          id='category'
                          name='category'
                          type='category'
                          placeholder='Category'
                          {...register("category")}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents='none'
                          children={<Icon as={FcGlobe} />}
                        />
                        {/* register your input into the hook by invoking the "register" function */}
                        <Input
                          required
                          id='location'
                          name='location'
                          type='location'
                          placeholder='Location'
                          {...register("location")}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents='none'
                          children={<Icon as={FcCloseUpMode} />}
                        />
                        {/* register your input into the hook by invoking the "register" function */}
                        <Input
                          id='emoji'
                          name='emoji'
                          type='emoji'
                          placeholder='Paste an emoji'
                          {...register("emoji")}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents='none'
                          children={<Icon as={FcCalendar} />}
                        />
                        {/* register your input into the hook by invoking the "register" function */}
                        <Input
                          id='date'
                          name='date'
                          type={show ? "text" : "date"}
                          placeholder='The date of completion'
                          onFocus={handleFocus}
                          {...register("date")}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <Textarea
                        placeholder='More information about the idea'
                        required
                        id='desc'
                        name='desc'
                        type='decs'
                        {...register("desc")}
                      />
                    </FormControl>
                    <Button
                      borderRadius={0}
                      type='submit'
                      variant='solid'
                      colorScheme='pink'
                      width='full'
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
      </Section>
    </Layout>
  );
};

export default AddPost;

const Section = styled.div({
  width: "100%",
  borderRadius: "8px",
  backgroundColor: "pink",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "60px 0",
  marginBottom: "64px"
});

const FormContainer = styled.div({
  width: "80%",
  borderRadius: "8px",
});

const ButtonWrapper = styled.div({
  marginBottom: "30px",
  display: "flex",
  justifyContent: "space-between",
});
