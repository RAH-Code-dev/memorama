"use client";

import React, { useState } from "react";
import CardForm from "./CardForm";

const GameForm = () => {
  const [gameName, setGameName] = useState("");
  const [cards, setCards] = useState([]);

  const handleGameNameChange = (e) => {
    setGameName(e.target.value);
  };

  const handleAddCard = () => {
    const maxCards = 16;
    if (cards.length < maxCards) {
      setCards([...cards, { question: "", answer: "" }]);
    } else {
      alert("The maximum card limit has been reached!");
    }
  };

  const handleCardChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  const handleDeleteCard = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };

  return (
    <div>
      <label>
        Game Name:{" "}
        <input type="text" value={gameName} onChange={handleGameNameChange} />
      </label>
      <button onClick={handleAddCard}>Add Card</button>
      {cards.map((card, index) => (
        <CardForm
          key={index}
          index={index}
          card={card}
          onCardChange={handleCardChange}
          onDeleteCard={handleDeleteCard}
        />
      ))}
      <button onClick={() => exportGameData(gameName, cards)}>
        Export Data
      </button>
    </div>
  );
};

const exportGameData = (gameName, cards) => {
  console.log("Exporting Game Data:", gameName, cards);
};

export default GameForm;
