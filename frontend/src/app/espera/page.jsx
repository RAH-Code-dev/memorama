import Loading from "@/components/loading";
import style from "@/styles/pages/waitingRoom.module.css";

const Page = () => {
  return (
    <section className={style.loadingPage}>
      <Loading 
        title="Esperando al anfitrión a que inicie la partida"
      />
    </section>
  );
}

export default Page;