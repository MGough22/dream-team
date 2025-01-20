import React, { useContext, useEffect, useState } from 'react'
import { Card, SimpleGrid, Box, Button, Text } from '@chakra-ui/react'
import { UserIdContext } from '../contexts/UserIdContext'
import { UsernameContext } from '../contexts/UsernameContext'
import { getUserDreams } from '../utils/api'
import UserDreamCard from './UserDreamCard'

export default function UserDreamJournal() {
  const {username} = useContext(UsernameContext)
  const {userId} = useContext(UserIdContext)
  const [userDreams, setUserDreams] = useState([])
  const [loading, setLoading] = useState(true)
  const [dreamDeletedMessage, setDreamDeletedMessage] = useState(null)
  const [dreamDeletedError, setDreamDeletedError] = useState(null)
 
  useEffect(() => {
    if (userId) {
      setLoading(true);
  
      getUserDreams(userId)
        .then((fetchedUserDreams) => {
          setLoading(false);
          return fetchedUserDreams;
        })
        .then((userDreamData) => {
          console.log(userDreamData, "<<<dreamData");
          setUserDreams(userDreamData)
        })
        .catch((error) => {
          console.log(error, "<<<<Error in dream journal catch");
        });
    }
  }, [userId]);

useEffect(()=> {
  if (dreamDeletedError || dreamDeletedMessage) {
    setTimeout(()=>{
      setDreamDeletedError(null)
      setDreamDeletedMessage(null)
    }, 1000)
  }
}, [dreamDeletedMessage, dreamDeletedError])

if (loading) {return "Loading..."}
if (!userDreams.length) {return "No dreams in your journal yet"}
  
return (
  <>
        <Text>
        {dreamDeletedMessage || dreamDeletedError}
        </Text>
    <SimpleGrid columns={4} gap="10px" minChildWidth={250} p="10px">
      {userDreams.map((currentDream)=>{
        return <UserDreamCard setUserDreams={setUserDreams} currentDream={currentDream} key={currentDream.id} setDreamDeletedError={setDreamDeletedError} setDreamDeletedMessage={setDreamDeletedMessage}/>
      })}
 </SimpleGrid>
 </>
  )
}