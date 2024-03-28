import { Londrina_Solid } from "next/font/google";
import style from '@/styles/components/DistinctiveTitle.module.css'

const TitleFont = Londrina_Solid({
  weight: "400",
  subsets: ["latin"],
});

export default function DistinctiveTitle( { text, center = false } ) {

  const align = center ? { textAlign: "center" } : { textAlign: "left" };

  return (
    <h2
      style={align} 
      className={`${TitleFont.className} ${style.DistinctiveTitle}`}>{text}</h2>
  )
}
