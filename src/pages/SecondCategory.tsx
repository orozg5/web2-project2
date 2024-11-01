import { Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { CustomSwitch } from "../components/CustomSwitch";
import { FaChevronCircleDown } from "react-icons/fa";
import { IUser } from "../interfaces/IUser";
import { useState } from "react";

export const SecondCategory = () => {
  const Admin = {
    id: "1",
    role: "admin",
    name: "Jane",
    surname: "Doe",
    email: "jane.doe@gmail.com",
    password: "janedoe1!",
  };

  const User = {
    id: "2",
    role: "user",
    name: "Jack",
    surname: "Doe",
    email: "jack.doe@gmail.com",
    password: "jackdoe1!",
  };

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<IUser>();

  return (
    <Flex direction="column" gap="2" m="16">
      <Heading mb="4">Broken Access Control</Heading>

      <Text>
        To see the "important information" you will have to either "Login" as an admin or switch off security.
      </Text>

      <Flex align="center">
        <CustomSwitch isChecked={isChecked} setIsChecked={setIsChecked} />

        <Menu>
          <MenuButton disabled={!isChecked} as={Button} rightIcon={<FaChevronCircleDown />}>
            Login
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setLoggedIn(Admin)}>as an Admin</MenuItem>
            <MenuItem onClick={() => setLoggedIn(User)}>as a User</MenuItem>
          </MenuList>
        </Menu>
        {isChecked && loggedIn && <Text ml="2">Logged in as {loggedIn?.role}.</Text>}
      </Flex>

      {(!isChecked || (loggedIn && loggedIn?.role === "admin")) && (
        <>
          <Heading mt="4">Important information</Heading>
          <Flex direction="column" p="16px" border="solid 1px white" borderRadius="8px" gap="2">
            {[Admin, User].map((user) => (
              <Flex key={user.id} direction="column" border="solid 1px white" borderRadius="8px" p="4">
                <Text fontSize="lg">
                  {user.name} {user.surname}
                </Text>
                <Text fontSize="sm">role - {user.role}</Text>
                <Text mt="2">Email: {user.email}</Text>
                <Text>Password: {user.password}</Text>
              </Flex>
            ))}
          </Flex>
        </>
      )}

      <Heading mt="8">Vulerability explanation</Heading>
      <Flex
        p="4"
        direction="column"
        borderRadius="8px"
        border="solid 1px white"
        color={isChecked && loggedIn ? "green.200" : "red.light"}
        textAlign="center"
      >
        <Text>
          When we turn security off it doesn't matter if we are logged in or what role the logged in user has. We can
          see all of the important information. This is not safe, so we turn the security on.{" "}
        </Text>
        <Text mt="2">
          When the security is turned on, only admins can see the important information. Now we have the option to log
          in as an admin or as a user.
        </Text>
        <Text mt="2">
          If we log in as an admin, we will see the important information. If we log in as a user, we won't see it,
          which is good.
        </Text>
      </Flex>
    </Flex>
  );
};
