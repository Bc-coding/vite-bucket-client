import { useState, useContext } from "react";
import { Flex, Button, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";
import navItems from "./constants";
import AuthContext from "../../context/authContext";

export default function MobileContent({ display, changeDisplay }) {
  const { setUser, isUserLoggedIn, setIsUserLoggedIn } =
    useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(false);
    setIsUserLoggedIn(false);
  };
  return (
    <Flex
      w='100vw'
      display={display}
      bgColor='gray.50'
      zIndex={20}
      h='100vh'
      pos='fixed'
      top='0'
      left='0'
      overflowY='auto'
      flexDir='column'
    >
      <Flex justify='flex-end'>
        <IconButton
          mt={2}
          mr={2}
          aria-label='Open Menu'
          size='lg'
          icon={<CloseIcon />}
          onClick={() => changeDisplay("none")}
          color='hotpink'
        />
      </Flex>

      <Flex flexDir='column' align='center'>
        {navItems.map((item) => {
          return (
            <Link key={item.id} href={item.href}>
              <Button
                variant='ghost'
                aria-label={item.nave}
                my={5}
                w='100%'
                color='hotpink'
              >
                {item.name}
              </Button>
            </Link>
          );
        })}

        {isUserLoggedIn ? (
          <Button
            as='a'
            variant='ghost'
            aria-label='Logout'
            my={5}
            w='100%'
            onClick={handleLogout}
            color='hotpink'
          >
            Logout 🔐
          </Button>
        ) : (
          <Link href='/login'>
            <Button
              variant='ghost'
              aria-label='Login'
              my={5}
              w='100%'
              color='hotpink'
            >
              Login 🔐
            </Button>
          </Link>
        )}
      </Flex>
    </Flex>
  );
}
