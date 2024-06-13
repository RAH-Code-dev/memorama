import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getStudentsGame } from "@/services/GetAlumnosPartida";
import { getPartida } from "@/services/getPatida";
import { updatePartida } from "@/services/updatePartida";

export default function useGameInfo() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [ queryParams, setQueryParams] = useState({ profesorID: 0, partidaID: 0 });
  const [ gameInfo, setGameInfo ] = useState({ gameName : '', gameID : 0, teacherName : '', playersOnline : 0, estado : 'Iniciando' });
  const [ players, setPlayers ] = useState([]);
  const [ statusOptions, setStatusOptions ] = useState({});

  const startGame = async ( queryParams ) => {
    const query = new URLSearchParams( queryParams ).toString();
    const res = await updatePartida( queryParams.partidaID, { estado: 'en-progreso' } );

    if ( !res ) {
      ERROR_MESSAGE_HANDLER( 'starting game', res );
      return;
    }
    
    router.push(`/stats?${query}`);
  }

  const endGame = async ( queryParams ) => {
    const query = new URLSearchParams( queryParams ).toString();
    const res = await updatePartida( queryParams.partidaID , { estado: 'finalizado' } );

    if ( !res ) {
      ERROR_MESSAGE_HANDLER( 'ending game', res );
      return;
    }

    router.push(`/iniciar?${query}`);
  }

  const cancelGame = async ( id ) => {
    const res = await updatePartida( id, { estado: 'cancelado' } );

    if ( !res ) {
      ERROR_MESSAGE_HANDLER( 'canceling game', res );
      return;
    }

    router.push(`/`);
  }
  
  const statusHandler = () => {
    /**
     * I pass the queryParams to the startGame and endGame functions
     * because the functions aren't reading the last value of the queryParams
     * they read { profesorID: 0, partidaID: 0 } instead of the current value
     */
    const currentStatus = gameInfo.estado;

    switch ( currentStatus ) {
      case 'Iniciando':
        setStatusOptions({ 
          estado: currentStatus, 
          action: () => startGame( queryParams ), 
          cta   : 'Iniciar juego'
        });
        break;

      case 'en-progreso':
        setStatusOptions({ 
          estado: currentStatus, 
          action: () => endGame( queryParams ), 
          cta   : 'Finalizar juego'
        });
        break;

      case 'finalizado':
        setStatusOptions({ 
          estado: currentStatus, 
          action: () => startGame( queryParams ), 
          cta   : 'Jugar de nuevo' 
        });
        break;

      default:
        setStatusOptions({ 
          estado: 'Iniciando', 
          action: () => startGame( queryParams ), 
          cta   : 'Iniciar juego'
        });
        break;
    }
  };

  /*
   * Get the query params
   */
  useEffect(() => {
    const profesorID = searchParams.get("profesorID");
    const partidaID = searchParams.get("partidaID");

    // if there's no profesorID or partidaID, return
    if ( !profesorID || !partidaID ) return;

    // if one of the values is different from the current queryParams, update it
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
          teacherName: game.profesorID,// This should be the teacher name
          estado: game.estado
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

  /*
   * Update the status options
   */
  useEffect(() => {
    statusHandler();
  }, [ gameInfo.estado, queryParams ]);

  return {
    queryParams,
    gameInfo,
    players,
    statusOptions,
    cancelGame
  }
}

const ERROR_MESSAGE = ( action, err ) => `
Error while ${ action }:

${ err }
`;

const ERROR_MESSAGE_HANDLER = ( err ) => {
  console.log( ERROR_MESSAGE( err ) );
}