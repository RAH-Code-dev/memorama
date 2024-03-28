import React from 'react'
import style from '@/styles/components/SubroomPlayer.module.css'

export default function SubroomPlayer( { player, score} ) {
  return (
    <div className={style.SubroomPlayer}>
      <p>{player}</p>
      <p>{score} puntos</p>
    </div>
  )
}
