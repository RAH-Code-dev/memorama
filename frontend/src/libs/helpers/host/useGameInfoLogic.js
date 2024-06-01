import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getStudentsGame } from "@/services/GetAlumnosPartida";
import { getPartida } from "@/services/getPatida";

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

    if ( !profesorID || !partidaID ) return;

    if ( parseInt( profesorID ) != queryParams.profesorID || parseInt( partidaID ) != queryParams.partidaID ) {
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
   * Get the game info
   */
  useEffect(() => {
    const getGameInfo = async () => {
      const game = await getPartida( queryParams.partidaID );

      if ( game ) {
        setGameInfo({ 
          gameName: game.nombre,
          gameID: queryParams.partidaID,
          teacherName: game.profesorID// This should be the teacher name
        });
      }
      else {
        ERROR_MESSAGE_HANDLER( 'getting game info', game );
      }
    }

    if ( queryParams.partidaID ) getGameInfo();
  }, [ queryParams ]);

  /*
   * Get online players
   */
  useEffect(() => {
    const getOnlinePlayers = async () => {
      const gameStudents = await getStudentsGame( queryParams.partidaID );

      if ( gameStudents ) setPlayers( gameStudents );
      else ERROR_MESSAGE_HANDLER( 'No se encontraron alumnos', gameStudents );
    }
    
    if ( queryParams.partidaID ) {
      getOnlinePlayers();

      const intervalId = setInterval(() => {
        getOnlinePlayers();
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

const ERROR_MESSAGE = ( action, err ) => `
Error while ${ action }:
Query params: Partida ${ queryParams.partidaID } Profesor ${ queryParams.profesorID }

${ err }
`;

const ERROR_MESSAGE_HANDLER = ( err ) => {
  console.log( ERROR_MESSAGE( err ) );
}