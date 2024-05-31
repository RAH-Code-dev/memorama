import { SERVER_URL } from "./SETTINGS";

export const getPartida = async ( idPartida ) => {
    const res = await fetch(`${ SERVER_URL }/api/partida/${ idPartida }`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  
    if (!res.ok) {
      console.log(res)
      // In case of error, return undefined
      // This will be handled in the component
      return undefined;
    }
  
    return res.json();
  };
  