import bg from "/img/sc1-square.png";
import type { Scene } from "../assets/types/types";
import postava from "/img/character.png";
import Styles from "../assets/styles/Sc1-namesti.module.css";
import Inventar from "../components/Inventar";
import { GameContext, type ItemId } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDialogue } from "../dialogApi";
import overlay from "/img/phone-overlay.png";

const Sc2VstupniHala = () => {
  const game = useContext(GameContext);
  const [postup, setPostup] = useState(false);
  const [dialog, setDialog] = useState("prazdny text");

  if (!game) {
    throw new Error("Neni game");
  }

  const { setScena, addItem, removeItem, hasItem, clearItems, history, setDone, isDone } = game;

  const klikTlacitko = (id: ItemId) => {
    console.log("Klik na hotspot:", id);
    addItem(id);
  };
  const u = useNavigate();

  const [isPhoneClicked, setIsPhoneClicked] = useState(false);


  const klikNaTelefon = () => {
    if (isDone("phone-fixed")) {
      setIsPhoneClicked(true);
    }
    else if (hasItem("coil")) {
      removeItem("coil");
      setDone("phone-fixed");
      setIsPhoneClicked(true);
    }
  };
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

    const [scene, setScene] = useState<Scene | null>(null);

    useEffect(() => {
        const fetchScene = async () => {
            try {
                const res = await fetch("https://localhost:7219/api/scene/3");
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

  return (
    <div className="scena">
      <div className="grafika">
              <img src={`https://localhost:7219${scene.sceneImage}`} className="bg" />
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
        {!isDone("coil") && (
          <div
            className="debug-tlacitko"
            onClick={() => klikTlacitko("coil")}
            style={{
              left: "62%",
              bottom: "40%",
              width: "12%",
              height: "34%",
            }}
          />)}
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
        {!isDone("levers-comb") && (
          <div
            className="debug-tlacitko"
            onClick={() => klikTlacitko("levers-comb")}
            style={{
              left: "17%",
              bottom: "43%",
              width: "28%",
              height: "16%",
            }}
          />)}
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
