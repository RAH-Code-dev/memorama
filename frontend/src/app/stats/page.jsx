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
   */

  const dummy = {
    subroomID: 1,
    score: 775,
    position: 1,
    players: [
      {
        name: "Zurisadai Vega Pinto",
        score: 300
      },
      {
        name: "Juan Perez",
        score: 200
      },
      {
        name: "Maria Lopez",
        score: 150
      },
      {
        name: "Jose Hernandez",
        score: 125
      }
    ]
  }
  
  return (
    <main className={style.stats__main}>

      <section className={style.stats__header}>
        
        <section>

          <section className={style.stats__title}>
            <h1>Lenguaje Python (Sintaxis e historia)</h1> <h4>12345678</h4>
          </section>
          <section className={style.stats__title}>
            <h2>Zurisadai Vega Pinto</h2> <p>23 jugadores en línea</p>
          </section>
          
        </section>

        <section className={style.stats__buttons}>
          <MainButton msg='Finalizar juego' />
          <MainButton msg='Finalizar juego' />
        </section>

      </section>

      <table className={style.stats__subroomsSection}>

        <thead>
          <tr>
            <div className={style.stats__subroomsTitle}>Subsalas</div>
          </tr>
        </thead>

        <tbody className={style.stats__subrooms}>
          <tr> <SubroomStat {...dummy} /> </tr>
        </tbody>

      </table>

    </main>
  )
}

export default Page;