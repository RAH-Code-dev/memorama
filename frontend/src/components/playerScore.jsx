import React from "react";
import '@/styles/components/playerScore.css';

const PlayerScore = (props) =>{
    return(
        <div className="playerScore">
            <div className="playerName"><p>{props.name}</p></div>
            <div className="score"><p>{props.score}</p></div>
        </div>
    )
}
export default PlayerScore;