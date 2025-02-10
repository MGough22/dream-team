import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NavItemUser({ to, bg = "gray.400", children }) {
  return (
    <Box
      as={Link}
      to={to}
      fontFamily="IM Fell DW Pica SC"
      fontSize={20}
      // bg="#808080"
      p="1vh"
      color="black"
      borderRadius="md"
      bg="gray.400/20"
      // bg="gray.400/16"
      backdropFilter="blur(7px)"
      transition="all 0.2s"
      _hover={{
        bg: "#606060",
        color: "white",
        textDecoration: "none",
      }}
    >
      {children}
    </Box>
  );
}
