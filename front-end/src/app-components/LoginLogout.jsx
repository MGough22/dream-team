import React, {useState} from 'react'
import {  signInWithEmailAndPassword, signOut, getAuth, deleteUser   } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { Button, Container, Heading, Input, Text } from '@chakra-ui/react';

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
            //wait before navigating to the homepage
            //message user successfully logged in
            //then navigate
            navigate("/")
            console.log(user);
            setSuccessfulLogin("You have logged in successfully")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            setError('Login failed')
        });

    }

    //LogOut code
    const handleLogout = () => {               
      signOut(auth).then(() => {
      // Sign-out successful.
      //wait to navigate to homepage
      //display message sign-out successful
          navigate("/");
          console.log("Signed out successfully")
      }).catch((error) => {
      // An error happened
      console.log(error, "error in logout")
      });
  }


  // Delete user - only available to logged in users to delete their account
   
    const handleDeleteUser = () => {   
      
      const auth = getAuth();
      const user = auth.currentUser;  

      deleteUser(user).then(() => {
      // User deleted.
      console.log(`Your account has been deleted`);
      navigate("/");
      }).catch((error) => {
      // An error ocurred
      console.log('error during account deletion')
      // ...
    });
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

    <Container as="section" bg="gray.300" maxW="md" my="5vh" p="5vh" >
        <Heading my="1vh" p="1vh">Delete Account</Heading>
        <Button color="black" onClick={handleDeleteUser}>Delete Account</Button>
    </Container>
</>
    
 )
}

