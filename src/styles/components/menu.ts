import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  list: {
    bg: "purple.light",
  },
  item: {
    color: "white",
    bg: "purple.light",
    _hover: {
      bg: "purple.lighter",
    },
  },
});

export const Menu = defineMultiStyleConfig({ baseStyle });
