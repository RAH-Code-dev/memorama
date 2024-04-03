import '@/styles/pages/gameView.css'
import NeonCard from './Card';

export default function BoardComponent() {
    const dummyDataCards = Array.from({ length: 32 }, (_, index) => index + 1);

    return (
        <div className="right">
            {Object.keys(dummyDataCards).map(key => {
                return (
                    <NeonCard key={key} />
                )
            })}

        </div>
    );
}
