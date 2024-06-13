'use client';
import useGameInfo from "@/libs/helpers/host/useGameInfo";

import styles from '@/styles/pages/Iniciar.module.css';
import HostHeader from "@/components/host/HostHeader";
import MainButton from "@/components/MainButton";

export default function page() {
  const { gameInfo, players, statusOptions, cancelGame } = useGameInfo();
  
  return (
    <main className={styles.Iniciar__main} >
      
      <HostHeader gameInfo={ gameInfo } >
        <MainButton 
          msg={ statusOptions.cta }
          onclick={ statusOptions.action }
        />

        <MainButton
          msg="Cancelar juego"
          level={2}
          onclick={ () => cancelGame( gameInfo.gameID ) }
        />
      </HostHeader>

      <section className={styles.Iniciar__OnlinePlayers}>
        
        <p className={styles.Iniciar__TableTitle}>Jugadores en linea</p>
        
        <section className={styles.Iniciar__Players}>
          { players.map( ( player, key ) => <p key={key} className={styles.Iniciar__Player} >{player.nombre}</p> ) }
        </section>
        {
          gameInfo.playersOnline == 0 &&
          <p className={styles.Iniciar__Player} >No hay jugadores en línea</p>
        }

      </section>

    </main>
  )
}
