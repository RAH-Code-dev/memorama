import styles from "@/styles/components/host/CardForm.module.css";
import MainButton from "../MainButton";

const CardForm = ({ index, card, onCardChange, onDeleteCard }) => {
    const handleQuestionChange = (e) => {
        onCardChange(index, "question", e.target.value);
    };

    const handleAnswerChange = (e) => {
        onCardChange(index, "answer", e.target.value);
    };

    return (
        <div className={styles.cardContainer}>
            <label className={styles.labelInput}>
                <input
                    type="text"
                    value={card.question}
                    onChange={(e) =>
                        onCardChange(index, "question", e.target.value)
                    }
                    className={styles.input_text}
                    placeholder="Pregunta"
                />
            </label>
            <label className={styles.labelInput}>
                <input
                    type="text"
                    value={card.answer}
                    onChange={(e) =>
                        onCardChange(index, "answer", e.target.value)
                    }
                    className={styles.input_text}
                    placeholder="Respuesta"
                />
            </label>

            <MainButton
                onclick={() => onDeleteCard(index)}
                msg="Eliminar carta"
                level={4}
            />
        </div>
    );
};

export default CardForm;
