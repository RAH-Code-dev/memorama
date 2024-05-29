'use client';
import useGameInfoLogic from "@/libs/helpers/host/useGameInfoLogic";

import styles from '@/styles/pages/Iniciar.module.css';
import HostHeader from "@/components/host/HostHeader";
import MainButton from "@/components/MainButton";

export default function page() {
  const { gameInfo, players, startGame } = useGameInfoLogic();
  
  return (
    <main className={styles.Iniciar__main} >
      
      <HostHeader gameInfo={ gameInfo } >
        <MainButton 
          msg={'Iniciar juego'}
          onclick={ startGame }
        />
        <MainButton level={2} msg={'Cancelar'} />
      </HostHeader>

      <section className={styles.Iniciar__OnlinePlayers}>
        
        <p className={styles.Iniciar__TableTitle}>Jugadores en linea</p>
        
        <section className={styles.Iniciar__Players}>
          { players.map( ( player, key ) => <p key={key} className={styles.Iniciar__Player} >{player.name}</p> ) }
        </section>
        {
          gameInfo.playersOnline == 0 &&
          <p className={styles.Iniciar__Player} >No hay jugadores en línea</p>
        }

      </section>

    </main>
  )
}
