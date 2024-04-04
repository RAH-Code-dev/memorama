import React from 'react'
import Podio from '@/components/player/Podio'
import style from '@/styles/pages/podioPage.module.css'
import Link from 'next/link'
import Circle0 from '@/components/circle0'
import Circle1 from '@/components/circle1'
import Circle2 from '@/components/circle2'
import Circle3 from '@/components/circle3'

export default function Page() {
  return (
    <section className={style.stats}>
       <h1 className={style.h1winners}>Ganadores</h1>
      <h1 className={style.h1felicidades}>Felicidades</h1>
      <Circle0/>
        <Circle1/>
        <Circle2/>
        <Circle3/>
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
