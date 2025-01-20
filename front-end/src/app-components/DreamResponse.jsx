import {
  Button,
  Container,
  Heading,
  HStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { SkeletonText } from "../components/ui/skeleton";
import { Blockquote } from "../components/ui/blockquote";
import React, { useState, useContext } from "react";
import { Tag } from "../components/ui/tag";
import { Avatar } from "../components/ui/avatar";
import suncross from "../assets/dream-tag-symbols/sun-cross.png";
import treeoflife from "../assets/dream-tag-symbols/tree-of-life.png";
import maze from "../assets/dream-tag-symbols/maze.png";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { addDream } from "../utils/api";
import { UserIdContext } from "../contexts/UserIdContext";
import { fetchDreamResponse } from "../utils/nidra-api";

export default function DreamResponse() {
  const { state } = useLocation();
  const { dream, isPublic, responseType } = state;
  const [interpretation, setInterpretation] = useState("");
  const { user } = useContext(UserContext);
  const { userId } = useContext(UserIdContext);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Mock API call
  //   if (dream) {
  //     setTimeout(() => {
  //       setInterpretation(`Your dream might signify transformation and growth.`)
  //     }, 2000) // Simulate API delay
  //   }
  // }, [dream])

  useEffect(() => {
    if (dream) {
      setLoading(true);

      fetchDreamResponse(dream, responseType)
        .then((dreamResponse) => {
          setLoading(false);
          console.log(dreamResponse, "<--dream response from fetch ");
          setInterpretation(dreamResponse);
          return dreamResponse;
        })
        // .then((responseData) => {
        //   console.log(responseData, "<<<second block");
        // })
        .catch((error) => {
          console.log(error, "<<<<Error in dream response catch");
        });
    }
  }, []);

  if (loading) {
    return "Loading...";
  }

  const handleSaveDream = () => {
    addDream(userId, dream, interpretation, null, isPublic, null)
      .then(() => {})
      .catch((error) => {
        console.log(error, "<<error saving dream");
      });
  };

  return (
    <Container as="section" bg="gray.300" maxW="lg" my="5vh" p="5vh">
      <Heading my="1vh" p="1vh">
        Your submitted dream...
      </Heading>
      <Container bg="white" p="10vh">
        <Blockquote>{dream}</Blockquote>
      </Container>
      <Heading my="1vh" p="1vh">
        Your interpretation...
      </Heading>
      <Box p="5vh">
        {interpretation ? (
          <Text>{interpretation}</Text>
        ) : (
          <SkeletonText noOfLines={3} gap="4" />
        )}
      </Box>
      <HStack gap="3" p="1vh">
        <Tag startElement={<Avatar size="full" src={suncross} />}>
          Nightmare
        </Tag>
        <Tag startElement={<Avatar size="full" src={treeoflife} />}>
          Life-cycles
        </Tag>
        <Tag startElement={<Avatar size="full" src={maze} />}>Confusion</Tag>
      </HStack>
      <HStack gap="3" p="1rem">
        <Button
          size="sm"
          color="black"
          onClick={handleSaveDream}
          disabled={user === "Guest"}
        >
          {user === "Guest"
            ? "Log in to save dream"
            : isPublic
            ? "Save to journal and publish to public"
            : "Save to journal"}
        </Button>
        <Button size="sm" color="black">
          Favourite
        </Button>
      </HStack>
      <Button color="black" size="xl" mx="auto" display="block" m="3vh">
        Interpret again???
      </Button>
    </Container>
  );
}
