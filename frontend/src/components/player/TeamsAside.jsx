import React from "react";
import '@/Styles/components/leftBar-gameView.css';
import PlayerScore from '@/components/player/PlayerScore'
import { Londrina_Solid, Inter } from "next/font/google";

const TitleFont = Londrina_Solid({
    weight: "400",
    subsets: ["latin"],
});

const smallFont = Inter({
    weight: "100",
    subsets: ["latin"],
});
//titGame
const TeamsAside = (props) =>{
    return(
        <div className="left">
            <div className="titleContainer">
                <h1 className={`${TitleFont.className} titGame`}>{props.titGame}</h1>
            </div>
            <div className="playersContainer">
                <div className="titPlayersContainer">
                    <h1 className={`${smallFont.className} teamName`}>{props.teamName}</h1>
                </div>
                <div className="playerScore">
                    <div className="line"></div>
                    <PlayerScore
                    name = "Tamarindo"
                    score = "0"
                    />
                    <PlayerScore
                    name = "Chilaquil"
                    score = "0"
                    />
                    <PlayerScore
                    name = "Camote"
                    score = "0"
                    />
                    <PlayerScore
                    name = "Domingo"
                    score = "0"
                    />
                </div>
            </div>
        </div>
    )
}
export default TeamsAside;