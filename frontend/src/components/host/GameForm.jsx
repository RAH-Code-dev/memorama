"use client";

import { useState } from "react";
import CardForm from "@/components/host/CardForm";
import styles from "@/styles/components/host/GameForm.module.css";
import { useRouter } from "next/navigation";
import MainButton from "@/components/MainButton";
import FormInput from "../FormInput";

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
                <FormInput
                    className={styles.input_text}
                    type="text"
                    name="gameName"
                    placeholder="Nombre del juego"
                    value={gameName}
                    onChange={handleGameNameChange}
                />
                <FormInput
                    className={styles.input_text}
                    type="text"
                    name="gameName"
                    placeholder="Nombre del juego"
                    onChange={handleGameNameChange}
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
                onclick={() => exportGameData(gameName, cards)}
                msg="Exportar datos"
                level={2}
            />
        </div>
    );
};

export default GameForm;
