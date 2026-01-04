import bg from "../assets/img/intro-bg.png";
import postava from "../assets/img/intro-postava.png";
import nadpis from "../assets/img/intro-nadpis.png";
import "../assets/styles/Intro.css";
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
        <div className="zatmaveni" />
        <img src={nadpis} className="nadpis" alt="Případ soukromé Švestky" />
        <img src={postava} className="postava-intro" alt="Postava" />
        <button className="start-tlacitko" onClick={klikTlacitkoStart}>
          Nová hra
        </button>
      </div>
    </div>
  );
};

export default Intro;
