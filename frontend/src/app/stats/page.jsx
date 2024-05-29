"use client"

import useGameInfoLogic from "@/libs/helpers/host/useGameInfoLogic"
import useSubRoomLogic from "@/libs/helpers/host/useSubRoomLogic"

import style from "@/styles/pages/stats.module.css"
import MainButton from "@/components/MainButton"
import SubroomStat from "@/components/host/SubroomStat"
import HostHeader from "@/components/host/HostHeader"

import { DummySubroom } from "@/libs/Dummy";

const Page = () => {
  const { queryParams, gameInfo, players } = useGameInfoLogic();
  const { Nothing_You_Could_Do } = useSubRoomLogic();
  /*
   * I'm working with dummy data for now
   * This will be replaced with the real-time connection to the server
   * 
   * We have to get the Subrooms from the server and then map them to the SubroomStat component
   * The game info probably from cookies
   *    - Name of the game
   *    - Game ID
   *    - Number of players
   *    - Teacher name
   */
  const Subrooms = [DummySubroom, DummySubroom]
  
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
          {Subrooms.map(subroom => (
            <SubroomStat key={subroom.subroomID} {...subroom} />
          ))}
        </tbody>

      </table>

    </main>
  )
}

export default Page;