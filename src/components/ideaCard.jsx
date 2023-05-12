import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";

export default function ideaCard({ item }) {
  return (
    <Card key={item.id}>
      <CardHeader>
        <Heading size='md'>{item.title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{item.desc}</Text>
      </CardBody>
      <CardFooter>
        <Link href={`/post/${item.id}`}>
          <Button aria-label='view post'>
            View Here
            <span style={{ marginLeft: "10px" }}>{item.emoji}</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
