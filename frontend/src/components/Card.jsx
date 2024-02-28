import React, { useEffect, useState } from 'react'

function Card({card, setSelectedCards, selectedCards}) {
  const [isFlipped, setIsFlipped] = useState(false)
    const handleClick = () =>{
        setSelectedCards([...selectedCards, card])
    }
    useEffect(()=>{
      if(selectedCards[0] ===card || selectedCards[1] === card || card.ismatch ){
        setIsFlipped(true)
      }
      else{
        setIsFlipped(false)
      }
    },[selectedCards])
  return (
    <div className={isFlipped ?"card open" : "card" } onClick={handleClick}>
        <div className="front">
            <h1 className='animalName'>{card.animal}</h1>
        </div>
        <div className="back">

        </div>
    </div>
  )
}

export default Card