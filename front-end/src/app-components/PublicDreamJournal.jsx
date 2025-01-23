import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  SimpleGrid,
  Box,
  Button,
  Text,
  Heading,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { UsernameContext } from "../contexts/UsernameContext";
import { UserIdContext } from "../contexts/UserIdContext";
import { getPublicDreams } from "../utils/api";
import UserDreamCard from "./UserDreamCard";
import { LoadingAnimation } from "./LoadingAnimation";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../components/ui/native-select";

export default function PublicDreamJournal() {
  const { username } = useContext(UsernameContext);
  const { userId } = useContext(UserIdContext);
  const [userDreams, setUserDreams] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [dreamDeletedMessage, setDreamDeletedMessage] = useState(null);
  const [dreamDeletedError, setDreamDeletedError] = useState(null);

  useEffect(() => {
    if (userId) {
      setLoading(true);

      getPublicDreams()
        .then(fetchedPublicDreams => {
          setLoading(false);
          return fetchedPublicDreams;
        })
        .then(publicDreamData => {
          setUserDreams(publicDreamData);
        })
        .catch(error => {
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

  function customQuery(value) {
    getPublicDreams(value)
      .then(filteredList => {
        setUserDreams(filteredList);
      })
      .catch(error => {
        console.log(error, "<<<< Error in customQuery catch");
      });
  }

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" width="100%">
        <Box flex="1" />
        <Heading textAlign="center">Public Dreams</Heading>
        <Box flex="1" display="flex" justifyContent="flex-end">
          <NativeSelectRoot
            size="m"
            width="240px"
            border="2px solid"
            borderRadius="sm"
          >
            <NativeSelectField
              placeholder="Readings sorted by:"
              variant="outline"
              paddingLeft="20px"
              value={value}
              onChange={e => {
                setValue(e.currentTarget.value);
                customQuery(e.currentTarget.value);
              }}
            >
              <option value="date">Newest on Top</option>
              <option value="votes">Most Votes</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </Box>
      </Flex>
      <Text>{dreamDeletedMessage || dreamDeletedError}</Text>
      <SimpleGrid columns={4} gap="20px" minChildWidth={350} p="20px">
        {userDreams.map(currentDream => {
          return (
            <UserDreamCard
              setUserDreams={setUserDreams}
              currentDream={currentDream}
              key={currentDream.id}
              setDreamDeletedError={setDreamDeletedError}
              setDreamDeletedMessage={setDreamDeletedMessage}
            />
          );
        })}
      </SimpleGrid>
    </>
  );
}
