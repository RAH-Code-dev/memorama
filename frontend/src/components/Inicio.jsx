"use client";

import styles from "@/styles/components/Inicio.module.css";
import DistinctiveTitle from "./DistinctiveTitle";
import FormInput from "./FormInput";
import MainButton from "./MainButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { JoinGame } from "@/services/unirse";

export default function Inicio() {
  const [gameCode, setGameCode] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const redirect = (path) => {
    router.push(path);
  };

  const handleOnSubmit = () => {
    console.log("submitting data:", gameCode, name);
    let res = JoinGame({
      partidaID: gameCode,
      "nombre alumno": name,
    });

    if ( !res ) {
      alert("Error al unirse al juego");
    }
    
    if (res) {
      console.log("res", res);
      redirect(`/espera/?gameCode=${ gameCode.toString() }`);
    }
  };

  return (
    <section className={styles.Inicio}>
      <section className={styles.Inicio__Content}>
        <DistinctiveTitle center={true}>¡A Jugar!</DistinctiveTitle>

        <form onSubmit={handleOnSubmit} className={styles.Inicio__Form}>
          <FormInput
            type="text"
            name="gameCode"
            placeholder="Ingresa código de juego"
            onChange={(e) => setGameCode(e.target.value)}
          />

          <FormInput
            type="text"
            name="playerName"
            placeholder="Ingresa nombre de jugador"
            onChange={(e) => setName(e.target.value)}
          />

          <MainButton
            width="350px"
            msg="Entrar al juego"
            onclick={handleOnSubmit}
          />
        </form>

        <p className={styles.Inicio__Text}>O</p>

        <section className={styles.Inicio__Options}>
          <MainButton
            level={3}
            msg="Crear juego"
            onclick={() => redirect("/crear")}
          />
          <MainButton
            level={2}
            msg="Importar juego"
            onclick={() => redirect("/cargar")}
          />
        </section>
      </section>
    </section>
  );
}
