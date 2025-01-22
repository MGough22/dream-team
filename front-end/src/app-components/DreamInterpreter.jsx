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
      bg="gray.400/20"
      maxW="2xl"
      my="10"
      p="8"
      backdropFilter="blur(7px)"
      borderRadius={15}
      // border="1px inset white"
      // border="1px solid rgba(255, 255, 255, 0.7)"
      // position="relative"
      // overflow="hidden"
      // _after={{
      //   content: '""',
      //   position: "absolute",
      //   top: 0,
      //   left: 0,
      //   right: 0,
      //   bottom: 0,
      //   background: "linear-gradient(transparent, rgba(255, 255, 255, 0.2))",
      //   zIndex: -10,
      //   filter: "blur(90px)",
      // }}
    >
      <VStack spacing="2" align="center">
        <Heading id="interpret-heading" my="0" p="0" color="white">
          Interpreter of dreams
        </Heading>
        <Text
          as="h3"
          mb="2"
          my="1vh"
          fontWeight="bold"
          fontSize={30}
          color="white"
        >
          Describe your dream in a few sentences...
        </Text>
        <Textarea
          as="form"
          // all="unset"
          // type="dream"
          // height="auto"
          border="1px solid lightgray" /* Faint border */
          border-radius="4px" /* Optional: rounded corners */
          // padding="4px"
          my="2"
          p="5vh"
          color="white"
          bg="white.400/2000"
          fontSize="1.3rem"
          lineHeight="2rem"
          placeholder="eg: I had a dream that all the Northcoders staff had been replaced by ai..."
          _placeholder={{
            color: "white",
            fontStyle: "italic",
            fontWeight: "light",
            fontFamily: "frenchFell",
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
              <Text as="h4" color={!checked ? "gray.4" : "gray.400"}>
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
              <Text color={checked ? "gray.400" : "gray.4"}>Public</Text>
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
                color="white"
                bg="transparent"
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
                color="white"
                bg="transparent"
                onClick={() => handleResponseTypeChange("balanced")}
              >
                Balanced
              </Button>
            </Tooltip>
          </HStack>
        </VStack>
        <Button
          onClick={onInterpret}
          bg="transparent"
          color="white"
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
