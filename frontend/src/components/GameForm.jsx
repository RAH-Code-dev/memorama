"use client";

import React, { useState } from "react";
import CardForm from "./CardForm";

const GameForm = () => {
  const [cards, setCards] = useState([]);

  const handleAddCard = () => {
    setCards([...cards, { question: "", answer: "" }]);
  };

  return (
    <div>
      <label>
        Game Name:
        {' '}
        <input type="text" />
      </label>
      <button onClick={handleAddCard}>Add Card</button>
      {cards.map((card, index) => (
        <CardForm key={index} card={card}></CardForm>
      ))}
    </div>
  );
};

export default GameForm;
