import bg from '../assets/img/intro-bg.png'
import postava from '../assets/img/intro-postava.png'
import nadpis from '../assets/img/intro-nadpis.png'
import tlacitko from '../assets/img/intro-tlacitko.png'
import '../assets/styles/Intro.css'
import { useContext } from "react";
import { GameContext } from "../GameContext";

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
            <div className="grafika">
              <img src={bg} alt="pozadi" className="bg" />
              <div className="zatmaveni" />
               <img src={nadpis} className='nadpis' alt="Případ soukromé Švestky" />
              <img src={postava} className="postava-intro" alt="Postava" />
              <button className="start-tlacitko" onClick={klikTlacitkoStart}>
                 <img src={tlacitko} alt="Start" className="start-tlacitko__img" />
              </button>
            </div>
        </div>
    );
}

export default Intro