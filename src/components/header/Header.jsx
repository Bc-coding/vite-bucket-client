import { useState, useContext } from "react";
import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";
import MobileContent from "./MobileContent";
import Logo from "./Logo";
import navItems from "./constants";
import styled from "@emotion/styled";
import AuthContext from "../../context/authContext";
import { useHistory } from "react-router-dom";

export default function DarkModeSwitch() {
  let history = useHistory();

  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [display, changeDisplay] = useState("none");
  const { setUser, isUserLoggedIn, setIsUserLoggedIn } =
    useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(false);
    setIsUserLoggedIn(false);
    // Redirect to home page
    history.push("/bucket-list");
  };
  return (
    <HeaderContainer>
      <Flex height='100px'>
        <Link href='/'>
          <Logo />
        </Link>
        <Flex position='fixed' top='1rem' right='1rem' align='center'>
          {/* Desktop */}
          <Flex display={["none", "none", "flex", "flex"]}>
            {navItems.map((item) => {
              return (
                <Link key={item.id} href={item.href}>
                  <Button
                    variant='ghost'
                    aria-label={item.name}
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

          {/* Mobile */}
          <IconButton
            aria-label='Open Menu'
            size='lg'
            mr={2}
            icon={<HamburgerIcon />}
            onClick={() => changeDisplay("flex")}
            display={["flex", "flex", "none", "none"]}
          />
          <Switch color='green' isChecked={isDark} onChange={toggleColorMode} />
        </Flex>

        {/* Mobile Content */}
        <MobileContent display={display} changeDisplay={changeDisplay} />
      </Flex>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div({
  position: "absolute",
  top: "0",
  zIndex: "2",
  height: "100px",
  backgroundColor: "transparent",
  width: "100%",
});
