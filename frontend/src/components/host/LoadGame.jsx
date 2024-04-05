'use client'

import style from '@/styles/components/LoadGame.module.css'; 
import uploading from '@/images/upload.png';

const LoadGame = props => {
  console.log(uploading)

  return (
    <div className={style.LoadContainer}> 

            <div className={style.inputFile}>
                <input type="file" className={style.file}/>
                <img src={uploading.src} alt="Drop file" />
            </div>
      

      
    </div>
    
  );
};

export default LoadGame;