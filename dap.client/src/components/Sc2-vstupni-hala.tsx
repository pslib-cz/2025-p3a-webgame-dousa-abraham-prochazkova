import bg from "/img/sc1-square.png";
import type { Scene } from "../assets/types/types";
import postava from "/img/character.png";
import Styles from "../assets/styles/Sc2-vstupni-hala.module.css";
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

  const [phoneInput, setPhoneInput] = useState("");
  const correctCode = "7872";
  const [error, setError] = useState(false);

  const handlePhoneButton = (num: string) => {
    if (phoneInput.length >= 4) return;
    setPhoneInput(prev => prev + num);
  };

  const checkPhoneCode = () => {
    if (phoneInput === correctCode) {
      setIsPhoneClicked(false);
      setScena("sc4");
      u("/sc4")
    } else {
      setError(true);
      setPhoneInput("");
      setTimeout(() => setError(false), 1000);
    }
  };

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

  const sceneSwitch = () => {
    setScena("sc3")
    u("/sc3")
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

  const [scene, setScene] = useState<Scene | null>(null);

  useEffect(() => {
    const fetchScene = async () => {
      try {
        const res = await fetch("/api/scene/3");
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
        <img src={`${scene.sceneImage}`} className="bg" />
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
            bottom: "52%",
            width: "7%",
            height: "26%",
          }}
        />
        <div
          className="debug-tlacitko"
          onClick={() => sceneSwitch()}
          style={{
            left: "82%",
            bottom: "40%",
            width: "10%",
            height: "45%",
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

              <div className={Styles["phone-display"]} style={{ color: error ? "red" : "black" }}>
                {phoneInput || "----"}
              </div>

              <div className={Styles["phone-buttons"]}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                  <button
                    key={n}
                    onClick={() => handlePhoneButton(n.toString())}
                    className={Styles["phone-btn"]}
                  >
                    {n}
                  </button>
                ))}
                <button onClick={checkPhoneCode} className={Styles["phone-btn-enter"]}>
                  OK
                </button>
                <button onClick={() => setPhoneInput("")} className={Styles["phone-btn-clear"]}>
                  C
                </button>
              </div>

              <button className={Styles["overlay-close-button"]} onClick={() => setIsPhoneClicked(false)}>×</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Sc2VstupniHala;
