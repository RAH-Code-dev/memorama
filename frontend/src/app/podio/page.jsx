import React from 'react'
import Podio from '@/components/player/Podio'
import style from '@/styles/pages/podioPage.module.css'
import Link from 'next/link'

export default function Page() {
  return (
    <section className={style.stats}>
      <h1 className={style.h1winners}>Ganadores</h1>
      <h1 className={style.h1felicidades}>Felicidades</h1>
      <section className={style.podium}>

        <Podio
          usuario="Luis"
          lugar="2"
          duracion={3}
        />
        <Podio
          usuario="Miguel"
          lugar="1"
          duracion={2}
        />
        <Podio
          usuario="Ana"
          lugar="3"
          duracion={4}
        />

      </section>

      <Link className={style.ctaPodium} href="/formIngreso">Volver al registro</Link>

    </section>
  )
}
