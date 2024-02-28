"use client"

import style from "@/styles/pages/stats.module.css"
import Link from "next/link";
import { useState, useEffect } from "react"

const Page = () => {
  const [teamsData, setTeamsData] = useState([
    {   
      teamId: "1",
      points: 0,
    },
    {
      teamId: "2",
      points: 0
    },
    {
      teamId: "3",
      points: 0
    },
    {
      teamId: "4",
      points: 0
    }
  ]);

  useEffect(() => {
    let seconds = 0;
    const intervalID = setInterval(() => {
      if (seconds < 4) {
        addTeamsPoints();
        seconds++;
      } else {
        document.getElementById("t1Classification").innerText = "Position 2 | ";
        document.getElementById("t2Classification").innerText = "Position 4 | ";
        document.getElementById("t3Classification").innerText = "Position 3 | ";
        document.getElementById("t4Classification").innerText = "Winner! | ";

        document.getElementById("returnButton").style.visibility = "visible";

        clearInterval(intervalID);
      }
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  function addTeamsPoints() {
    setTeamsData(prevTeamsData => {
      return prevTeamsData.map(team => {
        let points = 0;
        if (team.teamId === "1") points = team.points + 3;
        if (team.teamId === "2") points = team.points + 1;
        if (team.teamId === "3") points = team.points + 2;
        if (team.teamId === "4") points = team.points + 4;

        return {
          ...team,
          points: points
        };
      });
    });
  }
  
  return (
    <section className={style.statsParent}>
      <section id={style.stats}>
        <table>
          <thead>
            <tr>
              <th id={style.teamsHeader}><h3>Teams</h3></th>
              <th id={style.pointsHeader}><h3>Points</h3></th>
            </tr>
          </thead>
          <tbody>
            {
              Object.values(teamsData).map(teamData => {
                const tClassification = style[`t${teamData.teamId}Classification`]
                const tPercentage = style[`t${teamData.teamId}Percentage`]

                return(
                  <tr key={teamData.teamId}>

                    <td className={style.teamName}>
                      <p 
                        className={`${style.position} ${tClassification}`} 
                        id={`t${teamData.teamId}Classification`}></p>
                      <p className={style.teamsList}>Team {teamData.teamId}</p>
                    </td>
                    
                    <td>
                      <p 
                        className={`${tPercentage} ${style.percentage}`}
                        id={`t${teamData.teamId}Percentage`}
                        style={{width: (teamData.points * 6.25) + '%'}}
                      >
                        <strong>{teamData.points}</strong>
                      </p>
                    </td>

                  </tr>
                )
              })
            }
          </tbody>
      </table>
      <Link href={"/"} className={style.returnButton} id="returnButton">Regresar al inicio</Link>
    </section>
  </section>
  )
}

export default Page;