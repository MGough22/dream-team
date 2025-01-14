import { Flex, Box } from '@chakra-ui/react'
import React from 'react'

export default function NavBar2() {
  return (
    <Flex bg="gray.400" justify="space-between" wrap="wrap" gap="2">
        <Box w="150px" h="50px" bg="black" color="white" flexGrow="1">DR3AM3R HOME/LOGO</Box>
        <Box w="150px" h="50px" bg="gray.600" color="white">About/Contact</Box>
        <Box w="150px" h="50px" bg="gray.700" color="white">Logged in User <b>Welcome Dreamer</b></Box>
        <Box w="150px" h="50px" bg="gray.800" color="white">Settings</Box>
    </Flex>
  )
}
