// src/components/DeleteButton.jsx
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function AccountDeleteButton({ onClick }) {
  return (
    <Button
      as={Link}
      to="/deleteaccount"
      bg="#B62910"
      color="white"
      onClick={onClick}
      mt="5"
      fontSize={35}
      p="6"
      borderRadius="md"
      fontWeight="bold"
      transition="all 0.2s"
      _hover={{
        bg: "#EB4225",
        color: "white",
        textDecoration: "none",
        transform: "translateY(-2px)",
      }}
    >
      Delete Account
    </Button>
  );
}
