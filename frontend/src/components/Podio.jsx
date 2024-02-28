import React from 'react'
import style from '@/styles/components/podio.module.css'

export default function Podio( { usuario, lugar, duracion } ) {
  const podioClass = style[`podio${lugar}`]

  return (
    <section className={`${style.podio} ${podioClass}`}>
      <h2>{usuario}</h2>
      <h3>{lugar} lugar</h3>
      <p>{duracion} minutos</p>
    </section>
  )
}
