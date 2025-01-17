import { Box, Button, Card, HStack } from '@chakra-ui/react'
import React from 'react'

export default function UserDreamCard({currentDream}) {
  return (
    <>
    <Box bg="white" border="1px solid">
        <Card.Root width="auto" >
                  <Card.Title mb="2"><b>User's dream is:</b> {currentDream.dreamText}</Card.Title>
                  <Card.Description>
                   <b> User's interpretation is:</b>{currentDream.interpretations}
                  <b> Date of dream was:</b>  {currentDream.interpretationDate}
                  </Card.Description>
                <Card.Footer justifyContent="flex-end" >
                  <Box>
                  <Button variant="outline">View</Button>
                  <Button variant="outline">Delete</Button>
                  <Button variant="outline">Favourite</Button>
                  <Button variant="outline">{!currentDream.votes ? `Votes: 0`: `Votes: ${currentDream.votes}`}</Button>
                  </Box>
                </Card.Footer>
              </Card.Root> 
        </Box>
        </>
  )
}
