/** @jsxImportSource @emotion/react */

import { useContext } from 'react'
import { css, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import {Container} from '@chakra-ui/react';
import DreamInterpreter from './app-components/DreamInterpreter';
import NavBar1 from './app-components/NavBar1';
import NavBar2 from './app-components/NavBar2';
import UserDreamJournal from './app-components/UserDreamJournal';
import { Navigate} from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';
import SymbolGuide from './app-components/SymbolGuide';
import About from './app-components/About';
import UserSettings from './app-components/UserSettings';
import DreamResponse from './app-components/DreamResponse';
import { UserContext } from './contexts/UserContext';
import PublicDreamJournal from './app-components/PublicDreamJournal';
import Testpage from './app-components/Testpage'
import SignUp from './app-components/SignUp';
import LoginLogout from './app-components/LoginLogout';
import React, {useState, useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { Toaster } from './components/ui/toaster';

function App() {
  const {user} = useContext(UserContext)
  
  return (
   <Container>
    <NavBar1/>
    <Routes>
      <Route path ="/" element={<Navigate to="/interpreter"/>}/>
      <Route path ="/interpreter" element={<DreamInterpreter/>}/>
      <Route path ={`/${user}/response/:parametric-response-key`} element={<DreamResponse/>}/>
      <Route path ="/:user/dreamjournal" element={<UserDreamJournal/>}/>
      <Route path ="/publicdreamjournal" element={<PublicDreamJournal/>}/>
      <Route path ="/symbolguide" element={<SymbolGuide/>}/>
      <Route path ="/about" element={<About/>}/>
      <Route path ="/:user/settings" element={<UserSettings/>}/>
      <Route path ="/signup" element={<SignUp/>}/>
      <Route path ="/login" element={<LoginLogout/>}/>

    </Routes>
    <Toaster />       {/* Testing Toaster position to preserve Toaster state through re-render*/}
   <NavBar2></NavBar2>
   {/* If you want to understand how Chakra and Emotion work, uncomment the Testpage below to see how it renders in the app - and check the Testpage component in the app-components folder. */}

   {/* <Testpage></Testpage> */}
   </Container>
  )
}

export default App
