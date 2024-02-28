import CardForm from "./CardForm";

const GameForm = () => {
  return (
    <div>
      <label>
        Game Name:
        <input type="text" />
      </label>
      <button>Add Card</button>
      <CardForm></CardForm>
    </div>
  );
};

export default GameForm;
