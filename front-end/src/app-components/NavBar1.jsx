import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function NavBar1() {
  const { user } = useContext(UserContext);

  return (
    <Flex as="nav" p="1vw" alignItems="center" gap="1vw">
      <Box as={Link} to="/">
        <Heading color="black" as="h1">
          DreamApp
        </Heading>
      </Box>
      <Spacer />
      <HStack spacing="1vw" flexWrap="wrap">
        <Box
          as={Link}
          to={`/${user}/dreamjournal`}
          bg="gray.400"
          p="1vh"
          color="white"
        >{`${user}'s Dream Journal`}</Box>
        <Box
          as={Link}
          to={`/publicdreamjournal`}
          bg="gray.500"
          p="1vh"
          color="white"
        >
          Public Dream Journal
        </Box>
        <Box as={Link} to="/symbolguide" bg="gray.600" p="1vh" color="white">
          Symbol Guide
        </Box>
        <Text
          as={Link}
          to={`/${user}/settings`}
          bg="gray.700"
          p="1vh"
          color="white"
        >
          Logged in user/settings: Welcome, {user}
        </Text>
        <Button bg="gray.800" p="1vh" color="white">
          {" "}
          Login/Logout
        </Button>
      </HStack>
    </Flex>
  );
}
