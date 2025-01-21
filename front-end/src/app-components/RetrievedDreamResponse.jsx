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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserIdContext } from "../contexts/UserIdContext";
import { deleteDream } from "../utils/api";
import MysticalDate from "./DateDisplay";
import VoteHandler from "./VoteHandler";

export default function RetrievedDreamResponse() {
  const { state } = useLocation();
  const { currentDream } = state;
  const { userId } = useContext(UserIdContext);
  const navigate = useNavigate();

  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
  const [deleteButtonMessage, setDeleteButtonMessage] = useState("Delete");
  const [dreamDeletedError, setDreamDeletedError] = useState(null);
  const [dreamDeletedMessage, setDreamDeletedMessage] = useState(null);

  const handleDeleteClick = () => {
    setDeleteButtonDisabled(true);
    setDeleteButtonMessage("Deleting...");

    deleteDream(currentDream.id)
      .then(() => {
        setDreamDeletedMessage("Dream successfully deleted");
        setDeleteButtonMessage("Deleted");
      })
      .catch((error) => {
        console.log(error);
        setDeleteButtonMessage("Delete failed. Try again.");
        setDreamDeletedError(
          "Dream deletion not successful (˃̣̣̥ᯅ˂̣̣̥) please try again!"
        );
        setTimeout(() => {
          setDeleteButtonMessage("Delete");
          setDeleteButtonDisabled(false);
        }, 3000);
      });
  };

  const handleReturnToJournalClick = () => {
    navigate(-1);
  };

  return (
    <Container
      as="section"
      align="center"
      bg="gray.300"
      maxW="2xl"
      my="1vh"
      p="6"
      borderRadius={8}
    >
      <VStack spacing="1" align="center">
        <Container textAlign="center" align="center" p="2">
          <Text as="h2" fonttextAlign="center" lineHeight="1.2">
            {`" ${currentDream.dreamText}"`}
          </Text>
        </Container>
        <Heading mt="0" p="0" textAlign="center">
          <MysticalDate dateString={currentDream.interpretationDate} />
        </Heading>
        <Heading as="h3" my="1vh" mb="-5" p="1" textAlign="center">
          Interpretation...
        </Heading>
        <Box p="4">
          {currentDream.interpretations ? (
            <Text textAlign="center" mt="0" as="h4">
              {currentDream.interpretations}
            </Text>
          ) : (
            <SkeletonText noOfLines={3} gap="4" />
          )}
        </Box>
        <HStack gap="3" p="1rem">
          {userId === currentDream.userId ? (
            <>
              <Button
                size="sm"
                color="black"
                onClick={handleDeleteClick}
                disabled={deleteButtonDisabled}
              >
                {deleteButtonMessage}
              </Button>
              <Button size="sm" color="black">
                Favourite
              </Button>
            </>
          ) : null}
          {deleteButtonMessage === "Deleted" ? (
            <Button
              size="sm"
              color="black"
              onClick={handleReturnToJournalClick}
            >
              Return to Journal
            </Button>
          ) : null}
        </HStack>
      </VStack>
      <VoteHandler currentDream={currentDream} />
    </Container>
  );
}
