import { useNavigate } from "react-router-dom";
import bg from "../assets/img/sc5-end.png";
import { GameContext } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import fetchDialogue from "../dialogApi";

const Sc5Trezor = () => {
  const game = useContext(GameContext);
  const [dialog, setDialog] = useState("prazdny text");

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

  useEffect(() => {
    fetchDialogue(5)
      .then((d) => d.dialogueText)
      .then(setDialog);
  }, []);

  return (
    <div className="scena">
      <div className="grafika">
        <img src={bg} alt="Trezor" className="bg" />
        <div className="dialogText">"{dialog}"</div>
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
