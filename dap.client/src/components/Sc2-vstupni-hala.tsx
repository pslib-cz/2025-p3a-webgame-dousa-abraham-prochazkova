import bg from "/img/sc2-hall.png";
import postava from "/img/character.png";
import Inventar from "../components/Inventar";
import overlay from "/img/phone-overlay.png";
import Styles from "../assets/styles/Sc2-vstupni-hala.module.css";
import { GameContext, type ItemId } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import fetchDialogue from "../dialogApi";

const Sc2VstupniHala = () => {
  const game = useContext(GameContext);
  const [postup, setPostup] = useState(false);
  const [dialog, setDialog] = useState("prazdny text");

  if (!game) {
    throw new Error("Neni game");
  }

  const { setScena, addItem, removeItem, hasItem, clearItems, isCoilRequired, setIsCoilRequired } = game;

  const klikTlacitko = (id: ItemId) => {
    console.log("Klik na hotspot:", id);
    addItem(id);
  };
  const u = useNavigate();

  const [isPhoneClicked, setIsPhoneClicked] = useState(false);


  const klikNaTelefon = () => {
    if (isCoilRequired) {
      if (hasItem("coil")) {
        setIsPhoneClicked(true);
        removeItem("coil");
        setIsCoilRequired(false);
      }
    } else if (!isCoilRequired) {
      setIsPhoneClicked(true);
    }
  }
  useEffect(() => {/*
    if (postup) return;
    if (hasItem("coil") && hasItem("levers-comb") && !hasItem("kod")) {
      setPostup(true);
      removeItem("klic-od-radnice");
      setScena("sc3");
      u("/sc3");
    }*/
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
    <div className="scena">
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
            left: "6.5%",
            bottom: "57%",
            width: "7%",
            height: "18%",
          }}
        />
        <div
          className="debug-tlacitko"
          onClick={() => klikTlacitko("coil")}
          style={{
            left: "62%",
            bottom: "40%",
            width: "12%",
            height: "34%",
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
            left: "17%",
            bottom: "43%",
            width: "28%",
            height: "16%",
          }}
        />
        {isPhoneClicked && (
          <div className={Styles["overlay-blur"]}>
            <div className={Styles["overlay"]}>
              <img className={Styles["overlay-img"]} src={overlay} alt="Phone Overlay" />
              <button className={Styles["overlay-close-button"]} onClick={() => setIsPhoneClicked(false)}>×</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sc2VstupniHala;
