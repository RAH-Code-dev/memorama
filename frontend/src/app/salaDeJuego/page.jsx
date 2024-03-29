import React from "react";
import ReactDOM  from "react-dom";
import Style from '@/styles/pages/gameView.css'
import NeonCard from '@/components/neonCard'
import Circle0 from '@/components/circle0'
import Circle0 from '@/components/circle1'
import Circle0 from '@/components/circle2'
import Circle0 from '@/components/circle3'
import LeftBarGame from '@/components/leftBar-gameView'
import InfoCard from '@/components/infoCard'

const GameView = () =>(
    <div className={Style.gameViewContainer}>

        <Circle0/>
        <Circle1/>
        <Circle2/>
        <Circle3/>
        <LeftBarGame/>
        <div className={right}>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
            <NeonCard/>
        </div>
        {/* <InfoCard/> */}
    </div>
)

ReactDOM.render(<GameView />, document.getElementById('root'));