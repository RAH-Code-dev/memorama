"use client"

import useGameInfoLogic from "@/libs/helpers/host/useGameInfoLogic"
import useSubRoomLogic from "@/libs/helpers/host/useSubRoomLogic"

import style from "@/styles/pages/stats.module.css"
import MainButton from "@/components/MainButton"
import SubroomStat from "@/components/host/SubroomStat"
import HostHeader from "@/components/host/HostHeader"

const Page = () => {
  const { gameInfo, players } = useGameInfoLogic();
  const { subrooms } = useSubRoomLogic( players );
  
  return (
    <main className={style.stats__main}>

      <HostHeader gameInfo={ gameInfo } >
        <MainButton msg='Jugar de nuevo' />
      </HostHeader>

      <table className={style.stats__subroomsSection}>

        <thead>
          <tr>
            <th className={style.stats__subroomsTitle}>Subsalas</th>
          </tr>
        </thead>

        <tbody className={style.stats__subrooms}>
          { Object.keys( subrooms ).map(subroom => (
            <SubroomStat key={ subroom } {...subrooms[ subroom ]} />
          ))}
        </tbody>

      </table>

    </main>
  )
}

export default Page;