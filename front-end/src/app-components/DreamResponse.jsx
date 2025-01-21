import {
  Button,
  Container,
  Heading,
  HStack,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { SkeletonText } from "../components/ui/skeleton";
import { Blockquote } from "../components/ui/blockquote";
import React, { useState, useContext } from "react";
// import { Tag } from "../components/ui/tag";
// import { Avatar } from "../components/ui/avatar";
// import suncross from "../assets/dream-tag-symbols/sun-cross.png";
// import treeoflife from "../assets/dream-tag-symbols/tree-of-life.png";
// import maze from "../assets/dream-tag-symbols/maze.png";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { addDream } from "../utils/api";
import { UserIdContext } from "../contexts/UserIdContext";
import { fetchDreamResponse } from "../utils/nidra-api";
import MysticalDate from "./DateDisplay";

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

  //  Defines which response type to render
  const responseTypeDisplay = {
    jungianMystic: "Jungian Mystic",
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
    addDream(userId, null, dream, interpretation, null, isPublic, null, null)
      .then(() => {
        setIsSaved(true);
      })
      .catch(error => {
        console.log(error, "<<error saving dream");
      });
  };

  const handleFavorite = () => {
    setIsFavorited(true);
  };

  const getAlternateResponseType = currentType => {
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
      my="5vh"
      p="5vh"
    >
      <VStack spacing="1" align="center">
        <Heading
          // id="interpret-heading"
          my="1vh"
          mt="0"
          p="0"
          textAlign="center"
          as="h3"
          fontSize={30}
        >
          Your submitted dream...
        </Heading>
        <Container p="2" textAlign="center" align="center">
          <Text as="h2" textAlign="center" fontSize={30}>
            "{dream}"
          </Text>
        </Container>
        <Heading my="1vh" mb="-4" p="1" as="h3" fontSize={30}>
          {`Your ${responseTypeDisplay[currentResponseType]} interpretation...`}
        </Heading>
        <Box p="4">
          {interpretation ? (
            <Text textAlign="center" mt="0">
              {interpretation}
            </Text>
          ) : (
            <SkeletonText noOfLines={3} gap="4" />
          )}
        </Box>
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
              : isPublic
              ? "Save to journal and publish to public"
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
