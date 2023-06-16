import { Link, Button, Center, Image, Box, VStack, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Layout from "./Layout";

export default function NotFoundPage() {
  return (
    <Layout>
      <VStack spacing={8}>
        <Image src='/forest_512.png' alt='page not found' />
        <Center>
          <VStack>
            <Text fontSize='2xl' mb={8}>Opps... we cannot find what you're looking for</Text>
            <Link href='/'>
              <Button type='button' name='button' colorScheme='pink'>
                Return To Home
              </Button>
            </Link>
          </VStack>
        </Center>
      </VStack>
    </Layout>
  );
}
