import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  track: {
    bgColor: "zinc.medium",
    border: "1px solid white",
    _checked: {
      bgColor: "purple.medium",
    },
  },
});

export const Switch = defineMultiStyleConfig({ baseStyle });
