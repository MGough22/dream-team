/** @jsxImportSource @emotion/react */

import { useContext } from "react";
import { css, ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { Container } from "@chakra-ui/react";
import DreamInterpreter from "./app-components/DreamInterpreter";
import NavBar1 from "./app-components/NavBar1";
import NavBar2 from "./app-components/NavBar2";
import UserDreamJournal from "./app-components/UserDreamJournal";
import { Navigate, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import SymbolGuide from "./app-components/SymbolGuide";
import About from "./app-components/About";
import UserSettings from "./app-components/UserSettings";
import DreamResponse from "./app-components/DreamResponse";
import { UserContext } from "./contexts/UserContext";
import PublicDreamJournal from "./app-components/PublicDreamJournal";
import Testpage from "./app-components/Testpage";
import SignUp from "./app-components/SignUp";
import LoginLogout from "./app-components/LoginLogout";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Toaster } from "./components/ui/toaster";
import DeleteAccount from "./app-components/DeleteAccount";
import RetrievedDreamResponse from "./app-components/RetrievedDreamResponse";
import { AnimatePresence } from "framer-motion";
import { PageWrapper } from "./utils/PageWrapper";

function App() {
  const { user } = useContext(UserContext);

  //find out who is currently signed-in?
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);

  const location = useLocation();

  return (
    <Container>
      <NavBar1 />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <DreamInterpreter />
              </PageWrapper>
            }
          />
          <Route
            path="/interpreter"
            element={
              <PageWrapper>
                <DreamInterpreter />
              </PageWrapper>
            }
          />
          <Route
            path={`/response`}
            element={
              <PageWrapper>
                <DreamResponse />
              </PageWrapper>
            }
          />
          <Route
            path={`/response/:dreamId`}
            element={
              <PageWrapper>
                <RetrievedDreamResponse />
              </PageWrapper>
            }
          />
          <Route
            path="/dreamjournal"
            element={
              <PageWrapper>
                <UserDreamJournal />
              </PageWrapper>
            }
          />
          <Route
            path="/publicdreamjournal"
            element={
              <PageWrapper>
                <PublicDreamJournal />
              </PageWrapper>
            }
          />
          <Route
            path="/symbolguide"
            element={
              <PageWrapper>
                <SymbolGuide />{" "}
              </PageWrapper>
            }
          />
          <Route
            path="/about"
            element={
              <PageWrapper>
                <About />{" "}
              </PageWrapper>
            }
          />
          <Route
            path="/settings"
            element={
              <PageWrapper>
                <UserSettings />
              </PageWrapper>
            }
          />
          <Route
            path="/signup"
            element={
              <PageWrapper>
                <SignUp />
              </PageWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <PageWrapper>
                <LoginLogout />
              </PageWrapper>
            }
          />
          <Route
            path="/deleteaccount"
            element={
              <PageWrapper>
                <DeleteAccount />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
      <Toaster />{" "}
      {/* Testing Toaster position to preserve Toaster state through re-render*/}
      <NavBar2 />
      {/* If you want to understand how Chakra and Emotion work, uncomment the Testpage below to see how it renders in the app - and check the Testpage component in the app-components folder. */}
      {/* <Testpage></Testpage> */}
    </Container>
  );
}

export default App;
