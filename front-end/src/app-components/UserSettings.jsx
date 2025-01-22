import { Button, Container, Text } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
// import DeleteAccount from "./DeleteAccount";
import { UsernameContext } from "../contexts/UsernameContext";
// import { UserIdContext } from "../contexts/UserIdContext";
import AccountDeleteButton from "./AccountDeleteButton";

export default function UserSettings() {
  const { user } = useContext(UserContext);
  const { username } = useContext(UsernameContext);

  return (
    <Container
      bg="gray.300"
      maxW="lg"
      my="5vh"
      p="5vh"
      textAlign="center" // Centers text and inline-block elements
      as="h3"
    >
      <Text as="h2">Welcome {username} to your settings</Text>
      <AccountDeleteButton
        as={Link}
        to="/deleteaccount"
        bg="red"
        color="white"
        mt="2"
        p="8"
        // py="2"
        // px="4"
        textAlign="center"
        fontSize={30}
      >
        Delete account
      </AccountDeleteButton>
    </Container>
  );
}
