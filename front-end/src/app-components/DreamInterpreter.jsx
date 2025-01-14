import { Box, Button, Container, Heading, HStack, Input, Text } from '@chakra-ui/react'
import { Switch } from "../components/ui/switch"
import React from 'react'
import { useState } from 'react'

export default function DreamInterpreter() {
  //public switch state
  const [checked, setChecked] = useState(false)


  return (
    <Container as="section" bg="gray.300" maxW="md" my="5vh" p="5vh" >
    <Heading my="1vh" p="1vh">Tell me about your dream....</Heading>
   <Text my="1vh" color="gray.600" fontWeight="bold">Enter your dream below...</Text>
   <Text color="blue.500" fontWeight="bold">“an engaging and entertaining way for people to interpret their dreams and record them over time - allowing users to discover recurrent themes and narratives etc etc etc”</Text>
   <Input as="form" my="10vh" mx="auto" p="5vh 20vh 20vh 5vh" bg="white" placeholder='Enter your dream...'>
    
  </Input>
  <Switch p="5vh" checked={checked} onCheckedChange={(e) => setChecked(e.checked)} size="lg">Submit dream to public gallery</Switch>
  
  <HStack gap="1">
  <Heading p="5vh" size="md">Response style</Heading>
  <Button size="sm" color="black" >Jungian</Button>
  <Button size="sm" color="black" >Mystic</Button>
  <Button size="sm" color="black" >Balance</Button>
  </HStack>
  <Button width="30vw" color="black" size="xl" mx="auto" display="block" >Interpret</Button>

  </Container>
  
  )
}
