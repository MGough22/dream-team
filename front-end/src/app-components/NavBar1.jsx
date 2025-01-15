import { Box, Button, Flex, Heading, HStack, Spacer, Text } from '@chakra-ui/react'
import React from 'react'

export default function NavBar1() {
  return (
    <Flex as="nav" p="1vw" alignItems="center" gap="1vw">
    <Heading as="h1">DreamApp</Heading>
    <Spacer/>
<HStack>
<Box bg="gray.600" p="1vh" color="white">Symbol Guide</Box>
<Text bg="gray.700" p="1vh" color="white">Logged in user: Welcome, Dreamer69@dreamz.biz
</Text>
<Button bg="gray.800" p="1vh" color="white"> Login/Logout/Settings</Button>
</HStack>
</Flex>
  )
}
