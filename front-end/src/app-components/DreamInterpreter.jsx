import { Box, Button, Container, Heading, HStack, Input, Text } from '@chakra-ui/react'
import { Switch } from "../components/ui/switch"
import React from 'react'
import { useState, useContext } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserProvider } from '../contexts/UserContext'
import { UserContext } from '../contexts/UserContext'


export default function DreamInterpreter() {
  //public switch state
  const [checked, setChecked] = useState(false)
  const [enteredDream, setEnteredDream] = useState('')
  const {user} = useContext(UserContext)
  const navigate = useNavigate()

  const onInterpret = (e) => {
    e.preventDefault()
   navigate('/response/', { state: { dream: enteredDream, isPublic: checked } })
  }


  return (
    <Container as="section" bg="gray.300" maxW="md" my="5vh" p="5vh" >
    <Heading my="1vh" p="1vh">Tell me about your dream....</Heading>
   <Text my="1vh" color="gray.600" fontWeight="bold">Enter your dream below...</Text>
   <Text color="blue.500" fontWeight="bold">“an engaging and entertaining way for people to interpret their dreams and record them over time - allowing users to discover recurrent themes and narratives etc etc etc”</Text>
   <Input as="form" type="dream" my="10vh" mx="auto" p="5vh 20vh 20vh 5vh" bg="white" placeholder='Enter your dream...' onChange={(e)=> {setEnteredDream(e.target.value); console.log(e.target.value) }}>
    
  </Input>
  <Switch p="5vh" checked={checked} onCheckedChange={(e) => setChecked(e.checked)} size="lg">Submit dream to public gallery</Switch>
  
  <HStack gap="1">
  <Heading  size="md">Response style</Heading>
  <Button size="sm" color="black" >Jungian/Mystic</Button>
  <Button size="sm" color="black" >Balance</Button>
  </HStack>
  <Button onClick={onInterpret} color="black" size="xl" mx="auto" display="block" >Interpret</Button>

  </Container>
  
  )
}
