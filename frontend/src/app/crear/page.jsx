import React from "react";
import GameForm from "@/components/GameForm";
import styles from "@/styles/pages/create.module.css";
import Circle0 from '@/components/circle0'
import Circle1 from '@/components/circle1'
import Circle2 from '@/components/circle2'
import Circle3 from '@/components/circle3'

const Create = () => {
  return (
    <div className={styles.container}>
        <Circle0/>
        <Circle1/>
        <Circle2/>
        <Circle3/>
      <h1 className={styles.title}>Crea tu juego Nuevo</h1>
      <GameForm />
    </div>
  );
};

export default Create;
