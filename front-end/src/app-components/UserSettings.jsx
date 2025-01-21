import { Button, Container, Text } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import DeleteAccount from "./DeleteAccount";
import { UsernameContext } from "../contexts/UsernameContext";
import { UserIdContext } from "../contexts/UserIdContext";

export default function UserSettings() {
  const { user } = useContext(UserContext);
  const { username } = useContext(UsernameContext);

  //this page needs to render a user delete account button
  //maybe it checks from state the current logged in user?
  //or maybe theres a request to enter username and password to delete account

  return (
    <Container
      as="section"
      bg="gray.300"
      maxW="md"
      my="5vh"
      p="5vh"
      textAlign="center" // Centers text and inline-block elements
    >
      <Text>Welcome {username} to your settings</Text>
      <Button
        as={Link}
        to="/deleteaccount"
        bg="red"
        color="white"
        mt="2"
        py="2"
        px="4"
        textAlign="center"
      >
        Delete account
      </Button>
    </Container>
  );
}
