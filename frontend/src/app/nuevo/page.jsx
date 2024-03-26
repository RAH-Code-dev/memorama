"use client";
import "@/styles/pages/formularioIngreso.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormularioEdicionJuego() {
  // const [numeroCategorias, setNumeroCategorias] = useState(0);
  const router = useRouter();
  return (
    <section className="box">
      <section id="ingresar-form">
        <label htmlFor="usuario">Ingresa tu nombre de usuario</label>
        <input
          className="input"
          type="text"
          name="usuario"
          placeholder="Nombre de usuario"
        />

        <label htmlFor="nombre">Ingresa el nombre del juego</label>
        <input
          className="input"
          type="text"
          name="nombre"
          placeholder="Nombre del juego"
        />

        <input
          type="submit"
          value="Ingresar"
          id="submit-btn"
          onClick={() => router.push("/stats")}
        />
      </section>
    </section>
  );
}
