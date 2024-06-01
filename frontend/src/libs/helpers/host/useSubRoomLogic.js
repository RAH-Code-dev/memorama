import { useEffect, useState } from "react"

export default function useSubRoomLogic( inputPlayers ) {
  const [ players, setPlayers ] = useState( inputPlayers );
  const [ subrooms, setSubrooms ] = useState({});

  useEffect(() => {
    if ( inputPlayers.length != players.length ) {
      const sortedPlayers = sortPlayers( inputPlayers, subrooms );
      
      // if there are new players, update the subrooms
      if ( sortedPlayers ) {
        setSubrooms( sortedPlayers );
        setPlayers( inputPlayers );
      }
    }
  }, [ inputPlayers ]);

  useEffect(() => {
    // calculate the score of the subrooms
    // and update the subrooms
    const updatedSubrooms = calculateSubroomScore( subrooms );
    setSubrooms( updatedSubrooms );
  }, [ players ]);

  return {
    subrooms
  }
}

const sortPlayers = ( players, currentSubrooms ) => {
  let subrooms = { ...currentSubrooms };

  /* 
   * get the new players by comparing the players with the subrooms
   * if the player is not in any subroom, add it to a new subroom
   */
  const newPlayers = players.filter(player => 
    !Object.values(subrooms).some(subroom => {
      /*
       * check if the player is in the subroom
       * It'd be nice if we could use a player ID
       * So we could compare the players solo by ID
       */
      return subroom.players.some( subroomPlayer => (
          subroomPlayer.nombre == player.nombre 
          && subroomPlayer.subpartidaID == player.subpartidaID
          && subroomPlayer.puntaje == player.puntaje
        )
      );
    }
    )
  );

  newPlayers.forEach( newPlayer => {
    const subroomID = newPlayer.subpartidaID;

    // if the subroom doesn't exist, create it
    if (!subrooms[ subroomID ]) {
      subrooms[ subroomID ] = { players: [], subroomID, score: 0, position: 0 };
    }

    // add the player to the subroom
    subrooms[ subroomID ].players.push( newPlayer );
  });

  if ( newPlayers.length > 0 ) {
    return subrooms;
  }
}

const calculateSubroomScore = ( subrooms ) => {
  let updatedSubrooms = { ...subrooms };

  Object.keys( updatedSubrooms ).forEach( subroomID => {
    const subroom = updatedSubrooms[ subroomID ];
    /*
     * Calculate the score of the subroom by adding the score of each player
     */
    const score = subroom.players.reduce( (acc, player) => acc + player.puntaje, 0 );
    updatedSubrooms[ subroomID ].score = score;
  });

  return updatedSubrooms;
}