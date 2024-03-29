import React from "react";
import '@/Styles/components/infoCard.css';

const InfoCard = (props) =>{

    const dangerousColor = props.itIsDangerous ? {backgroundImage: "linear-gradient(black, red)"} : {backgroundImage: "linear-gradient(black, green)"}
    return(
        <div className="hidden allContainer">
            <div className="hidden infoCardContainer">
                <div className="headerContainer">
                    <div>
                        <h1 className="cardName">{props.cardName}</h1>
                        <div className="itIsDangerousC" style={dangerousColor}></div>
                        <button className="exit">x</button>
                    </div>
                </div>
                <div className="pictureFrame">
                    <div className="imageContainer">
                        {/* <img src= {require(`@/images/${props.image}`)}/> */}
                    </div>
                </div>
                <div className="infoContainer"><p>{props.description}</p></div>
            </div>
        </div>
    )
}
export default InfoCard;