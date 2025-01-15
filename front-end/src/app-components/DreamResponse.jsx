import { Button, Container, Heading, HStack, Box, Text} from '@chakra-ui/react'
import { SkeletonText } from '../components/ui/skeleton'
import {Blockquote} from '../components/ui/blockquote'
import React from 'react'
import {Tag} from '../components/ui/tag'
import {Avatar} from '../components/ui/avatar'
import suncross from '../assets/dream-tag-symbols/sun-cross.png'
import treeoflife from '../assets/dream-tag-symbols/tree-of-life.png'
import maze from '../assets/dream-tag-symbols/maze.png'

export default function DreamResponse() {
  return (
    <Container as="section" bg="gray.300" maxW="md" my="5vh" p="5vh" >
        <Heading my="1vh" p="1vh">Your submitted dream...</Heading>
        <Container bg="white" p="10vh">
        <Blockquote>You dreamt you were...</Blockquote>
        </Container>
        <Heading my="1vh" p="1vh">Your interpretation...</Heading>
        <Box p="5vh">
        <SkeletonText noOfLines={3} gap="4"/>
        </Box>
      <HStack gap="3" p="1vh">
        <Tag startElement={
            <Avatar 
            size="full" 
            src={suncross}/>}>Nightmare</Tag>
        <Tag startElement={
            <Avatar 
            size="full" 
            src={treeoflife}/>}>Life-cycles</Tag>
        <Tag startElement={
            <Avatar 
            size="full" 
            src={maze}/>}>Confusion</Tag>
      </HStack>
      <HStack gap="3" p="1vh">
      <Button size="sm" color="black" >Save</Button>
      <Button size="sm" color="black" >Discard</Button>
      <Button size="sm" color="black" >Favourite</Button>
      </HStack>
      <Button width="30vw" color="black" size="xl" mx="auto" display="block" m="3vh" >Interpret again???</Button>
      
    
      </Container>
  )
}
