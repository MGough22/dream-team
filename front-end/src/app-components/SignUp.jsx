import React, {useState} from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';
import { Button, Container, Heading, Input, Text } from '@chakra-ui/react';
import { toaster } from '../components/ui/toaster';

export default function SignUp() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState(''); 

    const onSubmit = async (e) => {
      e.preventDefault()

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            toaster.create({
              title: "Account creation successful",
              type: "success"
            });
            navigate("/login")
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            toaster.create({        
              title: `Error: ${errorCode}`,
              type: "error"
            })
            // ..
        });

           }
  return (
     <Container as="section" bg="gray.300" maxW="md" my="5vh" p="5vh" >
        <Heading my="1vh" p="1vh">Sign Up</Heading>
        <Text>Enter your email address</Text>
        <Input as="form" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter email address"></Input>
        <Text>Create your password</Text>
        <Input as="form" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter password"></Input>
        <Button color="black" type="submit" onClick={onSubmit}>Sign up</Button>
        <Text >Already have an account?</Text><Text as={Link} to={`/login`}>Login</Text>
    </Container>
  )
}


