import { Box, Button, Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { CustomSwitch } from "../components/CustomSwitch";
import { IUser } from "../interfaces/IUser";
import { useEffect, useState } from "react";

export const SecondCategory = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  return (
    <Flex direction="column" gap="2" m="16">
      <Heading mb="4">Broken Access Control</Heading>

      <Heading size="md">Eg. 1.</Heading>
      <Text>To check out the page only admins have access to you will have to "Login" as an admin.</Text>
      <Box>
        <Link href="http://localhost:8080/page">
          <Button>Go to page</Button>
        </Link>
      </Box>

      <Heading mt="4">Vulerability explanation</Heading>
      <Flex p="4" direction="column" borderRadius="8px" border="solid 1px white" color="green.200" textAlign="center">
        <Text>If we log in as an admin, we will see the page. If we log in as a user, we won't see it.</Text>
        <Text mt="2">
          This is because we have a middleware that checks the role by accessing cookies before rendering the page.
        </Text>
        <Text mt="2">
          If we wanted to let everyone view the page, we wouldn't include the middleware. That is how all the other
          pages are.
        </Text>
      </Flex>

      <Divider mt="16" mb="16" />

      <Heading size="md">Eg. 2.</Heading>
      <Text>
        To see the "important information" you will have to either "Login" as an admin or switch off security.
      </Text>

      <CustomSwitch isChecked={isChecked} setIsChecked={setIsChecked} />

      {(!isChecked || (user && user?.role === "admin")) && (
        <>
          <Heading mt="4">Important information</Heading>
          <Text p="16px" border="solid 1px white" borderRadius="8px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi congue risus non erat tempor dignissim.
            Maecenas varius quam sit amet consequat iaculis. Fusce sodales venenatis nibh, ornare sodales tellus egestas
            et. Etiam venenatis rutrum nulla non pretium. Cras porta nunc in imperdiet mattis. Nam gravida ipsum sit
            amet odio blandit, id lobortis magna feugiat. Curabitur sodales auctor semper. Mauris enim massa, laoreet
            faucibus suscipit condimentum, aliquet in mi. Aenean vel luctus lectus, at rutrum mi. Morbi eu convallis
            leo, egestas accumsan libero. Curabitur fringilla tristique pellentesque. Aenean fringilla pharetra eros
            vitae egestas. Mauris nec arcu feugiat, suscipit sem at, pulvinar neque. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </Text>
        </>
      )}

      <Heading mt="4">Vulerability explanation</Heading>
      <Flex
        p="4"
        direction="column"
        borderRadius="8px"
        border="solid 1px white"
        color={isChecked ? "green.200" : "red.light"}
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
