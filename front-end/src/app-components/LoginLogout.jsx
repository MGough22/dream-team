import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate, Link } from "react-router-dom";
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

export default function LoginLogout() {
  //Login Code
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successfulLogin, setSuccessfulLogin] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        //wait before navigating to the homepage
        //message user successfully logged in
        //then navigate
        navigate("/");
        console.log(user);
        setSuccessfulLogin("You have logged in successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError("Login failed");
      });
  };

  //LogOut code
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        //wait to navigate to homepage
        //display message sign-out successful
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened
        console.log(error, "error in logout");
      });
  };

  return (
    <>
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
            Login
          </Heading>

          {error && (
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          )}
          {successfulLogin && (
            <Text color="green.500" textAlign="center">
              {successfulLogin}
            </Text>
          )}

          <Box>
            <Text mb="2">Login email</Text>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              bg="white"
              mb="4"
            />
          </Box>

          <Box>
            <Text mb="2">Password</Text>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              bg="white"
              mb="4"
            />
          </Box>

          <Button
            color="black"
            type="submit"
            onClick={onLogin}
            width="100%"
            mt="2"
          >
            Login
          </Button>

          <HStack spacing="2" justify="center" pt="2">
            <Text>No account yet?</Text>
            <Text as={Link} to="/signup" textDecoration="underline">
              Sign up
            </Text>
          </HStack>
        </VStack>
      </Container>

      <Container
        as="section"
        bg="gray.300"
        maxW="md"
        mt="4"
        p="8"
        borderRadius="md"
      >
        <VStack spacing="4" align="center">
          <Heading size="lg">Logout</Heading>
          <Button color="black" onClick={handleLogout} width="100%">
            Logout
          </Button>
        </VStack>
      </Container>
    </>
  );
}
