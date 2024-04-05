import styles from "@/styles/components/player/AsideTeamInfo.module.css"
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
const LeftBarGame = (props) =>{
    return(
        <div className={styles.left}>
            <div className={styles.titleContainer} >
                <h1 className={`${TitleFont.className} ${styles.titGame}`}>{props.titGame}</h1>
            </div>
            <div className={styles.playersContainer}>
                <div className={styles.titPlayersContainer}>
                    <h1 className={`${smallFont.className} ${styles.teamName}`}>{props.teamName}</h1>
                </div>
                <div className={styles.playerScore}>
                    <div className={styles.line}></div>
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
export default LeftBarGame;