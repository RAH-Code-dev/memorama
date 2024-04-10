import { Londrina_Solid } from "next/font/google";
import style from '@/styles/components/DistinctiveTitle.module.css'

const TitleFont = Londrina_Solid({
  weight: "400",
  subsets: ["latin"],
});

export default function DistinctiveTitle( { children, center = false, size, color } ) {

  const align = center ? { textAlign: "center" } : { textAlign: "left" }
  const titleSize = size && { fontSize: size }
  const titleColor = color && { color: color }
  const TitleStyle = { ...align, ...titleSize, ...titleColor }

  return (
    <h2
      style={TitleStyle} 
      className={`${TitleFont.className} ${style.DistinctiveTitle}`}>{children}</h2>
  )
}
