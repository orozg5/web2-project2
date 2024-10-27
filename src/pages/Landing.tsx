import { Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <Flex direction="column" align="center" gap="2" m="16">
      <Text fontSize="20">
        To view <i>Cross-site scripting (XSS)</i> vulnerability, check out:
      </Text>
      <Link to="/first-category">
        <Button colorScheme="purple">First Category</Button>
      </Link>

      <Text fontSize="20" mt="4">
        To view <i>Broken Access Control</i> vulnerability, check out:
      </Text>
      <Link to="/second-category">
        <Button colorScheme="purple">Second Category</Button>
      </Link>
    </Flex>
  );
};
