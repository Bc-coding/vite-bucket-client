import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_BUCKET_SERVER_DEV}`,
  // uri: `${import.meta.env.VITE_BUCKET_SERVER_PROD}`,
});

const authLink = setContext((body, { headers }) => {
  const token = localStorage.getItem("token");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const client = new ApolloClient({
  // uri: `${import.meta.env.VITE_BUCKET_SERVER_DEV}`,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);
