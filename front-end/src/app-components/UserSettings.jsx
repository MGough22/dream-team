import { Container, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UsernameContext } from "../contexts/UsernameContext";
import AccountDeleteButton from "./AccountDeleteButton";

export default function UserSettings() {
  const { username } = useContext(UsernameContext);

  return (
    <Container
      maxW="lg"
      my="5vh"
      p="5vh"
      textAlign="center"
      as="h3"
      bg="gray.400/20"
      backdropFilter="blur(7px)"
      borderRadius={10}
    >
      <Text as="h2">Welcome {username} to your settings</Text>
      <AccountDeleteButton
        as={Link}
        to="/deleteaccount"
        bg="red"
        color="white"
        mt="2"
        p="8"
        textAlign="center"
        fontSize={30}
      >
        Delete account
      </AccountDeleteButton>
    </Container>
  );
}
