'use client'

import style from '@/styles/components/LoadGame.module.css'; 
import uploading from '/public/images/upload-cloud-svgrepo-com.svg';
import Image from 'next/image'

export default function LoadGame() {
  return (
    <div className={style.LoadContainer}>
      <div className={style.inputFile}>
        <Image src={uploading} alt="Drop" />
        <input type="file" value="" className={style.file}/>
      </div>
    </div>
  );
};