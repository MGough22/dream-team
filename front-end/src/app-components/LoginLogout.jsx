import React, {useState} from 'react'
import {  signInWithEmailAndPassword, signOut   } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { Button, Container, Heading, Input, Text } from '@chakra-ui/react';
import { toaster } from '../components/ui/toaster';

export default function LoginLogout() {
  
  //Login Code
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [successfulLogin, setSuccessfulLogin] = useState('')

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            toaster.create({
                        title: "Sign in successful",
                        type: "success",
                      });
            navigate("/")
            console.log(user);
            setSuccessfulLogin("You have logged in successfully")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toaster.create({
                      title: `Error: ${errorCode}`,
                      type: "error",
                    }); 
            console.log(errorCode, errorMessage)
            setError('Login failed')
        });

    }

    //LogOut code
    const handleLogout = () => {  
      if (auth.currentUser != null) {        // message dependant whether user instance is present
         signOut(auth);
         toaster.create({
            title: "Log out successful.",
            type: "success",
        });
         //wait to navigate to homepage
         //display message sign-out successful
          navigate("/");
          console.log("Signed out successfully");
        } else {
        toaster.create({
          title: "No account to log out.",
          description: "You are in guest mode.",
          type: "error",
        });
      };
  }

  
  return (
    <>
    <Container as="section" bg="gray.300" maxW="md" my="5vh" p="5vh" >
        <Heading my="1vh" p="1vh">Login</Heading>
        <Text>Login email</Text>
        <Input as="form" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter email address"></Input>
        <Text>Password</Text>
        <Input as="form" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter password"></Input>
        <Button color="black" type="submit" onClick={onLogin}>Login</Button>
        <Text >No account yet?</Text><Text as={Link} to={`/signup`}>Sign up</Text>
    </Container>

<Container as="section" bg="gray.300" maxW="md" my="5vh" p="5vh" >
<Heading my="1vh" p="1vh">Logout</Heading>
<Button color="black" onClick={handleLogout}>Logout</Button>

</Container>
</>
    
  )
}
