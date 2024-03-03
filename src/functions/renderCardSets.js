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

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCardSets = cardSets ? cardSets.filter(cardSet =>
    cardSet.title.toLowerCase().includes(searchTerm.toLowerCase())
) : [];

  return (
    <div>

      <ChakraProvider>
        {cardSets.length === 0 ? 
        <><div style={{ color: "white", fontSize: "28px" }}>
            You have no current Study Sets.
          </div><div style={{ color: "white", fontSize: "28px" }}>
              Upload a file to get started!
            </div></> 
        
        : 


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
          }
        {filteredCardSets.map((cardSet, index) => (
          <div key={index}>
            <Button colorScheme='blue'>{cardSet.title}</Button>
          </div>
        ))}
      </ChakraProvider>
    </div>
  );
}

export default RenderCardSets;

