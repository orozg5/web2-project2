import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { CustomSwitch } from "../components/CustomSwitch";

export const SecondCategory = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // check access info

  return (
    <Flex direction="column" gap="2" m="16">
      <Heading mb="4">Broken Access Control</Heading>
      <CustomSwitch isChecked={isChecked} setIsChecked={setIsChecked} />

      {/* explain vulnerability */}

      {/* display if not secured or user has access */}
      <Box mt="8" p="16px" border="solid 1px white" borderRadius="8px">
        <Text>Some important information!</Text>
      </Box>
    </Flex>
  );
};
