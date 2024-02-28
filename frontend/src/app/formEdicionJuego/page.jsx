"use client";
import "@/styles/pages/edicionJuego.css";
import { useState } from "react";

export default function FormularioEdicionJuego() {
  const [numeroCategorias, setNumeroCategorias] = useState(0);

  return (
    <form action="" id="ingresar-form">
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

      <label htmlFor="Numero-Categorias">
        Ingresa el numero de categorias que tendra el juego
      </label>
      <select className="input" name="Numero-Categorias">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>

      <input type="submit" value="Ingresar" id="submit-btn" />
    </form>
  );
}
