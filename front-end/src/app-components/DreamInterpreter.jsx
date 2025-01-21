import {
  // Box,
  Button,
  Container,
  Heading,
  HStack,
  VStack,
  // Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Switch } from "../components/ui/switch";
import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { UserProvider } from "../contexts/UserContext";
import { UserContext } from "../contexts/UserContext";

export default function DreamInterpreter() {
  const [checked, setChecked] = useState(false);
  const [enteredDream, setEnteredDream] = useState("");
  const [responseType, setResponseType] = useState("jungianMystic");
  const { user } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResponseTypeChange = (type) => {
    setResponseType(type);
  };

  const onInterpret = (e) => {
    e.preventDefault();
    if (!enteredDream.trim()) {
      setError("Please enter a dream before submitting");
      return;
    }
    setError("");
    navigate("/response/", {
      state: {
        dream: enteredDream,
        isPublic: checked,
        responseType: responseType,
        altResponse:
          responseType === "jungianMystic" ? "balanced" : "jungianMystic",
      },
    });
  };

  return (
    <Container
      as="section"
      bg="gray.300"
      maxW="2xl"
      my="2"
      p="8"
      borderRadius={10}
    >
      <VStack spacing="2" align="center">
        <Heading id="interpret-heading" my="0" p="0">
          Interpreter of dreams
        </Heading>
        <Text
          as="h3"
          mb="2"
          my="1vh"
          fontWeight="bold"
          fontSize={30}
          color="black"
        >
          Describe your dream in a few sentences...
        </Text>
        <Textarea
          as="form"
          type="dream"
          my="2"
          p="5vh"
          bg="white"
          fontSize="1.3rem"
          lineHeight="2rem"
          placeholder="eg: I had a dream that all the Northcoders staff had been replaced by ai..."
          _placeholder={{
            color: "gray.500",
            fontStyle: "italic",
            fontFamily: "cursive",
          }}
          onChange={(e) => {
            setEnteredDream(e.target.value);
            if (error) setError("");
          }}
          isInvalid={!!error}
        />
        {error && (
          <Text color="red.600" fontSize="l">
            {error}
          </Text>
        )}
        <VStack align="center" mb="4" mt="0">
          <Text as="h3">Make dream public?</Text>
          <HStack spacing="3">
            <Text as="h4" color={!checked ? "black" : "gray.400"}>
              Private
            </Text>
            <Switch
              checked={checked}
              onCheckedChange={(e) => setChecked(e.checked)}
              size="lg"
            />
            <Text as="h4" color={checked ? "black" : "gray.400"}>
              Public
            </Text>
          </HStack>
        </VStack>

        <VStack align="center" mb="4">
          <Heading size="md" as="h3">
            Response style
          </Heading>
          <HStack gap="4">
            <Button
              size="sm"
              color={responseType === "jungianMystic" ? "black" : "grey"}
              bg={responseType === "jungianMystic" ? "grey" : null}
              onClick={() => handleResponseTypeChange("jungianMystic")}
            >
              Jungian/Mystic
            </Button>
            <Button
              size="sm"
              color={responseType === "balanced" ? "black" : "grey"}
              bg={responseType === "balanced" ? "grey" : null}
              onClick={() => handleResponseTypeChange("balanced")}
            >
              Balanced
            </Button>
          </HStack>
        </VStack>
        <Button
          onClick={onInterpret}
          color="black"
          size="xl"
          mx="auto"
          display="block"
          mt="4"
          pt="2.5"
          fontSize="2rem"
        >
          Interpret
        </Button>
      </VStack>
    </Container>
  );
}
