"use client";

// import AsideListComponent from "@/components/AsideListComponent";
import BoardComponent from "@/components/player/Board";
import styles from "@/styles/pages/Board.module.css";

const BoardPage = () => {
  let usuarios = [
    {
      nombre: "Cubos",
      score: 0,
    },
    {
      nombre: "Nestor",
      score: 0,
    },
    {
      nombre: "Angel",
      score: 0,
    },
    {
      nombre: "Milo",
      score: 0,
    },
  ];

  return (
    <>
      <aside className={styles.aside}>
        <p className={styles.title}>Nombre del equipo</p>
        {usuarios.map((usuario) => (
          <div className={styles.div}>
            <p className={styles.p}>nombre: {usuario.nombre}</p>
            <p className={styles.p}>Score: {usuario.score}</p>
          </div>
        ))}
      </aside>
      <div>
        <BoardComponent />
      </div>
    </>
  );
};

export default BoardPage;
