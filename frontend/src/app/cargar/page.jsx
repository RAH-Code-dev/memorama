'use client'

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import LoadGame from "@/components/host/LoadGame";
import DistinctiveTitle from "@/components/DistinctiveTitle";
import style from '@/styles/pages/UploadGame.module.css'; 
import MainButton from "@/components/MainButton";

const Load = () => {
  const router = useRouter()
  const redirect = (path) => {
    router.push(path)
  }

  const handleOnSubmit = useCallback( () => {
    //TODO: Implementar la carga del juego
    redirect('/tablero')
  }, []);

  return (
    <div className={style.container}>
      <DistinctiveTitle
        color={"#000"}
        size={"2rem"}
        >Upload Your File</DistinctiveTitle>
      <LoadGame/>
      <MainButton
        level={3}
        msg="Cargar juego"
        onclick={ handleOnSubmit }
      />
    </div>
  );
};

export default Load;