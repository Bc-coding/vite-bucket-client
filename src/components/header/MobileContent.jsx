import { Flex, Button, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";
import navItems from "./constants";

export default function MobileContent({ display, changeDisplay }) {
  return (
    <Flex
      w="100vw"
      display={display}
      bgColor="gray.50"
      zIndex={20}
      h="100vh"
      pos="fixed"
      top="0"
      left="0"
      overflowY="auto"
      flexDir="column"
    >
      <Flex justify="flex-end">
        <IconButton
          mt={2}
          mr={2}
          aria-label="Open Menu"
          size="lg"
          icon={<CloseIcon />}
          onClick={() => changeDisplay("none")}
        />
      </Flex>

      <Flex flexDir="column" align="center">
        {navItems.map(item => {
          return (
            <Link key={item.id} href={item.href}>
              <Button
                as="a"
                variant="ghost"
                aria-label={item.nave}
                my={5}
                w="100%"
              >
                {item.name}
              </Button>
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
}
