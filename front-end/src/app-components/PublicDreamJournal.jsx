import React, { useContext, useEffect, useState } from 'react'
import { Card, SimpleGrid, Box, Button } from '@chakra-ui/react'
import { UsernameContext } from '../contexts/UsernameContext'
import { UserIdContext } from '../contexts/UserIdContext'
import { getPublicDreams } from '../utils/api'
import UserDreamCard from './UserDreamCard'

export default function PublicDreamJournal() {
  const {username} = useContext(UsernameContext)
  const {userId} = useContext(UserIdContext)
  const [userDreams, setUserDreams] = useState([])
  const [loading, setLoading] = useState(true)
    
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
  
  if (loading) {return "Loading..."}
  
  
  return (
    <>
    <SimpleGrid columns={4} gap="10px" minChildWidth={250} p="10px">
          {userDreams.map((currentDream)=>{
            return <UserDreamCard currentDream={currentDream} key={currentDream.id}/>
          })}
     </SimpleGrid>
    
    </>
  )
}










//     <SimpleGrid columns={4} gap="10px" minChildWidth={250} p="10px">
//         <Box bg="white" border="1px solid">
//         <Card.Root width="auto" >
//                   <Card.Title mb="2">Dream 1</Card.Title>
//                   <Card.Description>
//                     Public submitted dream description
//                   </Card.Description>
//                 <Card.Footer justifyContent="flex-end">
//                   <Button variant="outline">View</Button>
//                   <Button variant="outline">Favourite</Button>
//                 </Card.Footer>
//               </Card.Root>
//         </Box>
//         <Box bg="white" border="1px solid">
//         <Card.Root width="auto" >
//                   <Card.Title mb="2">Dream 2</Card.Title>
//                   <Card.Description>
//                   Public submitted dream description
//                   </Card.Description>
//                 <Card.Footer justifyContent="flex-end">
//                   <Button variant="outline">View</Button>
//                   <Button variant="outline">Favourite</Button>
//                 </Card.Footer>
//               </Card.Root>
//         </Box>
//         <Box bg="white" border="1px solid">
//         <Card.Root width="auto" >
//                   <Card.Title mb="2">Dream 3</Card.Title>
//                   <Card.Description>
//                   Public submitted dream description
//                   </Card.Description>
//                 <Card.Footer justifyContent="flex-end">
//                   <Button variant="outline">View</Button>
//                   <Button variant="outline">Favourite</Button>
//                 </Card.Footer>
//               </Card.Root>
//         </Box>
//         <Box bg="white" border="1px solid">
//         <Card.Root width="auto" >
//                   <Card.Title mb="2">Dream 4</Card.Title>
//                   <Card.Description>
//                     User submitted dream description
//                   </Card.Description>
//                 <Card.Footer justifyContent="flex-end">
//                   <Button variant="outline">View</Button>
//                   <Button variant="outline">Delete</Button>
//                   <Button variant="outline">Favourite</Button>
//                 </Card.Footer>
//               </Card.Root>
//         </Box>
        
//      </SimpleGrid>
//   )
// }
