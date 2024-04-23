export const JoinGame = async (data, subpartidaID) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/subpartida/${subpartidaID}/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    console.log(res);
    throw new Error(res);
  }

  return res.json();
};
