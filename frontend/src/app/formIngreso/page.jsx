import "@/styles/pages/formularioIngreso.css";

function FormularioIngreso() {
  return (
    <>
      <section className="box">
        <form action="" id="ingresar-form">
          <label htmlFor="codigo">Ingresa el código del juego</label>
          <input
            className="input"
            type="text"
            name="codigo"
            placeholder="Código del juego"
          />

          <label htmlFor="nombre">Ingresa tu nombre de usuario</label>
          <input
            className="input"
            type="text"
            name="nombre"
            placeholder="Nombre de usuario"
          />

          <input type="submit" value="Ingresar" id="submit-btn" />
        </form>
      </section>
    </>
  );
}

export default FormularioIngreso;
