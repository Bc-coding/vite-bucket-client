import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props} marginTop="1.75rem" paddingLeft="2rem">
      <Text fontSize="2xl" fontWeight="bold" color="hotpink">
        Bucket List 📒
      </Text>
    </Box>
  );
}
