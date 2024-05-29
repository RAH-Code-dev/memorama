import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getStudentsGame } from "@/services/GetAlumnosPartida";

export default function useGameInfoLogic() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [ queryParams, setQueryParams] = useState({ profesorID: 0, partidaID: 0 });
  const [ gameInfo, setGameInfo ] = useState({ gameName : '', gameID : 0, teacherName : '', playersOnline : 0 });
  const [ players, setPlayers ] = useState([]);

  const startGame = () => {
    const query = new URLSearchParams( queryParams ).toString();

    router.push(`/stats?${query}`);
  }

  /*
   * Get the query params
   */
  useEffect(() => {
    const profesorID = searchParams.get("profesorID");
    const partidaID = searchParams.get("partidaID");

    if (profesorID && partidaID) {
      setQueryParams({ 
        profesorID: parseInt( profesorID ), 
        partidaID: parseInt( partidaID ) 
      });
    }
  }, [ searchParams ]);

  /*
   * Set the gameID
   */
  useEffect(() => {
    setGameInfo({ ...gameInfo, gameID: parseInt( queryParams.partidaID ) });
  }, [ queryParams ]);

  /*
   * Get online players
   */
  useEffect(() => {
    const getGameInfo = async () => {
      const gameStudents = await getStudentsGame( queryParams.partidaID );

      if ( gameStudents ) setPlayers( gameStudents );
      else console.log('Error fetching students');
    }
    
    if ( queryParams.partidaID ) {
      getGameInfo();

      const intervalId = setInterval(() => {
        getGameInfo();
      }, 3000); // Fetch every 3 seconds

      return () => clearInterval(intervalId); // Clear interval on unmount
    }

  }, [ queryParams ]);

  /*
   * Update the players online count
   */
  useEffect(() => {
    setGameInfo({ ...gameInfo, playersOnline: players.length });
  }, [ players ]);

  return {
    queryParams,
    gameInfo,
    players,
    startGame
  }
}
