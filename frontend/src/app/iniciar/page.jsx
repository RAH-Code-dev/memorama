import HostHeader from "@/components/host/HostHeader"
import MainButton from "@/components/MainButton"
import styles from '@/styles/pages/Iniciar.module.css'

import { DummyGame, DummySubroom } from "@/libs/Dummy"

/*
 * Dummy Data
 */
const GameInfo = DummyGame
const { players : a } = DummySubroom
const players = [ ...a, ...a]

export default function page() {
  return (
    <main className={styles.Iniciar__main} >
      
      <HostHeader gameInfo={GameInfo} >
        <MainButton msg={'Iniciar juego'} />
        <MainButton level={2} msg={'Cancelar'} />
      </HostHeader>

      <section className={styles.Iniciar__OnlinePlayers}>
        
        <p className={styles.Iniciar__TableTitle}>Jugadores en linea</p>
        
        <section className={styles.Iniciar__Players}>
          { players.map( ( player, key ) => <p key={key} className={styles.Iniciar__Player} >{player.name}</p> ) }
        </section>

      </section>

    </main>
  )
}
