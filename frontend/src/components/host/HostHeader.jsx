import styles from '@/styles/components/host/HostHeader.module.css'
import DistinctiveTitle from '../DistinctiveTitle'

export default function HostHeader({ children, gameInfo }) {
  /*
   *  CHILDREN MUST BE BUTTONS NOT OTHER STUFF
   */
  const { gameName, gameID, teacherName, playersOnline } = gameInfo

  return (
    <section className={styles.HostHeader}>

      <section>
        <section className={styles.HostHeader__title}>
          <DistinctiveTitle size={'2.25rem'}>{gameName}</DistinctiveTitle>
          <h4>#{gameID}</h4>
        </section>

        <section className={styles.HostHeader__title}>
          <DistinctiveTitle size={'1.5rem'}>{teacherName}</DistinctiveTitle>
          <DistinctiveTitle size={'1rem'}>{playersOnline} jugadores en línea</DistinctiveTitle>
        </section>
      </section>

      <section className={styles.HostHeader__buttons}>
        {children}
      </section>

    </section>
  )
}
