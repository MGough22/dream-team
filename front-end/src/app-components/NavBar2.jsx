import { Flex, Box } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Link } from 'react-router-dom'

export default function NavBar2() {
const {user} = useContext(UserContext)

  return (
    <Flex bg="gray.400" justify="space-between" wrap="wrap" gap="2">
        <Box as={Link} to="/" w="150px" h="50px" bg="black" color="white" flexGrow="1">DR3AM3R HOME/LOGO</Box>
        <Box as={Link} to="/about" w="150px" h="50px" bg="gray.600" color="white">About/Contact</Box>
        <Box w="150px" h="50px" bg="gray.700" color="white"> <b>Welcome {user}</b></Box>
        <Box as={Link} to={`/${user}/settings`} w="150px" h="50px" bg="gray.800" color="white">Settings</Box>
    </Flex>
  )
}
