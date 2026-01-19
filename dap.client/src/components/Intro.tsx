import bg from "/img/intro-bg.png";
import Styles from "../assets/styles/Intro.module.css";
import { useContext } from "react";
import { GameContext } from "../GameContext";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const game = useContext(GameContext);

  if (!game) {
    throw new Error("Neni game");
  }

  const { setScena } = game;
  const u = useNavigate();
  const klikTlacitkoStart = () => {
    setScena("sc1");
    //const u = useNavigate();
    u("/sc1");
  };

  return (
    <div className="scena">
      <div className="grafika">
        <img src={bg} alt="pozadi" className="bg" />
        <button className={Styles["start-tlacitko"]} onClick={klikTlacitkoStart}>
          Nová hra
        </button>
      </div>
    </div>
  );
};

export default Intro;
