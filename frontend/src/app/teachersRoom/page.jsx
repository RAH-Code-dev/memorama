import React from "react";
import '@/styles/pages/teachersRoom.css';

export default function App() {

  let usuario = 'Usuario 1';
  let salaName = 'Sala de ' + usuario;
  console.log(salaName);


  return (
    <div className="App">
      <div className='contenedor'>
        <form action='' method='POST'>
          <div className='id-sala'>

          </div>
          <div className='nombre-sala'>
            <p id='nombre-sala-r'>{salaName}</p>
          </div>
          <input type='text' id='nuevo-nombre' placeholder='Cambiar nombre de la sala...' />
          <button className='bot-nombre'>Cambiar Nombre</button>
          <input type="button" value="Agregar Juego" className='agregar-mazo'/>
          <div className='jugadores-conectados'></div>
            <input type="submit" className='jugar' value="Jugar"/>
        </form>
      </div>
    </div>
  );
}
