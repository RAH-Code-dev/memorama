import AsideTeamInfo from '@/components/player/AsideTeamInfo'
import InfoCard from '@/components/player/InfoCard'
import Board from "@/components/player/Board/Board";

export default function GameView() {
    return (
        <div>
            <AsideTeamInfo
                titGame="Nombre de la partida"
                teamName="Nombre del equipo"
            />
            <Board />
        </div>
    );
}



/* 
    <InfoCard
        cardName = "Mantis Religiosa"
        description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis tellus in massa pretium, vitae cursus augue tristique. Aenean rutrum enim aliquam, malesuada enim id, mollis sem. Sed porta vehicula mauris, nec dapibus libero semper eu. Sed sit amet massa elementum, placerat sapien a, cursus eros. Vestibulum maximus purus enim, eu tristique nunc commodo non. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus lacus sed neque aliquam pretium. Ut id risus nulla. Etiam non sodales velit. Suspendisse suscipit nulla libero, eget iaculis nibh imperdiet at. Integer ac nunc lectus. Cras eu augue turpis. Donec sed ultricies diam. Suspendisse porta sollicitudin ligula vitae lacinia. Aliquam ac magna lobortis, blandit dui at, pharetra massa."
        itIsDangerous = {true}
        image = "mantisR.jpg"
    /> 
*/