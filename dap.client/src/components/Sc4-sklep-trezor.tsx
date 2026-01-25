
import postava from "/img/character.png";
import Inventar from "../components/Inventar";
import Styles from "../assets/styles/Sc4-sklep-trezor.module.css";
import { GameContext } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import lv from "/img/laverage-background.png";
import up from "/img/up.png";
import down from "/img/down.png";
import fetchDialogue from "../dialogApi";
import type { Scene } from "../assets/types/types";

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
  };

  const buttonBack = () => {
    u("/sc2");
  }

  const nastavPaky = () => {
    removeItem("levers-comb");
    setMinigameActive(true);
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

    const [scene, setScene] = useState<Scene | null>(null);

    useEffect(() => {
        const fetchScene = async () => {
            try {
                const res = await fetch("https://localhost:7219/api/scene/5");
                if (!res.ok) throw new Error("Chyba při načítání scény");
                const data: Scene = await res.json();
                setScene(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchScene();
    }, []);

    if (!scene) return <p>Načítám scénu...</p>;

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
              className={nastavenipak[0] ? Styles["paka-down"] : Styles["paka-up"]}
              style={{ left: "30%" }}
            />
            <img
              src={nastavenipak[1] ? down : up}
              alt="paka"
              className={nastavenipak[1] ? Styles["paka-down"] : Styles["paka-up"]}
              style={{ left: "45%" }}
            />
            <img
              src={nastavenipak[2] ? down : up}
              alt="paka"
              className={nastavenipak[2] ? Styles["paka-down"] : Styles["paka-up"]}
              style={{ left: "60%" }}
            />
            <img
              src={nastavenipak[3] ? down : up}
              alt="paka"
              className={nastavenipak[3] ? Styles["paka-down"] : Styles["paka-up"]}
              style={{ left: "75%" }}
            />
            <div
              className="debug-tlacitko"
              onClick={() => prepniPaku(0)}
              style={{
                left: "30%",
                bottom: "27%",
                width: "5%",
                height: "40%",
              }}
            />
            <div
              className="debug-tlacitko"
              onClick={() => prepniPaku(1)}
              style={{
                left: "45%",
                bottom: "27%",
                width: "5%",
                height: "40%",
              }}
            />
            <div
              className="debug-tlacitko"
              onClick={() => prepniPaku(2)}
              style={{
                left: "60%",
                bottom: "27%",
                width: "5%",
                height: "40%",
              }}
            />
            <div
              className="debug-tlacitko"
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
                  <img src={`https://localhost:7219${scene.sceneImage}`} className="bg" />
            <div className="inventar">
              <Inventar />
            </div>
            <div className="dialogText">"{dialog}"</div>
            <img src={postava} alt="Postava" className={Styles["postava-sc4"]} />
            <div
              className="debug-tlacitko"
              onClick={() => nastavPaky()}
              style={{
                left: "20%",
                bottom: "52%",
                width: "15%",
                height: "15%",
              }}
            />
            <div
              className="debug-tlacitko"
              onClick={() => vodaDoGen()}
              style={{
                left: "18%",
                bottom: "27%",
                width: "10%",
                height: "13%",
              }}
            />
            <div
              className="debug-tlacitko"
              onClick={() => magnetickaKarta()}
              style={{
                left: "72%",
                bottom: "39%",
                width: "6%",
                height: "13%",
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

            <button className="buttonBack" onClick={buttonBack}>Zpět</button>
          </div>
        </div>
      );
    }
  };
  return switchovaciFce();
};

export default Sc4SklepTrezor;
