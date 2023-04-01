import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormErrorMessage,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { Redirect } from "react-router";
import { SIGNUP } from "../queries";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Mutation query for login user method
  const [loginUser, { loading, data, error: signupError }] =
    useMutation(SIGNUP);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = values => {
    // console.log(values);
    loginUser({
      variables: {
        input: {
          email: values.email,
          name: values.username,
          password: values.password,
        },
      },
    });
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  //console.log(watch("email")); // watch input value by passing the name of it

  // Store token if login is successful
  if (data) {
    const userInfo = {
      id: data.signup.id,
      userId: data.signup.userId,
      name: data.signup.name,
      email: data.signup.email,
    };

    window.localStorage.setItem("user", JSON.stringify(userInfo));

    // Redirect to home page
    return <Redirect to="/login" />;
  }

  return (
    <Layout>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        paddingTop="80px"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Sign up</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4} p="1rem" boxShadow="md">
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    {/* register your input into the hook by invoking the "register" function */}
                    <Input
                      required
                      id="username"
                      name="username"
                      type="username"
                      placeholder="username"
                      autoFocus
                      {...register("username")}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isInvalid={errors.email}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    {/* register your input into the hook by invoking the "register" function */}
                    <Input
                      required
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email address"
                      autoFocus
                      {...register("email")}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      required
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...register("password")}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Box>
          {signupError && (
            <Box>
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>{signupError.message}</AlertTitle>
                <AlertDescription>Please try again.</AlertDescription>
              </Alert>
            </Box>
          )}

          <Box>
            Already have an account with us?{" "}
            <Link color="teal.500" href="/login">
              Login in here!
            </Link>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default Signup;
