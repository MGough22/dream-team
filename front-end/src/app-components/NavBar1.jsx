import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { UsernameContext } from "../contexts/UsernameContext";

export default function NavBar1() {
  const { user } = useContext(UserContext);
  const { username } = useContext(UsernameContext);

  return (
    <Grid as="nav" p="1vw" gap="1vw">
      <Box as={Link} to="/">
        <Heading color="black" as="h1">
          DreamApp
        </Heading>
      </Box>
      <Spacer />
      <HStack spacing="1vw" flexWrap="wrap">
        <Box as={Link} to={`/signup`} bg="gray.300" p="1vh" color="white">
          Create Account
        </Box>
        {user === "Guest" ? (
          <Box
            as={Link}
            to={`/login`}
            bg="gray.400"
            p="1vh"
            color="white"
          >{`Login to access your dream journal`}</Box>
        ) : (
          <Box
            as={Link}
            to={`/dreamjournal`}
            bg="gray.400"
            p="1vh"
            color="white"
          >{`${username}'s Dream Journal`}</Box>
        )}
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
        {user === "Guest" ? null : (
          <Text as={Link} to={`/settings`} bg="gray.700" p="1vh" color="white">
            Logged in user/settings: Welcome, {username}
          </Text>
        )}
        <Button as={Link} to={`/login`} bg="gray.800" p="1vh" color="white">
          {" "}
          Login/Logout
        </Button>
      </HStack>
    </Grid>
  );
}
