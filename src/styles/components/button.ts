import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const solid = defineStyle({
  bgColor: "purple.light",
  _hover: { bgColor: "purple.lighter" },
  color: "white",
  fontWeight: "normal",
});

const unstyled = defineStyle({
  color: "purple.light",
  _hover: { color: "purple.lighter" },
});

export const Button = defineStyleConfig({
  variants: { solid, unstyled },
});
