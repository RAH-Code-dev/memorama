import Inicio from "@/components/Inicio";
import style from "@/styles/pages/home.module.css";

export default function Home() {
  return (
    <main className={style.homePage}>
      <Inicio />

      <p className={style.message}>Universidad de Guadalajara, Escuela Politecnica de Guadalajara</p>
    </main>
  );
}
