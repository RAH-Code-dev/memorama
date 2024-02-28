import Link from "next/link";
import styles from "@/styles/components/Inicio.module.css";

export default function Inicio() {
  return (
    <div className={styles.container}>
      <section className={styles.titleSec}>
        <h1>PoliMemorama</h1>
      </section>
      <section className={styles.buttons}>
        <Link className={styles.link} href={"/crear"}>
          Crear juego
        </Link>
        <Link className={styles.link} href={"/nuevo"}>
          Nuevo juego
        </Link>
        <Link className={styles.link} href={"/jugar"}>
          Ingresar a un juego
        </Link>
      </section>
    </div>
  );
}
