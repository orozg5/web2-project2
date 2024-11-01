import { Box, Divider } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <Box bgColor="zinc.dark" textColor="white">
      <Navbar />
      <Divider variant="dashed" />
      <Outlet />
    </Box>
  );
};
