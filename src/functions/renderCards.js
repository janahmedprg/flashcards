import React, { useState } from 'react';

export default function RenderCards(){
  const cards = [
    { term: "What is the capital of France?", definition: "Paris" },
    { term: "What is the capital of Germany?", definition: "Berlin" },
    // Add more cards as needed
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0); // Loop back to the first card
    }
  };

  return (
    <div className="card-container">
      <h2>Here are your flashcards</h2>
      <div className="card">
        <h3>Card {currentCardIndex + 1}</h3>
        <p>Question: {cards[currentCardIndex].term}</p>
        <p>Answer: {cards[currentCardIndex].definition}</p>
      </div>
      <button onClick={handleNextCard}>Next</button>
    </div>
  );
}