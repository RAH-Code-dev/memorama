export const getStudentsSubGame = async (partidaID) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/partida/alumnos/${partidaID}/`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: {},
    }
  );

  if (!res.ok) {
    console.log(res);
    throw new Error(res);
  }

  return res.json();
};
