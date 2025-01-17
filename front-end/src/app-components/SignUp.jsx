import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Button, Container, Heading, Input, Text } from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localUsername, setLocalUsername] = useState("");
  const [error, setError] = useState("");
  const [successfulSignUp, setSuccessfulSignUp] = useState("");

  const onSignUp = e => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log("user in line 22 of sign up>>>>>", user);
        updateProfile(user, { displayName: localUsername }).then(() => {
          setSuccessfulSignUp("You have signed up successfully");
          toaster.create({
            title: "Account creation successful",
            type: "success",
          });
          navigate("/");
        });
        // ...
      })
      .catch(error => {
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
    <Container as="section" bg="gray.300" maxW="md" my="5vh" p="5vh">
      <Heading my="1vh" p="1vh">
        Sign Up
      </Heading>
      <Text>Enter your username</Text>
      <Input
        as="form"
        type="username"
        value={localUsername}
        onChange={e => setLocalUsername(e.target.value)}
        placeholder="Enter username"
        required
      ></Input>
      <Text>Enter your email address</Text>
      <Input
        as="form"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter email address"
        required
      ></Input>
      <Text>Create your password</Text>
      <Input
        as="form"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter password"
        required
      ></Input>
      <Button color="black" type="submit" onClick={onSignUp}>
        Sign up
      </Button>
      <Text>Already have an account?</Text>
      <Text as={Link} to={`/login`}>
        Login
      </Text>
    </Container>
  );
}
