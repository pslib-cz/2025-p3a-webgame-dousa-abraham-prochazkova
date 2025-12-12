import bg from '../assets/intro-bg.png'
import postava from '../assets/intro-postava.png'
import nadpis from '../assets/intro-nadpis.png'
import tlacitko from '../assets/intro-tlacitko.png'
import './Intro.css'
import { useContext } from "react";
import { GameContext } from "../../GameContext";

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
            <img src={bg} alt="pozadi" className="bg" />
            <div className="zatmaveni" />

            <img src={postava} className="postava-intro" alt="Postava" />
            <img src={nadpis} className='nadpis' alt="Případ soukromé Švestky" />
            <button className="start-tlacitko" onClick={klikTlacitkoStart}>
                Nová hra
            </button>


        </div>
    )
}

export default Intro