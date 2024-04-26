"use client";

import { createRef, useState } from "react";
import CardForm from "@/components/host/CardForm";
import styles from "@/styles/components/host/GameForm.module.css";
import { useRouter } from "next/navigation";
import MainButton from "@/components/MainButton";
import FormInput from "../FormInput";
import { CreateGame } from "@/services/crearPartida";

const GameForm = () => {
  const downloaderTag = createRef();
  const [gameName, setGameName] = useState("");
  const [userName, setUserName] = useState("");
  const [cards, setCards] = useState([]);
  const router = useRouter();

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

  const startGame = (userName, gameName, cards) => {
    let cardsObject = {}
    for (let i = 0; i < cards.length; i++) {
      cardsObject[i] = cards[i];
    }

    console.log(cardsObject)
    console.log(cards)

    console.log("Exporting Game Data:", userName, gameName, cardsObject);
    let res = CreateGame({
      "nombre profesor": userName,
      "nombre juego": gameName,
      cartas: cardsObject,
    });

    // router.push("/iniciar");
  };

  const exportGameData = () => {
    const downloader = downloaderTag.current;

    const blob = new Blob(
        [
            JSON.stringify({
                "nombre profesor": userName,
                "nombre juego": gameName,
                cartas: cards,
            }),
        ],
        {
            type: "application/json",
        }
    );
    const href = URL.createObjectURL(blob);

    downloader.href = href;
    downloader.download = "game.json";
    downloader.click();

    URL.revokeObjectURL(href);
  };

  return (
      <div className={styles.formContainer}>
          <label className={styles.labelInput}>
              <FormInput
                  className={styles.input_text}
                  type="text"
                  name="gameName"
                  placeholder="Nombre del juego"
                  value={gameName}
                  onChange={(e) => {
                      setGameName(e.target.value);
                  }}
              />
              <FormInput
                  className={styles.input_text}
                  type="text"
                  name="teacherName"
                  placeholder="Nombre del profesor"
                  onChange={(e) => {
                      setUserName(e.target.value);
                  }}
              />
          </label>

          <MainButton
              className={styles.button}
              onclick={handleAddCard}
              msg="Añadir carta"
              level={3}
          />

          {cards.map((card, index) => (
              <CardForm
                  key={index}
                  index={index}
                  card={card}
                  onCardChange={handleCardChange}
                  onDeleteCard={handleDeleteCard}
              />
          ))}

          <MainButton
              className={styles.button}
              onclick={() => startGame(userName, gameName, cards)}
              msg="Iniciar"
              level={1}
          />

          <MainButton
              className={styles.button}
              onclick={exportGameData}
              msg="Exportar datos"
              level={2}
          />

          <a
            ref={downloaderTag}
            style={{ display: "none" }}
          />
      </div>
  );
};

export default GameForm;
