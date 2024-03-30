import React from "react";
import LoadGame from "@/components/LoadGame";
import style from '@/styles/pages/UploadGame.module.css'; 

const Load = () => {
  return (
    <div className={style.container}>
      <h2 className={style.title}>
        Upload Your File
      </h2>
      <LoadGame/>
      <div className={style.inputSubmit}>
                <input type="submit" />
            </div>
    </div>
  );
};

export default Load;