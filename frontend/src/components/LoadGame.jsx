import style from '@/styles/components/LoadGame.module.css'; 
import uploading from '@/images/upload.png';


const LoadGame = props => {
  return (
    <div className={style.LoadContainer}> 

            <div className={style.inputFile}>
                <img src={uploading} alt="Drop" />
            <input type="file" value="" className={style.file}/>
            </div>
      

      
    </div>
    
  );
};

export default LoadGame;