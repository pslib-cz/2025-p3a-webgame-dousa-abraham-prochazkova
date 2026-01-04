import { useNavigate } from "react-router-dom";
import bg from "../assets/img/sc5-end.png";
import { GameContext } from "../GameContext";
import { useContext } from "react";

const Sc5Trezor = () => {
  const game = useContext(GameContext);

  if (!game) {
    throw new Error("Neni game");
  }

  const { setScena, clearItems } = game;
  const u = useNavigate();
  const konec = () => {
    setScena("intro");
    clearItems();
    u("/");
  };

  return (
    <div className="scena">
      <div className="grafika">
        <img src={bg} alt="Trezor" className="bg" />
        <div
          className="sc4-tlacitko"
          onClick={() => konec()}
          style={{
            right: "0%",
            top: "0%",
            width: "5%",
            height: "auto",
            aspectRatio: 1 / 1,
          }}
        />
      </div>
    </div>
  );
};

export default Sc5Trezor;
