import style from '@/styles/components/SubroomStat.module.css'
import SubroomPlayer from '@/components/SubroomPlayer'

export default function SubroomStat( { subroomID, score, position, players = [] } ) {

  const MaxSubRoomScore = Math.max(...players.map( player => player.score ), 0)

  return (
    <tr className={style.SubroomStat}>

      <td className={style.SubroomStat__inf}>
        <h4>Subsala {subroomID}</h4>
        <p>Posición {position}</p>
        <p>{score} puntos</p>
      </td>

      <td className={style.SubroomStat__Players}>

        {players.map( (player, key) => (
          <SubroomPlayer 
            key={key}
            player={player.name}
            score={player.score}
            maxScore={MaxSubRoomScore}
            position={player.position}
          />
        ))}

      </td>

    </tr>
  )
}
