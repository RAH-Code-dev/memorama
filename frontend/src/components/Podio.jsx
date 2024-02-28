import React from 'react'
import '@/styles/components/podio.css'

export default function Podio( { usuario, lugar, duracion } ) {
  return (
    <section className={'podio podio-' + lugar}>
      <h2>{usuario}</h2>
      <h3>{lugar} lugar</h3>
      <p>{duracion} minutos</p>
    </section>
  )
}
