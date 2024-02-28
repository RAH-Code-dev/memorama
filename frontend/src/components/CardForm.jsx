import React from "react";

const CardForm = ({ index, card, onCardChange }) => {
  const handleQuestionChange = (e) => {
    onCardChange(index, "question", e.target.value);
  };

  const handleAnswerChange = (e) => {
    onCardChange(index, "answer", e.target.value);
  };

  return (
    <div>
      <label>
        Question:{" "}
        <input
          type="text"
          value={card.question}
          onChange={handleQuestionChange}
        />
      </label>
      <label>
        Answer:{" "}
        <input type="text" value={card.answer} onChange={handleAnswerChange} />
      </label>
    </div>
  );
};

export default CardForm;
