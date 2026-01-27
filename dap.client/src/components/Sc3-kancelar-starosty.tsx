import type { Scene } from "../assets/types/types";
import postava from "/img/character.png";
import Styles from "../assets/styles/Sc3-kancelar-starosty.module.css";
import Inventar from "../components/Inventar";
import { GameContext, type ItemId } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDialogue } from "../dialogApi";
import overlay from "/img/kod.png";

const Sc3KancelarStarosty = () => {
  const game = useContext(GameContext);
  const [postup, setPostup] = useState(false);
  const [dialog, setDialog] = useState("prazdny text");
  const [isDrawerClicked, setIsDrawerClicked] = useState(false);

  if (!game) {
    throw new Error("Neni game");
  }

  const { setScena, addItem, removeItem, hasItem, clearItems } = game;

  const klikTlacitko = (id: ItemId) => {
    console.log("Klik na hotspot:", id);
    if (id === "card") {
      removeItem("wire");
    }
    if (id === "kod" && !hasItem("klic-od-supliku")) return;
    addItem(id);
  };
  const u = useNavigate();

  const buttonBack = () => {
    u("/sc2");
  }

  const clickCheck = (idCheck: ItemId, idGive: ItemId) => {
    if (hasItem(idCheck)) {
      addItem(idGive)
      removeItem(idCheck)
    }
  }

  const drawerCode = () => {
    removeItem("klic-od-supliku");
    setIsDrawerClicked(true);
  }

  const konec = () => {
    setScena("intro");
    clearItems();
    u("/");
  };

  useEffect(() => {
    fetchDialogue(3)
      .then((d) => d.dialogueText)
      .then(setDialog);
  }, []);

  const [scene, setScene] = useState<Scene | null>(null);

  useEffect(() => {
    const fetchScene = async () => {
      try {
        const res = await fetch("/api/scene/4");
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
        <img src={postava} alt="Postava" className={Styles["postava-sc3"]} />
        <div
          className="debug-tlacitko"
          onClick={() => klikTlacitko("klic-od-supliku")}
          style={{
            left: "5%",
            bottom: "38%",
            width: "14%",
            height: "27%",
          }}
        />
        <div
          className="debug-tlacitko"
          onClick={() => clickCheck("wire", "card")}
          style={{
            left: "75%",
            bottom: "30%",
            width: "18%",
            height: "36%",
          }}
        />
        <div
          className="debug-tlacitko"
          onClick={() => klikTlacitko("mug")}
          style={{
            left: "57%",
            bottom: "45%",
            width: "7%",
            height: "15%",
          }}
        />
        <div
          className="debug-tlacitko"
          onClick={() => drawerCode()}
          style={{
            left: "62%",
            bottom: "20%",
            width: "7%",
            height: "15%",
          }}
        />
        <div
          className="debug-tlacitko"
          onClick={() => konec()}
          style={{
            left: "95%",
            bottom: "92%",
            width: "5%",
            height: "auto",
            aspectRatio: 1 / 1,
          }}
        />
        {isDrawerClicked && (
          <div className={Styles["overlay-blur"]}>
            <div className={Styles["overlay"]}>
              <img className={Styles["overlay-img"]} src={overlay} alt="Phone Overlay" />
              <button className={Styles["overlay-close-button"]} onClick={() => setIsDrawerClicked(false)}>×</button>
            </div>
          </div>
        )}
        <button className="buttonBack" onClick={buttonBack}>Zpět</button>
      </div>
    </div>
  );
};

export default Sc3KancelarStarosty;
