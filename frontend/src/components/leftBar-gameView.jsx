import React from "react";
import '../Styles/components/leftBar-gameView.css';

const LeftBarGame = () =>{
    return(
        <div className="left">
            <div className="titleContainer">
                <h1 className="titGame">Nombre de la partida</h1>
            </div>
            <div className="playersContainer">
                <h1 className="teamName">Nombre del equipo</h1>
            </div>
        </div>
    )
}
export default LeftBarGame;