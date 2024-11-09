import { Button, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { GrShieldSecurity } from "react-icons/gr";
import { useEffect, useState } from "react";
import { Login } from "./Login";

export const Navbar = () => {
  const url = "https://goroz-w2p2.onrender.com";
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${url}/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        await response.json();
        if (response.ok) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch(`${url}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      await response.json();
      if (response.ok) {
        setIsLoggedIn(false);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex justify="space-between" p="16px" mx="16px">
      <Link to="/">
        <Flex align="center" gap="8px" _hover={{ color: "purple.lighter" }}>
          <GrShieldSecurity size="40px" />
          <Heading>Security</Heading>
        </Flex>
      </Link>

      <Flex align="center" gap="4">
        <Link to="/first-category">
          <Text color={pathname === "/first-category" ? "purple.light" : ""} _hover={{ color: "purple.lighter" }}>
            First Category
          </Text>
        </Link>
        <Link to="/second-category">
          <Text color={pathname === "/second-category" ? "purple.light" : ""} _hover={{ color: "purple.lighter" }}>
            Second Category
          </Text>
        </Link>
        {!isLoggedIn && <Button onClick={onOpen}>Login</Button>}
        {isLoggedIn && <Button onClick={logout}>Logout</Button>}
      </Flex>

      <Login isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
