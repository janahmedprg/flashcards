import React, { useState } from "react";

export default function RenderCards() {
  const cards = [
    { term: "What is the capital of France?", definition: "Paris" },
    { term: "What is the capital of Germany?", definition: "Berlin" },
    // Add more cards as needed
  ];

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
      <div
        className={`card ${isFlipped ? "flipped" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
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
      <button className="button back-button" onClick={handlePrevCard}>
        Back
      </button>
      <button className="button next-button" onClick={handleNextCard}>
        Next
      </button>
    </div>
  );
}
