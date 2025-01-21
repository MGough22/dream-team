// src/components/NavItem.jsx
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NavItem({ to, bg = "gray.400", children }) {
  return (
    <Box
      as={Link}
      to={to}
      bg={bg}
      fontFamily="IM Fell DW Pica SC"
      fontSize={20}
      p="2"
      color="white"
      borderRadius="md"
      transition="all 0.2s"
      _hover={{
        opacity: 0.8,
        color: "black",
        textDecoration: "none",
      }}
    >
      {children}
    </Box>
  );
}
