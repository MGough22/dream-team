import {
  Button,
  Container,
  Heading,
  HStack,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";
// import { SkeletonText } from "../components/ui/skeleton";
// import { Blockquote } from "../components/ui/blockquote";
import { Tooltip } from "../components/ui/tooltip";
import { Switch } from "../components/ui/switch";
import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { addDream } from "../utils/api";
import { UserIdContext } from "../contexts/UserIdContext";
import { fetchDreamResponse } from "../utils/nidra-api";
// import MysticalDate from "./DateDisplay";
import { LoadingAnimation } from "./LoadingAnimation";
import DropCap from "./DropCap";

export default function DreamResponse() {
  const { state } = useLocation();
  const { dream, isPublic, responseType, altResponse } = state;
  const [interpretation, setInterpretation] = useState("");
  const [currentResponseType, setCurrentResponseType] = useState(responseType);
  const { user } = useContext(UserContext);
  const { userId } = useContext(UserIdContext);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  // Experiment
  const [localIsPublic, setLocalIsPublic] = useState(isPublic);

  //  Defines which response type to render
  const responseTypeDisplay = {
    jungianMystic: "Mystic",
    balanced: "balanced",
  };

  useEffect(() => {
    let isMounted = true;
    const fetchDream = async () => {
      if (dream) {
        setLoading(true);
        try {
          const dreamResponse = await fetchDreamResponse(
            dream,
            currentResponseType
          );
          if (isMounted) {
            console.log(dreamResponse, "<--dream response from fetch ");
            setInterpretation(dreamResponse);
          }
        } catch (error) {
          if (isMounted) {
            console.log(error, "<<<<Error in dream response catch");
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }
    };

    fetchDream();

    return () => {
      isMounted = false;
    };
  }, [dream, currentResponseType]);

  const handleSaveDream = () => {
    addDream(
      userId,
      null,
      dream,
      interpretation,
      null,
      localIsPublic,
      // isPublic,
      null,
      isFavorited
    )
      .then(() => {
        setIsSaved(true);
      })
      .catch((error) => {
        console.log(error, "<<error saving dream");
      });
  };

  const handleFavorite = () => {
    setIsFavorited(true);
  };

  const getAlternateResponseType = (currentType) => {
    return currentType === "jungianMystic" ? "balanced" : "jungianMystic";
  };

  const handleAltResponse = () => {
    setLoading(true);
    setCurrentResponseType(getAlternateResponseType(currentResponseType));
    setIsSaved(false);
    setIsFavorited(false);
  };

  return (
    <Container
      as="section"
      align="center"
      bg="gray.300"
      maxW="2xl"
      my="2vh"
      p="5vh"
      borderRadius={10}
      // mb="2"
    >
      <VStack spacing="1" align="center">
        <Heading
          // id="interpret-heading"
          // my="1vh"
          mt="0"
          mb="-4"
          p="0"
          textAlign="center"
          as="h3"
          fontSize={30}
        >
          Your submitted dream...
        </Heading>
        <Container p="2" textAlign="center" align="center">
          <Text as="h2" textAlign="center" fontSize={30} lineHeight="1.2">
            "{dream}"
          </Text>
        </Container>
        <Heading my="1vh" mb="-2" p="1" as="h3" fontSize={30}>
          {loading ? "Fetching" : "Your"}{" "}
          {responseTypeDisplay[currentResponseType]} interpretation...
        </Heading>
        <Box p="0">
          {loading ? (
            <LoadingAnimation />
          ) : interpretation ? (
            <Box textAlign="left" mt="0" px="4">
              <DropCap
                color="inherit"
                dropCapStyle={{
                  fontWeight: "500",
                }}
                containerStyle={{
                  width: "4.5rem",
                  height: "4rem",
                }}
              >
                {interpretation}
              </DropCap>
            </Box>
          ) : // <Text textAlign="center" mt="0">
          //   {interpretation}
          // </Text>
          null}
        </Box>
        {!loading && (
          <>
            <VStack align="center" mb="4" mt="0">
              <Text as="h3">Make dream public?</Text>
              <HStack spacing="3">
                <Tooltip content="Your dream will be viewable only to you">
                  <Text as="h4" color={!localIsPublic ? "black" : "gray.400"}>
                    Private
                  </Text>
                </Tooltip>
                <Switch
                  checked={localIsPublic}
                  onCheckedChange={(e) => setLocalIsPublic(e.checked)}
                  size="lg"
                />
                <Tooltip content="Your dream will remain anonymous but viewable to the public">
                  <Text color={localIsPublic ? "black" : "gray.400"}>
                    Public
                  </Text>
                </Tooltip>
              </HStack>
            </VStack>

            <HStack gap="3" p="1rem">
              <Button
                size="sm"
                color="black"
                onClick={handleSaveDream}
                disabled={user === "Guest" || isSaved}
              >
                {user === "Guest"
                  ? "Log in to save dream"
                  : isSaved
                  ? "Dream Saved!"
                  : localIsPublic
                  ? "Save to journal & make public"
                  : "Save to journal"}
              </Button>
              <Button
                variant="outline"
                onClick={handleFavorite}
                disabled={isFavorited}
              >
                {isFavorited ? "Added to Favorites" : "Favourite"}
              </Button>
            </HStack>
          </>
        )}
        <Button
          color="black"
          size="xl"
          mx="auto"
          display="block"
          m="0"
          onClick={handleAltResponse}
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : `Try a ${
                responseTypeDisplay[
                  getAlternateResponseType(currentResponseType)
                ]
              } interpretation`}
        </Button>
      </VStack>
    </Container>
  );
}
