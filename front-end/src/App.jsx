/** @jsxImportSource @emotion/react */

import { useState } from 'react'
import { css, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Button, Container, Heading, Text} from '@chakra-ui/react';
import DreamInterpreter from './app-components/DreamInterpreter';
import NavBar1 from './app-components/NavBar1';
import NavBar2 from './app-components/NavBar2';
import UserDreamJournal from './app-components/UserDreamJournal';
import { Navigate} from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';
import SymbolGuide from './app-components/SymbolGuide';


function App() {
  
  return (
   <Container>
    <NavBar1/>
    <Routes>
      <Route path ="/" element={<Navigate to="/interpreter"/>}/>
      <Route path ="/interpreter" element={<DreamInterpreter/>}/>
      <Route path ="/:user/dreamjournal" element={<UserDreamJournal/>}/>
      <Route path ="/symbolguide" element={<SymbolGuide/>}/>
    </Routes>
   <NavBar2></NavBar2>
   {/* If you want to understand how Chakra and Emotion work, uncomment the Testpage below to see how it renders in the app - and check the Testpage component in the app-components folder. */}

   {/* <Testpage></Testpage> */}
   </Container>
  )
}

export default App
