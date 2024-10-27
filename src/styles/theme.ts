import { extendTheme } from "@chakra-ui/react";
import { Input } from "./components/input";
import { Button } from "./components/button";
import { Switch } from './components/switch'
import { Textarea } from "./components/textarea";

export const theme = extendTheme({
  colors: {
    purple: {
      lighter: "#C084FC",
      light: "#A855F7",
      medium: "#9333EA",
      dark: "#641BA3",
      darker: "#4A1772",
    },
    red: {
      light: "#FF4C4C",
    },
    zinc: {
      light: "#F5F4F4",
      medium: "#322F2F",
      dark: "#191717",
      darker: "#040303",
    },
  },

  components: {
    Input,
    Button,
    Switch,
    Textarea
  },
});
