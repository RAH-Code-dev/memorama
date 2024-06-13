import styles from '@/styles/components/host/SubroomStat.module.css'
import SubroomPlayer from '@/components/host/SubroomPlayer'

export default function SubroomStat( { subroomID, score, position, players = [] } ) {

  const MaxPlayersScore = Math.max(...players.map( player => player.score ), 0)

  return (
    <tr className={styles.SubroomStat}>

      <td className={styles.SubroomStat__inf}>
        <h4>Subsala {subroomID}</h4>
        <p>Posición {position}</p>
        <p>{score} puntos</p>
      </td>

      <td className={styles.SubroomStat__Players}>

        {players.map( (player, key) => (
          <SubroomPlayer 
            key={key}
            player={player.nombre}
            score={player.puntaje}
            maxScore={MaxPlayersScore}
            position={player.position}
          />
        ))}

      </td>

    </tr>
  )
}
