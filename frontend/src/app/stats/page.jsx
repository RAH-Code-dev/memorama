"use client"

import "@/styles/pages/stats.css"
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
                document.getElementById("t1-classification").innerText = "Position 2 | ";
                document.getElementById("t2-classification").innerText = "Position 4 | ";
                document.getElementById("t3-classification").innerText = "Position 3 | ";
                document.getElementById("t4-classification").innerText = "Winner! | ";

                document.getElementById("return-button").style.visibility = "visible";

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
        <section id="stats">
            <table>
                <thead>
                    <tr>
                        <th id="teams-header"><h3>Teams</h3></th>
                        <th id="points-header"><h3>Points</h3></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.values(teamsData).map(teamData => {
                            return(
                                <tr key={teamData.teamId}>
                                    <td className="teamName"><p className="position" id={`t${teamData.teamId}-classification`}></p><p className="teams-list">Team {teamData.teamId}</p></td>
                                    <td>
                                        <p 
                                            id={`t${teamData.teamId}-percentage`}
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
            <Link href={"/"} id="return-button">Regresar al inicio</Link>
        </section>
    )
}

export default Page;