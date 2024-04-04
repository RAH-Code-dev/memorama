import styles from "@/styles/components/player/PlayerScore.module.css"

const PlayerScore = (props) =>{
    return(
        <div className={styles.playerScore}>
            <div className={styles.playerName}><p className={styles.playerNameP}>{props.name}</p></div>
            <div className={styles.score}><p className={styles.scoreP}>{props.score}</p></div>
        </div>
    )
}
export default PlayerScore;