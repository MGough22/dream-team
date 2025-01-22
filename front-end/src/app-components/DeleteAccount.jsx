import { Button, Container, Heading, Input, Text } from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword, deleteUser } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountDeleteButton from "./AccountDeleteButton";

export default function DeleteAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successfulDelete, setSuccessfulDelete] = useState("");
  const navigate = useNavigate();

  //NOTE FROM TOM - we have state for whether account deletion has been sucessful or not, we could use this state to generate Toast style messages, or perhaps on new pages/components ie. if we successfully delete account we're taken to a new page with a component that says "account deleted" and then a clickable link to the home page.

  const handleDeleteAccount = () => {
    const auth = getAuth();
    setError("");
    setSuccessfulDelete("");

    //sign in again
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        //firebase delete user function
        return deleteUser(user);
      })
      .then(() => {
        setSuccessfulDelete("Account deleted successfully.");
        navigate("/");
      })
      .catch(err => {
        console.error(err.message);
        setError("Failed to delete account. Please check your credentials.");
      });
  };

  return (
    <Container
      // as="section"
      // bg="gray.300"
      maxW="md"
      my="1vh"
      p="2vh"
      textAlign="center"
      as="h3"
      bg="gray.400/20"
      backdropFilter="blur(7px)"
      borderRadius={10}
    >
      <Heading my="1vh" p="1vh" as="h1" fontSize={40}>
        Delete Account
      </Heading>
      <Text as="h3">Email</Text>
      <Input
        as="form"
        fontSize={20}
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter email address"
      ></Input>
      <Text as="h3" pt="5">
        Password
      </Text>
      <Input
        as="form"
        type="password"
        fontSize={20}
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter password"
      ></Input>
      <AccountDeleteButton
        // Added this custom button component

        onClick={handleDeleteAccount}
        // isDisabled={!email || !password}
      >
        Delete account
      </AccountDeleteButton>
    </Container>
  );
}
