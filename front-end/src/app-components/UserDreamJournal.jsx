import React, { useContext, useEffect, useState } from 'react'
import { Card, SimpleGrid, Box, Button } from '@chakra-ui/react'
import { UserIdContext } from '../contexts/UserIdContext'
import { UsernameContext } from '../contexts/UsernameContext'
import { getUserDreams } from '../utils/api'
import UserDreamCard from './UserDreamCard'

export default function UserDreamJournal() {
  const {username} = useContext(UsernameContext)
  const {userId} = useContext(UserIdContext)
  const [userDreams, setUserDreams] = useState([])
  const [loading, setLoading] = useState(true)
  
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
          setUserDreams(userDreamData);
        })
        .catch((error) => {
          console.log(error, "<<<<Error in dream journal catch");
        });
    }
  }, [userId]);

if (loading) {return "Loading..."}

  return (
    <SimpleGrid columns={4} gap="10px" minChildWidth={250} p="10px">
      {userDreams.map((currentDream)=>{
        return <UserDreamCard currentDream={currentDream} key={currentDream.id}/>
      })}
 </SimpleGrid>
  )
}