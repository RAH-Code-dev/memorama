import Circle from '@/components/background/Circle';
import styles from "@/styles/components/background/circles.module.css"

export default function Background() {

    return (
        <div>
            <Circle className={styles.circleOne}/>
            <Circle className={styles.circleTwo}/>
            <Circle className={styles.circleThree}/>
            <Circle className={styles.circleFour}/>
        </div>

    )
}