/** @jsxImportSource @emotion/react */

import React from 'react'
import { css, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Button, Text } from '@chakra-ui/react';
import { addDream } from '../utils/api';


//Emotion css custom reusable component, declaring a component by writing 'styled.' in front of a normal html element ie. 'styled.button'
const MyCustomButton = styled.button`
    padding: 32px;
    background-color: grey;
    font-size: 24px;
    border-radius: 4px;
    color: black;
    font-weight: bold;
    &:hover {
      color: white;
}
    @media (max-width: 768px) {
      padding: 24px;
      font-size: 20px;
      background-color: lightpink;
}
    @media (max-width: 480px) {
      padding: 16px;
      font-size: 18px;
      background-color: palevioletred;
} `;

//Emotion css API styling
const customStyle = css`
    color: white;
    background-color: #3182ce;
    padding: 1rem;
    border-radius: 8px;
`;

//Emotion css theme styling
const theme = {
  colors: {
    light: {
      background: 'hotpink',
      color: 'black',
    },
    dark: {
      background: 'darkblue',
      color: 'white',
}, },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
}, };

//Here the colour white could be dynamic 'let' variable, dependent on factors elsewhere. Then it could be used in one of the responsive components below. 
const themeDependentColour = "white"

export default function Testpage() {
  return (
    
// ThemeProvider is an Emotion wrapper, after defining a theme above we can use it to wrap the components that will use this theme. 
<ThemeProvider theme={theme}>

    {/* 'Box' and 'Button' are Chakra UI library components. As you begin typing them, intellisense autocorrects and you can click on the Chakra component and it will autoimport into the file.*/}
        <Button>
            <Text color='red'>A Button for our Dream Interpeter App using only Chakra UI components Chakra CSS styling conventions.
            </Text> 
        </Button>
      <Box css={customStyle}>
            A Box for our Dream Interpreter App using Chakra UI components and styled with Emotion CSS.
        </Box>

        {/* This div is styled with emotion from scratch and responds to defined theme and screen size changes */}
        <div
    css={(theme) => css`
      padding: 32px;
      background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      color: black;
      &:hover {
        color: ${themeDependentColour};
      }
      @media (max-width: ${theme.breakpoints.mobile}) {
            background-color: ${theme.colors.dark.background};
            color: ${theme.colors.dark.color};
            font-size: 20px;
}
      @media (max-width: ${theme.breakpoints.tablet}) and (min-width:
${theme.breakpoints.mobile}) {
            background-color: lightblue;
            color: black;
            font-size: 22px;
`}
>
    {"This box for our Dream Interpreter App is a <div> styled with Emotion only, and responds to thematic and screen size changes."}
  </div>

  {/* This custom button is a variable we defined above in this file, but it could be imported from anywhere.  */}
  <MyCustomButton>A custom reusable button styled with Emotion</MyCustomButton>
        </ThemeProvider> 




  )
}
