import React, { useContext, useEffect, useState } from 'react'
import { Card, SimpleGrid, Box, Button, Text } from '@chakra-ui/react'
import { UsernameContext } from '../contexts/UsernameContext'
import { UserIdContext } from '../contexts/UserIdContext'
import { getPublicDreams } from '../utils/api'
import UserDreamCard from './UserDreamCard'
import {  NativeSelectField, NativeSelectRoot,} from "../components/ui/native-select"

export default function PublicDreamJournal() {
  const {username} = useContext(UsernameContext)
  const {userId} = useContext(UserIdContext)
  const [userDreams, setUserDreams] = useState([])
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(true)
  const [dreamDeletedMessage, setDreamDeletedMessage] = useState(null)
  const [dreamDeletedError, setDreamDeletedError] = useState(null)
    
    useEffect(() => {
      if (userId) {
        setLoading(true);
    
        getPublicDreams()
          .then((fetchedPublicDreams) => {
            setLoading(false);
            return fetchedPublicDreams;
          })
          .then((publicDreamData) => {
            console.log(publicDreamData, "<<<dreamData");
            setUserDreams(publicDreamData);
          })
          .catch((error) => {
            console.log(error, "<<<<Error in dream journal catch");
          });
      }
    }, []);

    useEffect(()=> {
      if (dreamDeletedError || dreamDeletedMessage) {
        setTimeout(()=>{
          setDreamDeletedError(null)
          setDreamDeletedMessage(null)
        }, 1000)
      }
    }, [dreamDeletedMessage, dreamDeletedError])
  
  if (loading) {return "Loading..."}

  function customQuery(value) {
    getPublicDreams(value).then((filteredList) => {
      setUserDreams(filteredList)
    })
    .catch((error) => {
      console.log(error, "<<<< Error in customQuery catch")
    })
    
  }
  
  return (
    <>
        <NativeSelectRoot size="sm" width="240px">
        <NativeSelectField placeholder="Sort dreams by" variant="outline" 
             value={value}
             onChange={(e) => customQuery(e.currentTarget.value)}>
            <option value="">Newest on Top</option>
            <option value="">Favourites First</option>
            <option value="votes">Most Votes</option>
        </NativeSelectField>
    </NativeSelectRoot>
    <Text>    
            {dreamDeletedMessage || dreamDeletedError}
    </Text>
    <SimpleGrid columns={4} gap="20px" minChildWidth={350} p="20px">
          {userDreams.map((currentDream)=>{
            return <UserDreamCard setUserDreams={setUserDreams} currentDream={currentDream} key={currentDream.id} setDreamDeletedError={setDreamDeletedError} setDreamDeletedMessage={setDreamDeletedMessage}/>
          })}
     </SimpleGrid>
    
    </>
  );
}
