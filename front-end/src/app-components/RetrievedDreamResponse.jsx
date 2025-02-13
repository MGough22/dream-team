import {
  Button,
  Container,
  Heading,
  HStack,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserIdContext } from "../contexts/UserIdContext";
import {
  deleteDream,
  updatePublicStatus,
  updateFavouriteStatus,
} from "../utils/api";
import MysticalDate from "./DateDisplay";
import DropCap from "./DropCap";
import RetrievedVoteHandler from "./RetrievedVoteHandler";

export default function RetrievedDreamResponse() {
  const { state } = useLocation();
  const { currentDream, voteHappened } = state;
  const { userId } = useContext(UserIdContext);
  const navigate = useNavigate();

  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
  const [deleteButtonMessage, setDeleteButtonMessage] = useState("Delete");
  const [dreamDeletedError, setDreamDeletedError] = useState(null);
  const [dreamDeletedMessage, setDreamDeletedMessage] = useState(null);

  const [localIsPublic, setLocalIsPublic] = useState(false);
  const [isPublicButtonDisabled, setIsPublicButtonDisabled] = useState(false);
  const [isPublicMessage, setIsPublicMessage] = useState("");

  const [currentDreamFavState, setcurrentDreamFavState] = useState(
    currentDream.isFavourited
  );

  const handleDeleteClick = () => {
    setDeleteButtonDisabled(true);
    setDeleteButtonMessage("Deleting...");

    deleteDream(currentDream.id)
      .then(() => {
        setDreamDeletedMessage("Dream successfully deleted");
        setDeleteButtonMessage("Deleted");
      })
      .catch(error => {
        console.log(error);
        setDeleteButtonMessage("Delete failed. Try again.");
        setDreamDeletedError(
          "Dream deletion not successful (˃̣̣̥ᯅ˂̣̣̥) please try again!"
        );
        setDeleteButtonDisabled(false);
        setTimeout(() => {
          setDeleteButtonMessage("Delete");
        }, 3000);
      });
  };

  const handleReturnToJournalClick = () => {
    navigate(-1);
  };

  const handlePublishToPublic = () => {
    setIsPublicButtonDisabled(true);
    setLocalIsPublic(true);
    updatePublicStatus(currentDream.id, true)
      .then(() => {
        setIsPublicMessage("Dream published!");
        setTimeout(() => {
          setIsPublicMessage("");
        }, 3000);
      })
      .catch(error => {
        console.log(error, "error in public update catch");
      });
  };

  const handleFavouriteClick = () => {
    const newFavouriteStatus = !currentDreamFavState;
    setcurrentDreamFavState(newFavouriteStatus);
    updateFavouriteStatus(currentDream.id, newFavouriteStatus)
      .then(() => {
        currentDream.isFavourited = newFavouriteStatus;
      })
      .catch(error => {
        console.log("Error updating favourite status: ", error);
        setIsFavourited(!newFavouriteStatus);
      });
  };

  return (
    <Container
      key={currentDream.id}
      as="section"
      align="center"
      maxW="2xl"
      my="1vh"
      p="6"
      borderRadius={8}
      bg="gray.400/20"
      backdropFilter="blur(7px)"
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
        <Heading as="h3" my="1vh" mb="-3" p="1" textAlign="center">
          Interpretation...
        </Heading>
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
            {currentDream.interpretations}
          </DropCap>
        </Box>

        <HStack gap="3" p="1rem">
          {userId === currentDream.userId && (
            <>
              <Button
                size="sm"
                color="black"
                onClick={handleDeleteClick}
                disabled={deleteButtonDisabled}
              >
                {deleteButtonMessage}
              </Button>
              {!deleteButtonDisabled && (
                <Button size="sm" color="black" onClick={handleFavouriteClick}>
                  {currentDreamFavState ? "Unfavourite" : "Favourite"}
                </Button>
              )}
            </>
          )}
          {!currentDream.isPublic &&
            !localIsPublic &&
            deleteButtonMessage === "Delete" && (
              <Button
                size="sm"
                color="black"
                disabled={isPublicButtonDisabled}
                onClick={handlePublishToPublic}
              >
                Publish to public
              </Button>
            )}
          {deleteButtonMessage === "Deleted" && (
            <Button
              size="sm"
              color="black"
              onClick={handleReturnToJournalClick}
            >
              Return to Journal
            </Button>
          )}
        </HStack>
        {localIsPublic && <Text>{isPublicMessage}</Text>}
        <RetrievedVoteHandler
          currentDream={currentDream}
          voteHappened={voteHappened}
          userId={userId}
        />
      </VStack>
    </Container>
  );
}
