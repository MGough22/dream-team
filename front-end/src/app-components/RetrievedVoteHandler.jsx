import { HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { updateDreamVotes } from "../utils/api";

export default function RetrievedVoteHandler({ currentDream, voteHappened }) {
  const [localVotes, setLocalVotes] = useState(0);
  const [voteError, setVoteError] = useState(null);
  const [upDisabled, setUpDisabled] = useState(false);
  const [downDisabled, setDownDisabled] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  const thankYouMessage = () => {
    setShowThankYouMessage(true);
  };

  const handleClickUp = () => {
    if (upDisabled) return;
    setLocalVotes(prevVotes => prevVotes + 1);
    localVotes === -1 || 0 ? setUpDisabled(false) : setUpDisabled(true);
    setDownDisabled(false);
    setVoteError(null);
    setShowThankYouMessage(true);
    setTimeout(() => {
      setShowThankYouMessage(false);
    }, 3000);
    localVotes === -1
      ? updateDreamVotes(currentDream.id, localVotes + 2)
      : updateDreamVotes(currentDream.id, localVotes + 1).catch(() => {
          setLocalVotes(prevVotes => prevVotes - 1);
          setVoteError("Your vote was not successful (˃̣̣̥ᯅ˂̣̣̥) please try again!");
          setUpDisabled(false);
        });
  };

  const handleClickDown = () => {
    if (downDisabled) return;
    setLocalVotes(prevVotes => prevVotes - 1);
    localVotes === 1 || 0 ? setDownDisabled(false) : setDownDisabled(true);
    setUpDisabled(false);
    setVoteError(null);
    setShowThankYouMessage(true);
    setTimeout(() => {
      setShowThankYouMessage(false);
    }, 3000);
    localVotes === 1
      ? updateDreamVotes(currentDream.id, localVotes - 2)
      : updateDreamVotes(currentDream.id, localVotes - 1).catch(() => {
          setLocalVotes(prevVotes => prevVotes + 1);
          setVoteError("Your vote was not successful (˃̣̣̥ᯅ˂̣̣̥) please try again!");
          setDownDisabled(false);
        });
  };

  return (
    <HStack>
      <Text
        color={upDisabled ? "green" : null}
        disable={upDisabled}
        onClick={handleClickUp}
        cursor={upDisabled ? "not-allowed" : "pointer"}
        fontSize="3xl"
      >
        ⇞
      </Text>
      <Text
        fontWeight="bold"
        fontSize="xl"
        color={
          `${currentDream.votes + localVotes + voteHappened}` >= 1
            ? "green"
            : `${currentDream.votes + localVotes + voteHappened}` < 0
            ? "red"
            : "black"
        }
      >
        {`${currentDream.votes + localVotes + voteHappened}`}
      </Text>
      <Text
        color={downDisabled ? "red" : null}
        disable={downDisabled}
        onClick={handleClickDown}
        cursor={downDisabled ? "not-allowed" : "pointer"}
        fontSize="3xl"
      >
        ⇟
      </Text>
      {voteError ? <Text>{voteError}</Text> : null}
      {showThankYouMessage ? <Text>Thank you for voting</Text> : null}
    </HStack>
  );
}
