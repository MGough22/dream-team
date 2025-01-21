import { Box, Button, Card, HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserIdContext } from "../contexts/UserIdContext";
import { useContext } from "react";
import { deleteDream } from "../utils/api";
import MysticalDate from "./DateDisplay";
import VoteHandler from "./VoteHandler";

export default function UserDreamCard({
  currentDream,
  setUserDreams,
  setDreamDeletedMessage,
  setDreamDeletedError,
}) {
  const { userId } = useContext(UserIdContext);
  const navigate = useNavigate();
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
  const [deleteButtonMessage, setDeletebuttonMessage] = useState("Delete");

  const onViewDream = (e) => {
    e.preventDefault();
    navigate(`/response/${currentDream.id}`, { state: { currentDream } });
  };

  const handleDeleteClick = () => {
    setDeleteButtonDisabled(true);
    setDeletebuttonMessage("Deleting...");

    deleteDream(currentDream.id)
      .then(() => {
        setUserDreams((dreams) =>
          dreams.filter((dream) => dream.id !== currentDream.id)
        );
        setDreamDeletedMessage("Dream successfully deleted");
        setDeleteButtonDisabled(false);
      })
      .catch((error) => {
        console.log(error, "err in dreamcard delete catch");
        setDeletebuttonMessage("Delete failed. Try again.");
        setDreamDeletedError(
          "Dream deletion not successful (˃̣̣̥ᯅ˂̣̣̥) please try again!"
        );
        setTimeout(() => {
          setDeletebuttonMessage("Delete");
          setDeleteButtonDisabled(false);
        }, 3000);
      });
  };

  return (
    <>
      <Box
        bg="white"
        border="1px solid"
        p="5"
        textAlign="center"
        width="100%"
        maxW="600px"
        mx="auto"
        borderRadius="md"
        display="flex"
        flexDirection="column"
        minHeight="450px"
      >
        <Card.Root
          width="auto"
          variant="unstyled"
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <Box flex="1">
            <Card.Title mb="2" textAlign="center">
              <b>A dream about:</b> {currentDream.dreamText}
            </Card.Title>
            <Card.Description textAlign="center" fontSize="2">
              <b fontSize="2"> Interpretation:</b>
              {currentDream.interpretations}
            </Card.Description>
          </Box>
          <Box mt="4" mb="2">
            {/* <b> Dreamt on:</b> {currentDream.interpretationDate} */}
            <MysticalDate dateString={currentDream.interpretationDate} />
          </Box>
          <Card.Footer justifyContent="center" mt="auto">
            <HStack spacing={4} flexWrap="wrap" justifyContent="center">
              <Button variant="outline" onClick={onViewDream}>
                View
              </Button>
              {userId === currentDream.userId ? (
                <Button
                  variant="outline"
                  onClick={handleDeleteClick}
                  disabled={deleteButtonDisabled}
                >
                  {deleteButtonMessage}
                </Button>
              ) : null}
              <Button variant="outline">Favourite</Button>
            </HStack>
          </Card.Footer>
          <VoteHandler currentDream={currentDream}/>
        </Card.Root>
      </Box>
    </>
  );
}
