export const getStudentsGame = async (partidaID) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/partida/alumnos/${partidaID}/`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    console.log(res)
    // In case of error, return undefined
    // This will be handled in the component
    return undefined;
  }

  return res.json();
};
