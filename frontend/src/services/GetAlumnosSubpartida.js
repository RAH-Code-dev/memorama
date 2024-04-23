export const getStudentsGame = async (subpartidaID) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/subpartida/alumnos/${subpartidaID}/`,
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
