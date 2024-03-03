import React, { useState } from 'react';
import LoginWindow from './login';
import chakraTheme from './chakraTheme';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import logo from './logo.png';

import './App.css';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react';

import renderContent from './App';
import './grid.css';
import './input_field.css';


import RenderCards from './functions/renderCards';
import './renderCards.css';

import RenderCardSets from './functions/renderCardSets';
import {
  Box,
  Text,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

function App() {

  const [webstate, setWebState] = useState('welcome'); // Corrected the state initialization
  const [logedIn, setLogedIn] = useState(false); // Corrected the state initialization

  const handleLogin = () => {
    setWebState('login'); // Corrected the state update function
  }

  const handleLoggingIn = () => {
    setWebState('logout'); // Corrected the state update function
    setLogedIn(true); // Corrected the state update function
  }

  const handleSignUp = () => {
    setWebState('signup'); // Corrected the state update function
  }

  if (webstate === 'login') {
    return (
      <div>
      <ChakraProvider>
        <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        marginLeft="20%"
        marginRight="20%"
      >
          <Text fontSize="3xl" mb={6}>
            Login to HoloFlash
          </Text>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Button
            colorScheme="teal"
            variant="solid"
            width="75%"
            mt={6}
            size="lg"
            onClick={handleLoggingIn}
          >
            Sign In
          </Button>
        </Box>
      </ChakraProvider>
    </div>
    )
  }


  if (webstate === 'signup') {
    return ( 
      <div>
      <ChakraProvider>
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        marginLeft="20%"
        marginRight="20%"
      >
          <Text fontSize="3xl" mb={6}>
            Sign Up for HoloFlash
          </Text>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="username" isRequired>
            <FormLabel>username</FormLabel>
            <Input type="username" />
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <FormControl id="confirm_password" isRequired mt={4}>
            <FormLabel>confirm password</FormLabel>
            <Input type="confirm_password" />
          </FormControl>
          <Button
            colorScheme="teal"
            variant="solid"
            width="75%"
            mt={6}
            size="lg"
            onClick={handleLoggingIn}
          >
            Sign Up
          </Button>
        </Box>
      </ChakraProvider>

      </div>
    )

  }

function RenderCardSets() {
    const cardSets = [
        {
          title: "chungus",
          cards: [
            { term: "What is the capital of France?", definition: "Paris" },
            { term: "What is the capital of Germany?", definition: "Berlin" },
            // Add more cards as needed
          ]
        },
        {
          title: "among us",
          cards: [
            { term: "What is the capital of Italy?", definition: "Rome" },
            { term: "What is the capital of Spain?", definition: "Madrid" },
            // Add more cards as needed
          ]
        },
        // Add more card sets as needed
      ];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCardSets = cardSets.filter(cardSet =>
    cardSet.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <ChakraProvider>
        <Box display="flex" justifyContent="center">
          <Input
            type="text"
            placeholder="Search Card Sets"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            size="lg"
            maxWidth="500px" // Adjust the width as needed
            background={"#c9c9c9"}
          />
        </Box>
      </ChakraProvider>
        {filteredCardSets.map((cardSet, index) => (
          <div key={index}>
            <Button colorScheme='blue'>{cardSet.title}</Button>
          </div>
        ))}
      <ChakraProvider/>
    </div>
  );
}


  return (
    <div className="App">
        <div className="title" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src={logo} alt="Logo" style={{ width: '15%', height: 'auto' }} />
          <h1 style={{ marginRight: '10px', justifyContent: 'flex-end' }}>HoloFlash</h1>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <button className="button signup-button" onClick={handleSignUp}>Signup</button>
        <button className="button login-button" onClick={handleLogin}>Login</button>
          </div>
        </div>
      <div>
        <h2>HoloFlash is an online tool to help you turn your notes or lectures into flashcards. You can practice these flashcards on the website or on the HoloLens</h2>
      </div>

      <div>

    <span style={{
      marginLeft:"5%",
      marginRight:"50%",
      fontSize: "150%",
      marginTop: "20px",

    }}>Upload your notes or lectures here</span>
    <input style={{
        width: "75%",
        height: "375px",
        textalign: "center",
        fontSize: "100px",
      }} 
      type="File" placeholder="Select File" />

        </div>

        {RenderCardSets()}

    </div>
    
);

}









export default App;
