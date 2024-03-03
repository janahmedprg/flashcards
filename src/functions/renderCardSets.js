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

//import Study from '../components/study';
import RenderCards from './renderCards';


function RenderCardSets({ cardSets }) {





  // const handleStudy = (cardSet) => {
  //   console.log('study', cardSet);
  //   Study(cardSet);
  // }


  return (
    <div>
      {cardSets.length === 0 ? <h1>No card sets found</h1> : 
      <ChakraProvider>
        {cardSets.map((cardSet, index) => (
          <div key={index}>
            <Button  colorScheme='blue'>{cardSet.set_name}</Button>
          </div>
        ))} 
      </ChakraProvider>
}
    </div>
  );
}

export default RenderCardSets;

