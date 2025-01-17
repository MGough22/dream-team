import { Button, Container, Heading, Input, Text } from '@chakra-ui/react'
import { getAuth, signInWithEmailAndPassword, deleteUser } from 'firebase/auth';
import React, {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'

export default function DeleteAccount() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const [successfulDelete, setSuccessfulDelete] = useState('')
 const navigate = useNavigate()
 
//NOTE FROM TOM - we have state for whether account deletion has been sucessful or not, we could use this state to generate Toast style messages, or perhaps on new pages/components ie. if we successfully delete account we're taken to a new page with a component that says "account deleted" and then a clickable link to the home page.

const handleDeleteAccount = () => {
    const auth = getAuth();
    setError('');
    setSuccessfulDelete('');
  
    //sign in again
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        //firebase delete user function
        return deleteUser(user);
      })
      .then(() => {
        setSuccessfulDelete('Account deleted successfully.');
        navigate('/');
      })
      .catch(err => {
        console.error(err.message);
        setError('Failed to delete account. Please check your credentials.');
      });
  };

  return (
    <Container as="section" bg="gray.300" maxW="md" my="5vh" p="5vh" >
    <Heading my="1vh" p="1vh">Delete Account</Heading>
    <Text>Email</Text>
    <Input as="form" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter email address"></Input>
    <Text>Password</Text>
    <Input as="form" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter password"></Input>
    <Button as={Link} to="/deleteaccount" bg="red" color="white" onClick={handleDeleteAccount}>Delete account</Button>
</Container>
  )
}
