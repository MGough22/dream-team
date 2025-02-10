import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
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
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successfulLogin, setSuccessfulLogin] = useState("");

  const onLogin = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        navigate("/");
        console.log(user);
        setSuccessfulLogin("You have logged in successfully");
      })
      .catch(error => {
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
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch(error => {
        console.log(error, "error in logout");
      });
  };

  return (
    <>
      <Container
        as="section"
        maxW="md"
        my="4"
        p="4"
        borderRadius="md"
        bg="gray.400/20"
        backdropFilter="blur(7px)"
      >
        <VStack spacing="4" align="stretch">
          <Heading as="h2" fontSize={40} textAlign="center" mb="-4">
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
            <Text mb="0" as="h3" fontSize={25}>
              Email
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
            />
          </Box>

          <Box>
            <Text mb="0" as="h3" fontSize={25}>
              Password
            </Text>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              as="h4"
              fontSize={20}
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
            <Text as="h4" fontSize={20}>
              No account yet?
            </Text>
            <Text as={Link} to="/signup" textDecoration="none">
              Sign up
            </Text>
          </HStack>
        </VStack>
      </Container>

      <Container
        as="section"
        maxW="md"
        mt="4"
        p="8"
        borderRadius="md"
        bg="gray.400/16"
        backdropFilter="blur(7px)"
      >
        <VStack spacing="4" align="center">
          <Button color="black" onClick={handleLogout} width="100%">
            Logout
          </Button>
        </VStack>
      </Container>
    </>
  );
}
