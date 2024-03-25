"use client";

import Link from "next/link";
import styles from "@/styles/components/Inicio.module.css";
import { Londrina_Solid, Inter } from "next/font/google";

const TitleFont = Londrina_Solid({
    weight: "400",
    subsets: ["latin"],
});

const InputFont = Inter({
    weight: "100",
    subsets: ["latin"],
});

const ButtonFont = Inter({
    weight: "600",
    subsets: ['latin']
});

export default function Inicio() {
    const handleOnSubmit = (event) => {
        event.preventDefault();

        // TODO: Create handle function.
    };

    return (
        <div className={styles.container}>
            <section className={styles.optionsComponent}>
                <form onSubmit={handleOnSubmit} className={styles.joinGameForm}>
                    <h2 className={`${TitleFont.className} ${styles.title}`}>
                        ¡A Jugar!
                    </h2>
                    <input
                        className={`${InputFont.className} ${styles.inputForm}`}
                        type="text"
                        name="idGame"
                        placeholder="Ingresa ID del juego..."
                    />
                    <br />
                    <input
                        className={`${InputFont.className} ${styles.inputForm}`}
                        type="text"
                        name="playerName"
                        placeholder="Ingresa nombre de jugador"
                    />
                    <br />
                    <input
                        className={`${ButtonFont.className} ${styles.submitButtonForm}`}
                        type="submit"
                        value="Entrar al juego"
                    />
                </form>
                <p className={styles.p}>O</p>
                <section className={styles.gameOptions}>
                    <Link className={`${ButtonFont.className} ${styles.gameOptionsButton}`} href={"/crearJuego"}>Crear juego</Link>
                    <Link className={`${ButtonFont.className} ${styles.gameOptionsButton}`} href={"/importarJuego"}>Importar juego</Link>
                </section>
            </section>
        </div>
    );
}
