import { Button, Container, Heading, HStack, Box, Text} from '@chakra-ui/react'
import { SkeletonText } from '../components/ui/skeleton'
import {Blockquote} from '../components/ui/blockquote'
import React, {useState, useContext} from 'react'
import {Tag} from '../components/ui/tag'
import {Avatar} from '../components/ui/avatar'
import suncross from '../assets/dream-tag-symbols/sun-cross.png'
import treeoflife from '../assets/dream-tag-symbols/tree-of-life.png'
import maze from '../assets/dream-tag-symbols/maze.png'
import { useLocation, useParams } from 'react-router-dom'
import { UserIdContext } from '../contexts/UserIdContext'

export default function RetrievedDreamResponse() {
const {state} = useLocation()
const {currentDream} = state
const {userId} = useContext(UserIdContext)

  return (
    <Container as="section" bg="gray.300" maxW="lg" my="5vh" p="5vh" >
        <Heading my="1vh" p="1vh">{`Date:${currentDream.interpretationDate}`}</Heading>
        <Heading my="1vh" p="1vh">Your submitted dream...</Heading>
        <Container bg="white" p="10vh">
        <Blockquote>{`You dreamt...${currentDream.dreamText}`}</Blockquote>
        </Container>
        <Heading my="1vh" p="1vh">{`Your interpretation...`}</Heading>
        <Box p="5vh">
        {currentDream.interpretations ? (
          <Text>{`${currentDream.interpretations}`}</Text>
        ) : (
          <SkeletonText noOfLines={3} gap="4" />
        )}
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
      <HStack gap="3" p="1rem">
        {userId === currentDream.userId ? <Button size="sm" color="black">Delete</Button> : null }
      <Button size="sm" color="black" >Favourite</Button>
      </HStack>
     
      
    
      </Container>
  )
}