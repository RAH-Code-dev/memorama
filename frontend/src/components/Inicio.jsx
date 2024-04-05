"use client";

import Link from "next/link";
import styles from "@/styles/components/Inicio.module.css";
import DistinctiveTitle from "./DistinctiveTitle";
import FormInput from "./FormInput";
import MainButton from "./MainButton";
import { useRouter } from "next/navigation";
import { Main } from "next/document";


export default function Inicio() {
    const router = useRouter()
    const redirect = (path) => {
        router.push(path)
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();

        // TODO: Create handle function.
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
                    />

                    <FormInput
                        type="text"
                        name="playerName"
                        placeholder="Ingresa nombre de jugador"
                    />

                    <MainButton width='350px' msg="Entrar al juego" />

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
                        onclick={() => redirect("/importar")}
                    />
                </section>
            </section>

        </section>
    );

}