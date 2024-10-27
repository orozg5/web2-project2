import { Button, Flex, Heading, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { CustomSwitch } from "../components/CustomSwitch";

export const FirstCategory = () => {
  const [text, setText] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleSubmit = () => {
    if (isChecked) {
      // clear up text
    }
    // send to backend
  };

  return (
    <Flex direction="column" gap="2" m="16">
      <Heading>Cross-site scripting (XSS)</Heading>

      <Textarea mt="4" placeholder="Write some text..." value={text} onChange={(e) => setText(e.target.value)} />

      {/* explain vulnerability */}

      <Flex align="center" justify="end" gap="4">
        <CustomSwitch isChecked={isChecked} setIsChecked={setIsChecked} />

        <Button colorScheme="purple" onClick={handleSubmit}>
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};
