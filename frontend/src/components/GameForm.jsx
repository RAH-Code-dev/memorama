"use client";

import React, { useState } from "react";
import CardForm from "./CardForm";
import styles from "@/styles/components/GameForm.module.css";
import { useRouter } from "next/navigation";

const GameForm = () => {
  const [gameName, setGameName] = useState("");
  const [cards, setCards] = useState([]);
  const router = useRouter();

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

  const exportGameData = (gameName, cards) => {
    console.log("Exporting Game Data:", gameName, cards);

    router.push("/nuevo");
  };

  return (
    <div className={styles.formContainer}>
      <label className={styles.labelInput}>
        <input
          className={styles.input_text}
          type="text"
          value={gameName}
          onChange={handleGameNameChange}
          placeholder="Nombre del juego"
        />
        <input 
        className={styles.input_text}
        type="text" 
        onChange={handleGameNameChange}
        placeholder="Nombre Usuario"
        />
      </label>
      <button className={styles.button} onClick={handleAddCard}>
        Añadir carta
      </button>
      {cards.map((card, index) => (
        <CardForm
          key={index}
          index={index}
          card={card}
          onCardChange={handleCardChange}
          onDeleteCard={handleDeleteCard}
        />
      ))}
      <button
        className={`${styles.button} ${styles.button_export}`}
        onClick={() => exportGameData(gameName, cards)}
      >
       Exportar datos
      </button>
    </div>
  );
};

export default GameForm;
