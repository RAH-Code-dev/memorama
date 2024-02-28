import Loading from "@/components/loading";
import "@/styles/pages/waiting-room.css";

export default Page = () => {
  return (
    <section className="loadingPage">
      <Loading 
        title="Esperando al anfitrión a que inicie la partida"
      />
    </section>
  );
}