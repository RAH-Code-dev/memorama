import { Londrina_Solid } from "next/font/google";
import style from '@/styles/components/DistinctiveTitle.module.css'

const TitleFont = Londrina_Solid({
  weight: "400",
  subsets: ["latin"],
});

export default function DistinctiveTitle( { children, center = false, size } ) {

  const align = center ? { textAlign: "center" } : { textAlign: "left" }
  const titleSize = size && { fontSize: size }
  const TitleStyle = { ...align, ...titleSize }

  return (
    <h2
      style={TitleStyle} 
      className={`${TitleFont.className} ${style.DistinctiveTitle}`}>{children}</h2>
  )
}
