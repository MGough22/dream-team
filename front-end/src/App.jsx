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
import DeleteAccount from './app-components/DeleteAccount';

function App() {
  const {user} = useContext(UserContext)

  //find out who is currently signed-in?
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          console.log("uid", uid)
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
        }
      });

}, [])
  
  return (
   <Container>
    <NavBar1/>
    <Routes>
      <Route path ="/" element={<Navigate to="/interpreter"/>}/>
      <Route path ="/interpreter" element={<DreamInterpreter/>}/>
      <Route path ={`/response`} element={<DreamResponse/>}/>
      <Route path ="/dreamjournal" element={<UserDreamJournal/>}/>
      <Route path ="/publicdreamjournal" element={<PublicDreamJournal/>}/>
      <Route path ="/symbolguide" element={<SymbolGuide/>}/>
      <Route path ="/about" element={<About/>}/>
      <Route path ="/settings" element={<UserSettings/>}/>
      <Route path ="/signup" element={<SignUp/>}/>
      <Route path ="/login" element={<LoginLogout/>}/>
      <Route path ="/deleteaccount" element={<DeleteAccount/>}/>

    </Routes>
   <NavBar2></NavBar2>
   {/* If you want to understand how Chakra and Emotion work, uncomment the Testpage below to see how it renders in the app - and check the Testpage component in the app-components folder. */}

   {/* <Testpage></Testpage> */}
   </Container>
  )
}

export default App
