import React, {useState} from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';
import { Button, Container, Heading, Input, Text } from '@chakra-ui/react';

export default function SignUp() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('')
  
    const onSubmit = (e) => {
      e.preventDefault();
    
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          //successful sign in
          const user = userCredential.user;
          console.log("user in line 22 of sign up>>>>>", user);
          // Navigate to login after successful signup
          // Display a temporary message 'sign up successful'
          // Optionally, prefill the login page with the email/username
          navigate("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    };
    
  return (
     <Container as="section" bg="gray.300" maxW="md" my="5vh" p="5vh" >
        <Heading my="1vh" p="1vh">Sign Up</Heading>
        <Text>Enter your username</Text>
        <Input as="form" type="username" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder="Enter username" required></Input>
        <Text>Enter your email address</Text>
        <Input as="form" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter email address" required></Input>
        <Text>Create your password</Text>
        <Input as="form" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter password" required></Input>
        <Button color="black" type="submit" onClick={onSubmit}>Sign up</Button>
        <Text >Already have an account?</Text><Text as={Link} to={`/login`}>Login</Text>
    </Container>
  )
}
