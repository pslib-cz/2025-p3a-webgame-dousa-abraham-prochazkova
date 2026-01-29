import type { Scene, ScProps } from "../assets/types/types";
import postava from "/img/character.png";
import Styles from "../assets/styles/Sc1-namesti.module.css";
import Inventar from "../components/Inventar";
import { GameContext, type ItemId } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDialogue } from "../dialogApi";

const Sc1Namesti = ({ sceneId }: ScProps) => {
  const game = useContext(GameContext);
  const [postup, setPostup] = useState(false);
  const [dialog, setDialog] = useState("prazdny text");

  if (!game) {
    throw new Error("Neni game");
  }

  const { setScena, addItem, hasItem, clearItems, removeItem } = game;
  const [scene, setScene] = useState<Scene | null>(null);

  const klikTlacitko = (id: ItemId) => {
    console.log("Klik na hotspot:", id);
    addItem(id);
  };
  const klikRemove = (id: ItemId) => {
    console.log("Odebrani itemu:", id);
    removeItem(id);
  };
  const klikCheck = (idCheck: ItemId, idGive: ItemId) => {
    if (hasItem(idCheck)) {
      addItem(idGive);
    }
  };
  const vstupRadnice = () => {
    if (hasItem("klic-od-radnice")) {
      setPostup(true);
      setScena("3");
      removeItem("klic-od-radnice");
      u("/3");
    }
  };
  const u = useNavigate(); /*
  useEffect(() => {
    if (postup) return;
    if (hasItem("wire") && hasItem("klic-od-radnice")) {
      setPostup(true);
      setScena("sc2");
      u("/sc2");
    }
  }, [hasItem, postup, setScena]);*/

  useEffect(() => {
    fetchDialogue(1)
      //{ dialogueId = 11, dialogueText = "zprava"}
      .then((d) => d.dialogueText)
      //"zprava"
      .then(setDialog);
  }, []);

  useEffect(() => {
    const fetchScene = async () => {
      try {
        console.log(sceneId);
        const res = await fetch("/api/scene/" + sceneId);
        if (!res.ok) throw new Error("Chyba při načítání scény");
        const data: Scene = await res.json();
        setScene(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchScene();
  }, []);

  const konec = () => {
    setScena("1");
    clearItems();
    u("/");
  };

  if (!scene) return <p>Načítám scénu...</p>;

  return (
    <div className="scena">
      <div className="grafika">
        <img src={`${scene.sceneImage}`} className="bg" />
        <div className="inventar">
          <Inventar />
        </div>
        <div className="dialogText">"{dialog}"</div>
        <img src={postava} className={Styles["postava-sc1"]} />
        <div
          className="debug-tlacitko"
          onClick={() => klikTlacitko("wire")}
          style={{
            left: "6%",
            bottom: "0%",
            width: "8%",
            height: "22%",
          }}
        />
        <div
          className="debug-tlacitko"
          onClick={() => klikCheck("wire", "klic-od-radnice")}
          style={{
            left: "35%",
            bottom: "0%",
            width: "12%",
            height: "6%",
          }}
        />
        <div
          className="debug-tlacitko"
          onClick={() => vstupRadnice()}
          style={{
            left: "36%",
            bottom: "33%",
            width: "7%",
            height: "18%",
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
      </div>
    </div>
  );
};

export default Sc1Namesti;
