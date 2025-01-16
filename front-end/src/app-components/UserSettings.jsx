import { Container, Text } from '@chakra-ui/react'
import React,{ useContext }from 'react'
import { UserContext } from '../contexts/UserContext'

export default function UserSettings() {
const {user} = useContext(UserContext)

//this page needs to render a user delete account button
//maybe it checks from state the current logged in user?
//or maybe theres a request to enter username and password to delete account
    
  return (
     <Container as="section" bg="gray.300" maxW="md" my="5vh" p="5vh" >
            <Text>Welcome {user} to your settings</Text>
            
          </Container>
  )
}
