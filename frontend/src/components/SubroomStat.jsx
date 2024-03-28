import React from 'react'
import style from '@/styles/components/SubroomStat.module.css'
import SubroomPlayer from '@/components/SubroomPlayer'

export default function SubroomStat( { subroomID, score, position, players = [] } ) {
  return (
    <section className={style.SubroomStat}>

      <article className={style.SubroomStat__inf}>
        <h4>Subsala {subroomID}</h4>
        <p>Posición {position}</p>
        <p>{score} puntos</p>
      </article>

      <section className={style.SubroomStat__Players}>

        {players.map( (player, key) => (
          <SubroomPlayer key={key} player={player.name} score={player.score} />
        ))}

      </section>

    </section>
  )
}
