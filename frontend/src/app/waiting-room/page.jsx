import Loading from "@/components/loading";
import "@/styles/pages/waiting-room.css";

const Page = () => {
  return (
    <section className="loadingPage">
      <Loading 
        title="Esperando al anfitrión a que inicie la partida"
      />
    </section>
  );
}
 
export default Page;