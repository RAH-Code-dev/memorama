import styles from "@/styles/pages/formularioIngreso.module.css";
import Link from "next/link";

function FormularioIngreso() {
  return (
    <div className={styles.container}>
      <section className={styles.box}>
        <form action="" id={styles.ingresarForm}>
          <label htmlFor="codigo">Ingresa el código del juego</label>
          <input
            className={styles.input}
            type="text"
            name="codigo"
            placeholder="Código del juego"
          />

          <label htmlFor="nombre">Ingresa tu nombre de usuario</label>
          <input
            className={styles.input}
            type="text"
            name="nombre"
            placeholder="Nombre de usuario"
          />

          <Link href={"/board"} id={styles.submitBtn}>
            Ingresar
          </Link>
        </form>
      </section>
    </div>
  );
}

export default FormularioIngreso;
