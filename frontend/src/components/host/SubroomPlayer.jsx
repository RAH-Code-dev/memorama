import styles from '@/styles/components/host/SubroomPlayer.module.css'

export default function SubroomPlayer( { player, score, maxScore = 0, position = 1} ) {
  const percentage = maxScore != 0 ? (score / maxScore) * 100 : 0
  const positionStyle = styles[`SubroomPlayer__${position}`]
  /**
   * Only 4 positions are allowed for now
   */

  return (
    <section 
      className={`${styles.SubroomPlayer} ${positionStyle}`} 
      style={ { '--percent' : `${percentage}%` } } >
      <p>{player}</p>
      <p>{score} puntos</p>

    </section>
  )
}
