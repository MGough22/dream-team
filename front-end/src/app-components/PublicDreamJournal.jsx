import React, { useContext, useEffect, useState } from "react";
import { Card, SimpleGrid, Box, Button, Text, Heading } from "@chakra-ui/react";
import { UsernameContext } from "../contexts/UsernameContext";
import { UserIdContext } from "../contexts/UserIdContext";
import { getPublicDreams } from "../utils/api";
import UserDreamCard from "./UserDreamCard";
import { LoadingAnimation } from "./LoadingAnimation";

export default function PublicDreamJournal() {
  const { username } = useContext(UsernameContext);
  const { userId } = useContext(UserIdContext);
  const [userDreams, setUserDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dreamDeletedMessage, setDreamDeletedMessage] = useState(null);
  const [dreamDeletedError, setDreamDeletedError] = useState(null);

  useEffect(() => {
    if (userId) {
      setLoading(true);

      getPublicDreams()
        .then((fetchedPublicDreams) => {
          setLoading(false);
          return fetchedPublicDreams;
        })
        .then((publicDreamData) => {
          setUserDreams(publicDreamData);
        })
        .catch((error) => {
          console.log(error, "<<<<Error in dream journal catch");
        });
    }
  }, []);

  useEffect(() => {
    if (dreamDeletedError || dreamDeletedMessage) {
      setTimeout(() => {
        setDreamDeletedError(null);
        setDreamDeletedMessage(null);
      }, 1000);
    }
  }, [dreamDeletedMessage, dreamDeletedError]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="1vh"
      >
        <LoadingAnimation />
      </Box>
    );
  }
  return (
    <>
      <Text>{dreamDeletedMessage || dreamDeletedError}</Text>
      <Heading as="h2" textAlign="center">
        {" "}
        Public Dreams{" "}
      </Heading>
      <SimpleGrid columns={4} gap="20px" minChildWidth={350} p="20px">
        {userDreams.map((currentDream) => {
          return (
            <UserDreamCard
              setUserDreams={setUserDreams}
              currentDream={currentDream}
              key={currentDream.id}
              setDreamDeletedError={setDreamDeletedError}
              setDreamDeletedMessage={setDreamDeletedMessage}
              isPublic={true}
            />
          );
        })}
      </SimpleGrid>
    </>
  );
}
