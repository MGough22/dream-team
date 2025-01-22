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
      bg="gray.400/2000"
      p="1vh"
      color="white"
      backdropFilter="blur(1px)"
      borderRadius="md"
      pt="4"
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
