import Loading from "@/components/loading";
import style from "@/styles/pages/waitingRoom.module.css";

const Page = () => {
  return (
    <section className={style.loadingPage}>
      <Loading title="Esperando a que el anfitrión inicie la partida" />
    </section>
  );
}

export default Page;