// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  colors: {
    transparent: "transparent",
    black: "#000",
    white: "#fff",

    // ...
  },
});

export default theme;
