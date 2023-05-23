import { Heading, Text, Stack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ReactComponent as CurlyArrow } from "../assets/curved-arrow.svg";

export default function EmptyBucketMsg() {
  return (
    <Stack spacing={6}>
      <SVGTextWrapper>
        <CurlyArrow iconname='curlyArrow' fill='hotpink' />
        <Text>
          Let's create your first bucket list item by clicking the button
        </Text>
      </SVGTextWrapper>

      <Heading fontSize='5xl'>Your bucket list is currently empty</Heading>
    </Stack>
  );
}

const SVGTextWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
});
