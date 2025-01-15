import { Heading, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { Image } from '@chakra-ui/react'
import symbol1 from '../assets/symbol1.png'

export default function SymbolGuide() {
  return (
    <>
    <Heading>SymbolGuide here</Heading>
    <Image src={symbol1} alt="stand in symbol image"/>
    </>
  )
}