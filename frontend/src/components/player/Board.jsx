import { useEffect, useState } from "react";
import "@/styles/components/player/Board.css";
import Card from "./Card";
/*
 * Please someone migrate this to a CSS module, I got freaky trying
 * Either way this will be replaced by Edgar (and/or Adriel)
 */

export default function BoardComponent() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);

  let animals = [
    {
      id: 1,
      animal: "🐵",
      ismatch: false,
    },
    {
      id: 2,
      animal: "🦃",
      ismatch: false,
    },
    {
      id: 3,
      animal: "🐶",
      ismatch: false,
    },
    {
      id: 4,
      animal: "🐱",
      ismatch: false,
    },
    {
      id: 5,
      animal: "🦆",
      ismatch: false,
    },
    {
      id: 6,
      animal: "🐥",
      ismatch: false,
    },
    {
      id: 7,
      animal: "🐙",
      ismatch: false,
    },
    {
      id: 8,
      animal: "🐳",
      ismatch: false,
    },
  ];
  const shuffleArray = () => {
    const shuffledArray = [...animals, ...animals]
      .map((item, index) => ({ ...item, num: index + 1 }))
      .sort((a, b) => 0.5 - Math.random());
    setCards(shuffledArray);
  };
  //console.log(cards)
  useEffect(() => {
    shuffleArray();
  }, []);

  useEffect(() => {
    //console.log(selectedCards)
    if (selectedCards.length === 2) {
      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
      checkMacht();
    }
  }, [selectedCards]);

  const checkMacht = () => {
    if (selectedCards[0].id === selectedCards[1].id) {
      setScore((prev) => prev + 1);
      let updateCards = cards.map((card) => {
        if (card.id === selectedCards[0].id) {
          return { ...card, ismatch: true };
        }
        return card;
      });
      setCards(updateCards);
    } else {
      //console.log("no")
    }
  };
  return (
    <div className="container">
      {/* <div className="score">Score: {score}</div> */}
      <div className="card-container">
        {cards.map((card) => (
          <Card
            key={card.num}
            card={card}
            setSelectedCards={setSelectedCards}
            selectedCards={selectedCards}
          />
        ))}
      </div>
    </div>
  );
}
