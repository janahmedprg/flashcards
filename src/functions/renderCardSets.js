import React, { useState } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import {
    Box,
    Text,
    Button,
    Input,
    FormControl,
    FormLabel,
  } from "@chakra-ui/react";


  function RenderCardSets({ cardSets }) {
    // const cardSets = [
    //     {
    //       title: "chungus",
    //       cards: [
    //         { term: "What is the capital of France?", definition: "Paris" },
    //         { term: "What is the capital of Germany?", definition: "Berlin" },
    //         // Add more cards as needed
    //       ]
    //     },
    //     {
    //       title: "among us",
    //       cards: [
    //         { term: "What is the capital of Italy?", definition: "Rome" },
    //         { term: "What is the capital of Spain?", definition: "Madrid" },
    //         // Add more cards as needed
    //       ]
    //     },
    //     // Add more card sets as needed
    //   ];
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

export default RenderCardSets;

