import bg from "../assets/img/sc4-vault.png";
import postava from "../assets/img/character.png";
import Inventar from "../components/Inventar";
import "../assets/styles/Intro.css";
import "../assets/styles/Sc4-sklep-trezor.css";
import { GameContext } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import lv from "../assets/img/laverage-background.png";
import up from "../assets/img/up.png";
import down from "../assets/img/down.png";
import fetchDialogue from "../dialogApi";

const Sc4SklepTrezor = () => {
  const game = useContext(GameContext);
  const [minigameActive, setMinigameActive] = useState(false);
  const [nastavenipak, setnastavenipak] = useState([true, false, false, false]);
  const [dialog, setDialog] = useState("prazdny text");

  if (!game) {
    throw new Error("Neni game");
  }

  const { setScena, removeItem, clearItems } = game;
  const konec = () => {
    setScena("intro");
    clearItems();
    u("/");
  };

  const vodaDoGen = () => {
    removeItem("mug");
    setMinigameActive(true);
  };

  const nastavPaky = () => {
    removeItem("levers-comb");
  };
  const u = useNavigate();

  const magnetickaKarta = () => {
    removeItem("card");
    setScena("sc5");
    u("/sc5");
  };
  const prepniPaku = (idx: number) => {
    setnastavenipak((starePole) => {
      const novePole = [...starePole];

      novePole[idx] = !novePole[idx];

      return novePole;
    });
  };

  useEffect(() => {
    fetchDialogue(4)
      .then((d) => d.dialogueText)
      .then(setDialog);
  }, []);

  if (
    nastavenipak[0] &&
    !nastavenipak[1] &&
    nastavenipak[2] &&
    nastavenipak[3] &&
    minigameActive
  ) {
    setMinigameActive(false);
  }
  const switchovaciFce = () => {
    if (minigameActive) {
      return (
        <div className="scena">
          <div className="grafika">
            <img src={lv} alt="paky" className="bg" />

            <img
              src={nastavenipak[0] ? down : up}
              alt="paka"
              className={nastavenipak[0] ? "paka-down" : "paka-up"}
              style={{ left: "30%" }}
            />
            <img
              src={nastavenipak[1] ? down : up}
              alt="paka"
              className={nastavenipak[1] ? "paka-down" : "paka-up"}
              style={{ left: "45%" }}
            />
            <img
              src={nastavenipak[2] ? down : up}
              alt="paka"
              className={nastavenipak[2] ? "paka-down" : "paka-up"}
              style={{ left: "60%" }}
            />
            <img
              src={nastavenipak[3] ? down : up}
              alt="paka"
              className={nastavenipak[3] ? "paka-down" : "paka-up"}
              style={{ left: "75%" }}
            />
            <div
              className="sc4-tlacitko"
              onClick={() => prepniPaku(0)}
              style={{
                left: "30%",
                bottom: "27%",
                width: "5%",
                height: "40%",
              }}
            />
            <div
              className="sc4-tlacitko"
              onClick={() => prepniPaku(1)}
              style={{
                left: "45%",
                bottom: "27%",
                width: "5%",
                height: "40%",
              }}
            />
            <div
              className="sc4-tlacitko"
              onClick={() => prepniPaku(2)}
              style={{
                left: "60%",
                bottom: "27%",
                width: "5%",
                height: "40%",
              }}
            />
            <div
              className="sc4-tlacitko"
              onClick={() => prepniPaku(3)}
              style={{
                left: "75%",
                bottom: "27%",
                width: "5%",
                height: "40%",
              }}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="scena">
          <div className="grafika">
            <img src={bg} alt="Trezor" className="bg" />
            <div className="inventar-sc4">
              <Inventar />
            </div>
            <div className="dialogText">"{dialog}"</div>
            <img src={postava} alt="Postava" className="postava-sc4" />
            <div
              className="sc4-tlacitko"
              onClick={() => vodaDoGen()}
              style={{
                left: "5%",
                bottom: "42%",
                width: "20%",
                height: "22%",
              }}
            />
            <div
              className="sc4-tlacitko"
              onClick={() => nastavPaky()}
              style={{
                left: "15%",
                bottom: "27%",
                width: "13%",
                height: "13%",
              }}
            />
            <div
              className="sc4-tlacitko"
              onClick={() => magnetickaKarta()}
              style={{
                left: "72%",
                bottom: "39%",
                width: "6%",
                height: "13%",
              }}
            />
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
    }
  };
  return switchovaciFce();
};

export default Sc4SklepTrezor;
