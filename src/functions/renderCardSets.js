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

export function RenderCards({ cards }) {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
  
    const handleNextCard = () => {
      setIsFlipped(false); // Reset flip state before moving to the next card
  
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        setCurrentCardIndex(0); // Loop back to the first card
      }
    };
  
    const handlePrevCard = () => {
      setIsFlipped(false); // Reset flip state before moving to the previous card
  
      if (currentCardIndex > 0) {
        setCurrentCardIndex(currentCardIndex - 1);
      } else {
        setCurrentCardIndex(cards.length - 1); // Go to the last card when at the beginning
      }
    };
  
    return (
      <div className="card-container">
        <h2>Here are your flashcards</h2>
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
          <div className="card-inner">
            <div className="card-front">
              <h3>Card {currentCardIndex + 1}</h3>
              <p>Question: {cards[currentCardIndex].term}</p>
            </div>
            <div className="card-back">
              <h3>Answer:</h3>
              <p>{cards[currentCardIndex].definition}</p>
            </div>
          </div>
        </div>
        <button className="button back-button" onClick={handlePrevCard}>Back</button>
        <button className="button next-button" onClick={handleNextCard}>Next</button>
      </div>
    );
  }
  
  function RenderCardSets({cardSets}) {
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
