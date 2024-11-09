import { Box, Button, Flex, Heading, Textarea, Text, Highlight } from "@chakra-ui/react";
import { CustomSwitch } from "../components/CustomSwitch";
import { sanitize } from "../utils/sanitize";
import { useState } from "react";

export const FirstCategory = () => {
  const url = "https://goroz-w2p2.onrender.com";
  const [output, setOutput] = useState("");
  const [text, setText] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isAttacked, setIsAttacked] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (isChecked) {
      try {
        const res = await fetch(`${url}/api/xss`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: sanitize(text) }),
        });
        const data = await res.json();
        if (res.ok) setOutput(data.text);
      } catch (error) {
        console.error(error);
      }
      setIsAttacked(false);
    } else {
      setOutput(text);
      setIsAttacked(true);
    }
    setText("");
  };

  return (
    <Flex direction="column" gap="2" m="16">
      <Heading>Cross-site scripting (DOM XSS)</Heading>

      <Text>
        I've built this webpage with React framework, which provides built-in protection against XSS attacks by default.
        React escapes special characters in dynamically rendered content, which prevents the execution of JavaScript
        withitn {"<script>"} tags or javascript: links. However, there are certain scenarios where XSS attacks are still
        possible. One of them is in the example below. An {"<img>"} tag without a valid src will trigger its onerror
        attribute, which allows potentially harmful code to execute.
      </Text>

      <Flex gap="1" align="center" flexWrap="wrap">
        Try entering
        <Text onClick={() => setText(`<img src="" onerror="alert('XSS attack');" />`)} _hover={{ cursor: "pointer" }}>
          <Highlight
            query={`<img src="" onerror="alert('XSS atack');" />`}
            styles={{ px: "1", py: "1", rounded: "full", bg: "purple.lighter" }}
          >{`<img src="" onerror="alert('XSS atack');" />`}</Highlight>
        </Text>
        or
        <Text
          onClick={() => setText(`<img src="" onerror="alert(document.cookie);" />`)}
          _hover={{ cursor: "pointer" }}
        >
          <Highlight
            query={`<img src="" onerror="alert(document.cookie);" />`}
            styles={{ px: "1", py: "1", rounded: "full", bg: "purple.lighter" }}
          >{`<img src="" onerror="alert(document.cookie);" />`}</Highlight>
        </Text>
        into the textarea.
      </Flex>

      <Textarea mt="4" placeholder="Write some text..." value={text} onChange={(e) => setText(e.target.value)} />

      <Flex align="center" justify="end" gap="4">
        <CustomSwitch isChecked={isChecked} setIsChecked={setIsChecked} />

        <Button colorScheme="purple" onClick={handleSubmit} disabled={!text}>
          Submit
        </Button>
      </Flex>

      {output && <Heading mt="16">Vulerability explanation</Heading>}
      {output && (
        <Flex
          direction="column"
          align="center"
          border="solid 1px white"
          borderRadius="8px"
          p="4"
          color={isAttacked ? "red.light" : "green.200"}
        >
          {isAttacked && <Box id="output" dangerouslySetInnerHTML={{ __html: output }} />}

          <Text mb="2">This page now has a div element with the entered text set as its inner html.</Text>
          <code>
            {`<div id="output" class="css-0">`}
            {output}
            {`</div>`}
          </code>

          {isAttacked ? (
            <Flex mt="4" gap="2" align="center" color="white">
              <Text>To try out the same example again you first have to remove the inner html from div element:</Text>
              <Button
                color="white"
                onClick={() => {
                  setOutput("");
                  setIsAttacked(false);
                }}
              >
                Clear
              </Button>
            </Flex>
          ) : (
            <Flex direction="column" align="center" mt="4" color="white">
              <Text>As you can see, the alert hasn't been executed because the text has been cleared.</Text>
              <Text>Try submitting text when security is switched off.</Text>
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
};
