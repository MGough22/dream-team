import React from 'react'
import { Card, SimpleGrid, Box, Button } from '@chakra-ui/react'

export default function UserDreamJournal() {
  return (
    <SimpleGrid columns={4} gap="10px" minChildWidth={250} p="10px">
    <Box bg="white" border="1px solid">
    <Card.Root width="auto" >
              <Card.Title mb="2">Nightmare 1</Card.Title>
              <Card.Description>
                Bad dream description
              </Card.Description>
            <Card.Footer justifyContent="flex-end">
              <Button variant="outline">View</Button>
              <Button variant="outline">Delete</Button>
              <Button variant="outline">Favourite</Button>
            </Card.Footer>
          </Card.Root> 
    </Box>
    <Box bg="white" border="1px solid">
    <Card.Root width="auto" >
              <Card.Title mb="2">Nightmare 2</Card.Title>
              <Card.Description>
                Bad dream description
              </Card.Description>
            <Card.Footer justifyContent="flex-end">
              <Button variant="outline">View</Button>
              <Button variant="outline">Delete</Button>
              <Button variant="outline">Favourite</Button>
            </Card.Footer>
          </Card.Root>
    </Box>
    <Box bg="white" border="1px solid">
    <Card.Root width="auto" >
              <Card.Title mb="2">Nightmare 3</Card.Title>
              <Card.Description>
                Bad dream description
              </Card.Description>
            <Card.Footer justifyContent="flex-end">
              <Button variant="outline">View</Button>
              <Button variant="outline">Delete</Button>
              <Button variant="outline">Favourite</Button>
            </Card.Footer>
          </Card.Root>
    </Box>
    <Box bg="white" border="1px solid">
    <Card.Root width="auto" >
              <Card.Title mb="2">Nightmare 4</Card.Title>
              <Card.Description>
                Bad dream description
              </Card.Description>
            <Card.Footer justifyContent="flex-end">
              <Button variant="outline">View</Button>
              <Button variant="outline">Delete</Button>
              <Button variant="outline">Favourite</Button>
            </Card.Footer>
          </Card.Root>
    </Box>
    <Box bg="white" border="1px solid">
    <Card.Root width="auto" >
              <Card.Title mb="2">Nightmare 5</Card.Title>
              <Card.Description>
                Bad dream description
              </Card.Description>
            <Card.Footer justifyContent="flex-end">
              <Button variant="outline">View</Button>
              <Button variant="outline">Delete</Button>
              <Button variant="outline">Favourite</Button>
            </Card.Footer>
          </Card.Root>
    </Box>
    <Box bg="white" border="1px solid">
    <Card.Root width="auto" >
              <Card.Title mb="2">Nightmare 6</Card.Title>
              <Card.Description>
                Bad dream description
              </Card.Description>
            <Card.Footer justifyContent="flex-end">
              <Button variant="outline">View</Button>
              <Button variant="outline">Delete</Button>
              <Button variant="outline">Favourite</Button>
            </Card.Footer>
          </Card.Root>
    </Box>
 </SimpleGrid>
  )
}