import style from '@/styles/components/player/podio.module.css'

export default function Podio( { usuario, lugar, duracion } ) {
  const podioClass = style[`podio${lugar}`]

  return (
    <section className={`${style.podio} ${podioClass}`}>
      <h3 >{lugar} lugar</h3>
      <h2>{usuario}</h2>
      <p>{duracion} minutos</p>
    </section>
  )
}
