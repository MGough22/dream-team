import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';
import { Container, Heading, Input } from '@chakra-ui/react';

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
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });


    }
  return (
     <Container as="section" bg="gray.300" maxW="md" my="5vh" p="5vh" >
        <Heading my="1vh" p="1vh">Sign Up</Heading>
        <Input as="form"></Input>
    </Container>
  )
}
