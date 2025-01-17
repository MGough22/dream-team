import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Button, Container, Heading, Input, Text } from "@chakra-ui/react";
import { toaster, Toaster } from "../components/ui/toaster";

export default function LoginLogout() {
  //Login Code
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        //wait before navigating to the homepage
        //message user successfully logged in
        //then navigate
        navigate("/");
        console.log(user);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  //LogOut code
  const handleLogout = () => {
    toaster.create({
      description: "Logged out successfully",
      type: "success",
    });
    setTimeout(() => {
      signOut(auth)
        .then(() => {
          navigate("/");
          console.log("Signed out successfully");
        })
        .catch(error => {
          // An error happened
          console.log(error, "error in logout");
        });
      console.log("done");
    }, 300);
  };

  return (
    <>
      <Toaster />
      <Container as="section" bg="gray.300" maxW="md" my="5vh" p="5vh">
        <Heading my="1vh" p="1vh">
          Login
        </Heading>
        <Text>Login email</Text>
        <Input
          as="form"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter email address"
        ></Input>
        <Text>Password</Text>
        <Input
          as="form"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
        ></Input>
        <Button color="black" type="submit" onClick={onLogin}>
          Login
        </Button>
        <Text>No account yet?</Text>
        <Text as={Link} to={`/signup`}>
          Sign up
        </Text>
      </Container>

      <Container as="section" bg="gray.300" maxW="md" my="5vh" p="5vh">
        <Heading my="1vh" p="1vh">
          Logout
        </Heading>
        <Button color="black" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
    </>
  );
}
