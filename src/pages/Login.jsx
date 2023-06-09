import { useState, useContext } from "react";
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
  FormHelperText,
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

import { LOGIN_USER } from "../queries";
import { useHistory } from "react-router-dom";

import AuthContext from "../context/authContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  let history = useHistory();

  const [showPassword, setShowPassword] = useState(false);

  const { setIsUserLoggedIn } = useContext(AuthContext);

  // Mutation query for login user method
  const [loginUser, { loading, data: loginData, error: loginError }] =
    useMutation(LOGIN_USER, {
      // to observe what the mutation response returns
      onCompleted: (loginData, loginError) => {
        if (loginError) {
          console.log(loginError);
        }
        // Store token if login is successful
        if (loginData) {
          // console.log(loginData);
          const userInfo = {
            id: loginData.login.user.id,
            userId: loginData.login.user.userId,
            name: loginData.login.user.name,
            email: loginData.login.user.email,
          };

          localStorage.setItem("user", JSON.stringify(userInfo));
          localStorage.setItem("token", loginData.login.token);
          setIsUserLoggedIn(true);

          // Redirect to home page
          history.push("/");
        }
      },
    });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = values => {
    //  console.log(values);
    loginUser({
      variables: {
        input: {
          email: values.email,
          password: values.password,
        },
      },
    });
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  // console.log(watch("email")); // watch input value by passing the name of it

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
          <Avatar bg="pink.500" />
          <Heading color="pink.400">Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4} p="1rem" boxShadow="md">
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
                  <FormHelperText textAlign="right">
                    <Link>forgot password?</Link>
                  </FormHelperText>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="pink"
                  width="full"
                  isLoading={isSubmitting}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
          {loginError && (
            <Box>
              <Alert status="error">
                <AlertIcon />
                {/* <AlertTitle>{`${
                  loginError.message ? "Error" : null
                }`}</AlertTitle> */}
                <AlertDescription>
                  Please ensure your email and password are correct.
                </AlertDescription>
              </Alert>
            </Box>
          )}
          <Box>
            Haven't created an account with us?{" "}
            <Link color="pink.500" href="/signup">
              Sign up here!
            </Link>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default Login;
