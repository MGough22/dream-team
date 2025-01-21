import React, { useState, useContext } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
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
  const [error, setError] = useState("");
  const [successfulSignUp, setSuccessfulSignUp] = useState("");

  const { setUsername } = useContext(UsernameContext);

  const onSignUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log("user in line 22 of sign up>>>>>", user);
        updateProfile(user, { displayName: localUsername }).then(() => {
          setUsername(localUsername);

          setSuccessfulSignUp("You have signed up successfully");
          toaster.create({
            title: "Account creation successful",
            type: "success",
          });
          navigate("/");
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toaster.create({
          title: `Error: ${errorCode}`,
          type: "error",
        });
        // ..
      });
  };
  return (
    <Container
      as="section"
      bg="gray.300"
      maxW="md"
      my="4"
      p="4"
      borderRadius="md"
    >
      <VStack spacing="4" align="stretch">
        <Heading size="lg" textAlign="center">
          Sign Up
        </Heading>

        <Box>
          <Text mb="2">Enter your username</Text>
          <Input
            type="username"
            value={localUsername}
            onChange={(e) => setLocalUsername(e.target.value)}
            placeholder="Enter username"
            bg="white"
            mb="4"
            required
          />
        </Box>

        <Box>
          <Text mb="2">Enter your email address</Text>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            bg="white"
            mb="4"
            required
          />
        </Box>

        <Box>
          <Text mb="2">Create your password</Text>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            bg="white"
            mb="4"
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
          <Text>Already have an account?</Text>
          <Text as={Link} to="/login" textDecoration="underline">
            Login
          </Text>
        </HStack>
      </VStack>
    </Container>
  );
}
