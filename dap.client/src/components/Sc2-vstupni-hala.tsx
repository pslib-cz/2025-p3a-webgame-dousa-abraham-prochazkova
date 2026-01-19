import bg from "/img/sc2-hall.png";
import postava from "/img/character.png";
import Inventar from "../components/Inventar";
import Styles from "../assets/styles/Sc2-vstupni-hala.module.css";
import { GameContext, type ItemId } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchDialogue from "../dialogApi";

const Sc2VstupniHala = () => {
  const game = useContext(GameContext);
  const [postup, setPostup] = useState(false);
  const [dialog, setDialog] = useState("prazdny text");

  if (!game) {
    throw new Error("Neni game");
  }

  const { setScena, addItem, removeItem, hasItem, clearItems } = game;

  const klikTlacitko = (id: ItemId) => {
    console.log("Klik na hotspot:", id);
    addItem(id);
  };
  const u = useNavigate();

  const klikNaTelefon = () => {
    if (hasItem("kod")) {
      setScena("sc4");
      u("/sc4");
    }
  };

  useEffect(() => {
    if (postup) return;
    if (hasItem("coil") && hasItem("levers-comb") && !hasItem("kod")) {
      setPostup(true);
      removeItem("klic-od-radnice");
      setScena("sc3");
      u("/sc3");
    }
  }, [hasItem, postup, setScena]);

  useEffect(() => {
    fetchDialogue(2)
      .then((d) => d.dialogueText)
      .then(setDialog);
  }, []);

  const konec = () => {
    setScena("intro");
    clearItems();
    u("/");
  };

  return (
    <div className={Styles.scena}>
      <div className="grafika">
        <img src={bg} className="bg" alt="Vstupní hala" />
        <div className="inventar">
          <Inventar />
        </div>
        <div className="dialogText">"{dialog}"</div>
        <img src={postava} alt="Postava" className={Styles["postava-sc2"]} />
        <div
          className="debug-tlacitko"
          onClick={() => klikNaTelefon()}
          style={{
            left: "2%",
            bottom: "55%",
            width: "7%",
            height: "22%",
          }}
        />
        <div
          className="debug-tlacitko"
          onClick={() => klikTlacitko("coil")}
          style={{
            left: "62%",
            bottom: "40%",
            width: "12%",
            height: "36%",
          }}
        />
        <div
          className="debug-tlacitko"
          onClick={() => konec()}
          style={{
            right: "0%",
            top: "0%",
            width: "5%",
            height: "auto",
            aspectRatio: 1 / 1,
          }}
        />
        <div
          className="debug-tlacitko"
          onClick={() => klikTlacitko("levers-comb")}
          style={{
            left: "42%",
            bottom: "15%",
            width: "10%",
            height: "16%",
          }}
        />
      </div>
    </div>
  );
};

export default Sc2VstupniHala;
