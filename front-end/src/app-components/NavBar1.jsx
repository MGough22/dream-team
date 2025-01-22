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
import NavItemUser from "./NavItemUser";
import NavItemJournal from "./NavItemJournal";

export default function NavBar1() {
  const { user } = useContext(UserContext);
  const { username } = useContext(UsernameContext);

  return (
    <Grid as="nav" p="1" gap="1vw">
      <HStack spacing="1vw" flexWrap="wrap" className="navBar">
        <Box as={Link} to="/">
          <Heading color="black" as="h1">
            Nocturne
          </Heading>
        </Box>
        <Spacer />
        {user === "Guest" ? (
          <NavItemUser to={`/signup`}>Create Account</NavItemUser>
        ) : null}
        {user === "Guest" ? (
          <NavItemUser
            to={`/login`}
          >{`Login to access your dream journal`}</NavItemUser>
        ) : (
          <NavItemJournal
            to={`/dreamjournal`}
          >{`${username}'s Dream Journal`}</NavItemJournal>
        )}
        <NavItemJournal as={Link} to={`/publicdreamjournal`}>
          Public Dreams
        </NavItemJournal>
        <NavItemJournal to="/about">About</NavItemJournal>
        {user === "Guest" ? null : (
          <NavItemUser to={`/settings`}>{username}'s Account</NavItemUser>
        )}
        <NavItemUser to={`/login`}> Login/Logout</NavItemUser>
      </HStack>
    </Grid>
  );
}
