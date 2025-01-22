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
import { Tooltip } from "../components/ui/tooltip";
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

  const handleResponseTypeChange = type => {
    setResponseType(type);
  };

  const onInterpret = e => {
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
      // bg="gray.300"
      maxW="2xl"
      // my="2"
      // p="8"
      borderRadius={10}
      //
      bg="gray.400/20"
      backdropFilter="blur(7px)"
      // maxW="2xl"
      my="10"
      p="8"
      // border="solid black 0.2px"
      // borderRadius={15}
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
          onChange={e => {
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
            <Tooltip
              content="You're dream will is anonyonmous, the content will be viewable only to you"
              positioning={{ placement: "left-end" }}
              openDelay={500}
              closeDelay={100}
              interactive
            >
              <Text as="h4" color={!checked ? "black" : "gray.400"}>
                Private
              </Text>
            </Tooltip>
            <Switch
              checked={checked}
              onCheckedChange={e => setChecked(e.checked)}
              size="lg"
            />
            <Tooltip
              content="Your dream will remain anonyonmous, no user persoanl information will be shared, but the content will be viewable to the public"
              positioning={{ placement: "right-end" }}
              openDelay={500}
              closeDelay={100}
              interactive
            >
              <Text color={checked ? "black" : "gray.400"}>Public</Text>
            </Tooltip>
          </HStack>
        </VStack>

        <VStack align="center" mb="4">
          <Heading size="md" as="h3">
            Response style
          </Heading>
          <HStack gap="4">
            <Tooltip
              content="Select this option to explore the mystic dimensions of your dream"
              positioning={{ placement: "left-end" }}
              openDelay={500}
              closeDelay={100}
              interactive
            >
              <Button
                size="sm"
                color={responseType === "jungianMystic" ? "black" : "grey"}
                bg={responseType === "jungianMystic" ? "grey" : null}
                onClick={() => handleResponseTypeChange("jungianMystic")}
              >
                Mystic
              </Button>
            </Tooltip>
            <Tooltip
              content="Select this option to for a more balanced assesment of your astral exploits"
              positioning={{ placement: "right-end" }}
              openDelay={500}
              closeDelay={100}
              interactive
            >
              <Button
                size="sm"
                color={responseType === "balanced" ? "black" : "grey"}
                bg={responseType === "balanced" ? "grey" : null}
                onClick={() => handleResponseTypeChange("balanced")}
              >
                Balanced
              </Button>
            </Tooltip>
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
