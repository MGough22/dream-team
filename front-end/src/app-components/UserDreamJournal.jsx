import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  SimpleGrid,
  Box,
  Button,
  Text,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { UserIdContext } from "../contexts/UserIdContext";
import { UsernameContext } from "../contexts/UsernameContext";
import { getUserDreams } from "../utils/api";
import UserDreamCard from "./UserDreamCard";
import { NativeSelectRoot, NativeSelectField } from "@chakra-ui/react";

export default function UserDreamJournal() {
  const { username } = useContext(UsernameContext);
  const { userId } = useContext(UserIdContext);
  const [userDreams, setUserDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dreamDeletedMessage, setDreamDeletedMessage] = useState(null);
  const [dreamDeletedError, setDreamDeletedError] = useState(null);
  const [value, setValue] = useState([]);

  useEffect(() => {
    if (userId) {
      setLoading(true);

      getUserDreams(userId)
        .then(fetchedUserDreams => {
          setLoading(false);
          return fetchedUserDreams;
        })
        .then(userDreamData => {
          setUserDreams(userDreamData);
        })
        .catch(error => {
          console.log(error, "<<<<Error in dream journal catch");
        });
    }
  }, [userId]);

  useEffect(() => {
    if (dreamDeletedError || dreamDeletedMessage) {
      setTimeout(() => {
        setDreamDeletedError(null);
        setDreamDeletedMessage(null);
      }, 1000);
    }
  }, [dreamDeletedMessage, dreamDeletedError]);

  if (loading) {
    return "Loading...";
  }
  if (!userDreams.length) {
    return "No dreams in your journal yet";
  }

  function customQuery(userId, isFavourite, value) {
    getUserDreams(userId, isFavourite, value)
      .then(queryResult => {
        setUserDreams(queryResult.length > 0 ? queryResult : prevState);
      })
      .catch(error => {
        console.log(error, "<<<< Error in customQuery catch");
      });
  }

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" width="100%">
        <Box flex="1" />
        <Heading textAlign="center" pb="4">
          Your Dream Journal
        </Heading>
        <Box flex="1" display="flex" justifyContent="flex-end">
          <NativeSelectRoot
            size="m"
            width="240px"
            border="2px solid"
            borderRadius="sm"
          >
            <NativeSelectField
              placeholder="Your readings ordered by:"
              variant="outline"
              paddingLeft="20px"
              value={value}
              onChange={e => {
                if (e.currentTarget.value !== "favourite") {
                  setValue(e.currentTarget.value);
                  customQuery(userId, false, e.currentTarget.value);
                } else {
                  setValue(e.currentTarget.value);
                  customQuery(userId, true, value);
                }
              }}
            >
              <option value="date">Newest on Top</option>
              <option value="votes">Most Votes</option>
              <option value="favourite">Favourites Only</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </Box>
      </Flex>
      <Text>{dreamDeletedMessage || dreamDeletedError}</Text>
      <SimpleGrid
        columns={4}
        gap="20px"
        minChildWidth={350}
        p="20px"
        mt="-10"
        pt="10"
        pb="12px"
      >
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
