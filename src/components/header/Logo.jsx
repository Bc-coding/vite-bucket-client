import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props} marginTop="1.5rem" paddingLeft="2rem">
      <Text fontSize="lg" fontWeight="bold">
        Bucket List 📒
      </Text>
    </Box>
  );
}
