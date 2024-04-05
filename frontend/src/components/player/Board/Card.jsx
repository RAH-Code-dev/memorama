import styles from "@/styles/components/player/Card.module.css"

const NeonCard = () =>{
    return(
        <button className={`${styles.flip} ${styles.cardStyle}`}><p className={styles.tit}>?</p></button>
    )
}
export default NeonCard;