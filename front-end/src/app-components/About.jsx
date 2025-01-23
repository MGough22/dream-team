import { Container, Text } from "@chakra-ui/react";
import React from "react";

export default function About() {
  return (
    <Container
      as="section"
      // bg="gray.300"
      maxW="md"
      my="5vh"
      p="5vh"
      bg="gray.400/10"
      backdropFilter="blur(7px)"
      borderRadius={10}
      textAlign="center"
    >
      <Text>ABOUT US</Text>
    </Container>
  );
}
