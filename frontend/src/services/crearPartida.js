export const CreateGame = async (data) => {
  const res = await fetch("http://127.0.0.1:8000/api/crearPartida/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log(res)
    // In case of error, return undefined
    // This will be handled in the component
    return undefined;
  }

  return res.json();
};
