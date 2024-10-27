import { Flex, Heading, Text } from "@chakra-ui/react";
import { GrShieldSecurity } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const { pathname } = useLocation();

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
      </Flex>
    </Flex>
  );
};
