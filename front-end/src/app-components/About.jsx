import {
  Container,
  Text,
  Card,
  HStack,
  Stack,
  Strong,
  VStack,
} from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";
import React from "react";
import { Link } from "react-router-dom";
import tomglencross from "../assets/team/tom g.png";
import seif from "../assets/team/seif.png";
import marcus from "../assets/team/marcus.png";
import mike from "../assets/team/mike.png";
import zoltan from "../assets/team/zoltan.png";

export default function About() {
  return (
    <Container
      as="section"
      maxW="md"
      my="5vh"
      p="5vh"
      bg="gray.400/16"
      backdropFilter="blur(7px)"
      borderRadius={10}
      textAlign="center"
    >
      {/* TOMS CARD */}
      <VStack>
        <Card.Root width="320px" bg="white/70" backdropFilter="blur(7px)">
          <Card.Body>
            <HStack mb="6" gap="3">
              <Avatar src={tomglencross} name="Tom Glencross" size="2xl" />
              <Stack gap="0">
                <Text
                  as="h3"
                  fontWeight="semibold"
                  textStyle="sm"
                  color="black"
                >
                  Tom Glencross
                </Text>
                <Text
                  as={Link}
                  to="https://github.com/tomglencross69/"
                  color="fg.muted"
                  textStyle="sm"
                >
                  @github/tomglencross69
                </Text>
                <Text
                  as={Link}
                  to="https://instagram.com/tom.glencross"
                  color="fg.muted"
                  textStyle="sm"
                >
                  @instagram/tom.glencross
                </Text>
              </Stack>
            </HStack>
            <Card.Description>
              <Strong color="fg">Tom Glencross </Strong>
              Nocture's front-end components, functionality, and integration
              with back-end systems.
            </Card.Description>
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Card.Root>

        {/* MIKES CARD */}
        <Card.Root width="320px" bg="white/70" backdropFilter="blur(7px)">
          <Card.Body>
            <HStack mb="6" gap="3">
              <Avatar src={mike} name="Mike Winnard" size="2xl" />
              <Stack gap="0">
                <Text
                  as="h3"
                  fontWeight="semibold"
                  textStyle="sm"
                  color="black"
                >
                  Mike Winnard
                </Text>
                <Text
                  as={Link}
                  to="https://github.com/m1k3wn"
                  color="fg.muted"
                  textStyle="sm"
                >
                  @github/m1k3wn
                </Text>
                <Text
                  as={Link}
                  to="https://mikewinnard.co.uk/"
                  color="fg.muted"
                  textStyle="sm"
                >
                  @mikewinnard.co.uk
                </Text>
              </Stack>
            </HStack>
            <Card.Description>
              <Strong color="fg">Mike Winnard </Strong>
              Machine learning, fine-tuning AI deployment, and Nocturne's visual
              language.
            </Card.Description>
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Card.Root>

        {/* MARCUS' CARD */}
        <Card.Root width="320px" bg="white/70" backdropFilter="blur(7px)">
          <Card.Body>
            <HStack mb="6" gap="3">
              <Avatar src={marcus} name="Marcus Gough" size="2xl" />
              <Stack gap="0">
                <Text
                  as="h3"
                  fontWeight="semibold"
                  textStyle="sm"
                  color="black"
                >
                  Marcus Gough
                </Text>
                <Text
                  as={Link}
                  to="https://github.com/MGough22"
                  color="fg.muted"
                  textStyle="sm"
                >
                  @github/MGough22
                </Text>
              </Stack>
            </HStack>
            <Card.Description>
              <Strong color="fg">Marcus Gough </Strong>
              Nocturne's front-end, Machine learning, visual language, and
              animation.
            </Card.Description>
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Card.Root>

        {/* ZOLTAN CARD */}
        <Card.Root width="320px" bg="white/70" backdropFilter="blur(7px)">
          <Card.Body>
            <HStack mb="6" gap="3">
              <Avatar src={zoltan} name="Zoltan Mozga" size="2xl" />
              <Stack gap="0">
                <Text
                  as="h3"
                  fontWeight="semibold"
                  textStyle="sm"
                  color="black"
                >
                  Zoltan Mozga
                </Text>
                <Text
                  as={Link}
                  to="https://github.com/Lordwhale"
                  color="fg.muted"
                  textStyle="sm"
                >
                  @github/Lordwhale
                </Text>
              </Stack>
            </HStack>
            <Card.Description>
              <Strong color="fg">Zoltan Mozga </Strong>
              Authentication, components, and responsive UI elements.
            </Card.Description>
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Card.Root>

        {/* SEIF CARD */}
        <Card.Root width="320px" bg="white/70" backdropFilter="blur(7px)">
          <Card.Body>
            <HStack mb="6" gap="3">
              <Avatar src={seif} name="Seif Hok" size="2xl" />
              <Stack gap="0">
                <Text
                  as="h3"
                  fontWeight="semibold"
                  textStyle="sm"
                  color="black"
                >
                  Seif Hok
                </Text>
                <Text
                  as={Link}
                  to="https://github.com/SeifUlHok"
                  color="fg.muted"
                  textStyle="sm"
                >
                  @github/SeifUlHok
                </Text>
              </Stack>
            </HStack>
            <Card.Description>
              <Strong color="fg">Seif Hok</Strong> Database and API for
              Nocturne.
            </Card.Description>
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Card.Root>
      </VStack>
    </Container>
  );
}

/*
https://github.com/MGough22
https://github.com/Lordwhale
https://github.com/SeifUlHok
https://github.com/m1k3wn
*/
