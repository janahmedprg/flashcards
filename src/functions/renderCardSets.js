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

import Study from '../components/study';

function RenderCardSets({ cardSets }) {

  const [searchTerm, setSearchTerm] = useState('');




  const filteredCardSets = cardSets ? cardSets.filter(cardSet =>
    cardSet.set_title && cardSet.set_set_title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];



  const handleStudy = (cardSet) => {
    console.log('study', cardSet);
    Study(cardSet);
  }



  return (
    <div>
      {cardSets.length === 0 ? <h1>No card sets found</h1> : 
      <ChakraProvider>

        <Box display="flex" justifyContent="center">
          <Input
              style = {{
                width: "50%",
                height: "50px",
                fontSize: "150%",
                color: 'white',
                borderWidth: "3px", // Adjust the border width
                borderStyle: "solid", // Ensure border style is solid
                borderRadius: "5px", // Add border radius if desired
                borderColor: "white" // Set border color
            }}
            type="text"
            placeholder="Search Card Sets"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            size="lg"
            maxWidth="500px" // Adjust the width as needed
            background={"#c9c9c9"}
            color = {'white'}
          />
        </Box>
        {filteredCardSets.map((cardSet, index) => (
          <div key={index}>
            <Button onClick={handleStudy(cardSet)} colorScheme='blue'>{cardSet.set_title}</Button>
          </div>
        ))} 
      </ChakraProvider>
}
    </div>
  );
}

export default RenderCardSets;

