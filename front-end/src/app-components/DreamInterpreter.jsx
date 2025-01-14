import { Box, Button, Container, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export default function DreamInterpreter() {
  return (
    <Container as="section" bg="gray.200" my="5vh" p="5vh">
<Heading my="1vh" p="1vh">Dream Intrepreter</Heading>
   <Text my="1vh" color="gray.600" fontWeight="bold">Enter your dream below...</Text>
   <Text color="blue.500" fontWeight="bold">“an engaging and entertaining way for people to interpret their dreams and record them over time - allowing users to discover recurrent themes and narratives etc etc etc”</Text>
   <Box as="form" my="10vh" mx="10vh" p="20" bg="white">
    <Text>Dream here...</Text>
  </Box>
  <Button color="black" mx="1vw">Interpret</Button>
  <Button color="black" mx="1vw">Style1</Button>
  <Button color="black" mx="1vw">Style2</Button>
  <Button color="black" mx="1vw">Style3</Button>
  </Container>
  
  )
}
