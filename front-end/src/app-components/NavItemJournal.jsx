// src/components/NavItem.jsx
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NavItem({ to, bg = "gray.400", children }) {
  return (
    <Box
      as={Link}
      to={to}
      // bg={bg}
      bg="gray.400/2000"
      fontFamily="IM Fell DW Pica SC"
      fontSize={20}
      backdropFilter="blur(1px)"
      p="2"
      color="white"
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
