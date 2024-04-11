import styles from "@/styles/components/host/CardForm.module.css";
import MainButton from "../MainButton";
import FormInput from "../FormInput";

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
                <FormInput
                    className={styles.input_text}
                    type="text"
                    name="question"
                    placeholder="Pregunta"
                    value={card.question}
                    onChange={(e) =>
                        onCardChange(index, "question", e.target.value)
                    }
                />
            </label>
            <label className={styles.labelInput}>
                <FormInput
                    className={styles.input_text}
                    type="text"
                    name="answer"
                    placeholder="Respuesta"
                    value={card.answer}
                    onChange={(e) =>
                        onCardChange(index, "answer", e.target.value)
                    }
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
