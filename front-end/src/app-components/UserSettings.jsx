import { Container, Text } from '@chakra-ui/react'
import React,{ useContext }from 'react'
import { UserContext } from '../contexts/UserContext'

export default function UserSettings() {
const {user} = useContext(UserContext)
    
  return (
     <Container as="section" bg="gray.300" maxW="md" my="5vh" p="5vh" >
            <Text>Welcome {user} to your settings</Text>
          </Container>
  )
}
