import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const solid = defineStyle({
  border: "1px solid white",
  bgColor: "purple.medium",
  _hover: { bgColor: "purple.light" },
  fontWeight: "normal",
  color: "white",
});

export const Button = defineStyleConfig({
  variants: { solid },
});
