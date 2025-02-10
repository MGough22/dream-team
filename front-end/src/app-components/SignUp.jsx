import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import {
  Container,
  Heading,
  Input,
  Button,
  Text,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";
import { UsernameContext } from "../contexts/UsernameContext";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localUsername, setLocalUsername] = useState("");
  const [successfulSignUp, setSuccessfulSignUp] = useState("");

  const { setUsername } = useContext(UsernameContext);

  const onSignUp = e => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, { displayName: localUsername }).then(() => {
          setUsername(localUsername);

          setSuccessfulSignUp("You have signed up successfully");
          toaster.create({
            title: "Account creation successful",
            type: "success",
          });
          navigate("/");
        });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toaster.create({
          title: `Error: ${errorCode}`,
          type: "error",
        });
      });
  };
  return (
    <Container
      as="section"
      bg="gray.400/16"
      backdropFilter="blur(7px)"
      maxW="md"
      my="4"
      p="4"
      borderRadius="md"
    >
      <VStack spacing="4" align="stretch">
        <Heading as="h2" fontSize={40} textAlign="center">
          Sign Up
        </Heading>

        <Box>
          <Text mb="0" as="h3" fontSize={25}>
            Choose a username
          </Text>
          <Input
            type="username"
            value={localUsername}
            onChange={e => setLocalUsername(e.target.value)}
            placeholder="Enter username"
            bg="white"
            as="h4"
            fontSize={20}
            mb="2"
            required
          />
        </Box>

        <Box>
          <Text mb="0" as="h3" fontSize={25}>
            Enter your email address
          </Text>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email address"
            bg="white"
            as="h4"
            fontSize={20}
            mb="2"
            required
          />
        </Box>

        <Box>
          <Text mb="0" as="h3" fontSize={25}>
            Create your password
          </Text>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            bg="white"
            as="h4"
            fontSize={20}
            mb="2"
            required
          />
        </Box>

        <Button
          color="black"
          type="submit"
          onClick={onSignUp}
          width="100%"
          mt="2"
        >
          Sign up
        </Button>

        <HStack spacing="2" justify="center" pt="2">
          <Text as="h4" fontSize={20}>
            Already have an account?
          </Text>
          <Text as={Link} to="/login" fontSize={20} textDecoration="none">
            Login
          </Text>
        </HStack>
      </VStack>
    </Container>
  );
}
