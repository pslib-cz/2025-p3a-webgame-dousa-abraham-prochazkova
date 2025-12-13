import bg from '../img/sc0-intro.png'
import '../styles/Intro.css'
import { useContext } from "react";
import { GameContext } from "../../GameContext";
import { Fetcher } from '../components/Fetcher';
import type { Scene } from '../types/types.tsx';

const Intro = () => {
    const game = useContext(GameContext);

    if (!game) {
        throw new Error("Neni game");
    }

    const { setScena } = game;

    const klikTlacitkoStart = () => {
        setScena("sc1");
    }



    return (
        <div className="scena">
            <img src={bg} alt="Intro" className="bg" />
            <button className="start-tlacitko" onClick={klikTlacitkoStart}>
                Nová hra
            </button>


        </div>
    )
}

export default Intro