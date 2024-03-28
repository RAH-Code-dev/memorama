"use client"

import style from "@/styles/pages/stats.module.css"
import Link from "next/link";
import { useState, useEffect } from "react"
import MainButton from "@/components/MainButton"
import SubroomStat from "@/components/SubroomStat"

const Page = () => {
  /*
   * I'm working with dummy data for now
   * This will be replaced with the real-time connection to the server
   * 
   * We have to get the Subrooms from the server and then map them to the SubroomStat component
   * The game info probably from cookies
   *    - Name of the game
   *    - Game ID
   *    - Number of players
   *    - Teacher name
   */

  const pageDumy = { // Page dummy data
    gameName: "Lenguaje Python (Sintaxis e historia)",
    gameID: 12345678,
    teacherName: "Zurisadai Vega Pinto",
    playersOnline: 23
  }

  const dummy = { // Subroom dummy data
    subroomID: 1,
    score: 775,
    position: 1,
    players: [
      {
        name: "Zurisadai Vega Pinto",
        position: 1,
        score: 300
      },
      {
        name: "Juan Perez",
        position: 2,
        score: 200
      },
      {
        name: "Maria Lopez",
        position: 3,
        score: 150
      },
      {
        name: "Jose Hernandez",
        position: 4,
        score: 125
      }
    ]
  }
  
  return (
    <main className={style.stats__main}>

      <section className={style.stats__header}>
        
        <section>

          <section className={style.stats__title}>
            
            <h1>{pageDumy.gameName}</h1>
            <h4>{pageDumy.gameID}</h4>
          
          </section>

          <section className={style.stats__title}>
          
            <h2>{pageDumy.teacherName}</h2>
            <p>{pageDumy.playersOnline} jugadores en línea</p>
          
          </section>
          
        </section>

        <section className={style.stats__buttons}>
          <MainButton msg='Finalizar juego' />
        </section>

      </section>

      <table className={style.stats__subroomsSection}>

        <thead>
          <tr>
            <th className={style.stats__subroomsTitle}>Subsalas</th>
          </tr>
        </thead>

        <tbody className={style.stats__subrooms}>
          <SubroomStat {...dummy} />
          <SubroomStat {...dummy} />
        </tbody>

      </table>

    </main>
  )
}

export default Page;