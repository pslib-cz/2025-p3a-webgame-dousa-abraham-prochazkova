import bg from "../assets/img/sc3-office.png";
import postava from "../assets/img/character.png";
import Inventar from "../components/Inventar";
import "../assets/styles/Intro.css";
import "../assets/styles/Sc3-kancelar-starosty.css";
import { GameContext, type ItemId } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchDialogue from "../dialogApi";
import type { Item } from "../assets/types/types";

const Sc3KancelarStarosty = () => {
  const game = useContext(GameContext);
  const [postup, setPostup] = useState(false);
  const [dialog, setDialog] = useState("prazdny text");

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

  const clickCheck = (idCheck: ItemId, idGive: ItemId) => {
    if(hasItem(idCheck)) {
      addItem(idGive)
      removeItem(idCheck)
    }
  }

  const konec = () => {
    setScena("intro");
    clearItems();
    u("/");
  };

  useEffect(() => {
    if (postup) return;
    if (hasItem("card") && hasItem("kod") && hasItem("mug")) {
      setPostup(true);
      setScena("sc2");
      u("/sc2");
    }
  }, [hasItem, postup, setScena]);

  useEffect(() => {
    fetchDialogue(3)
      .then((d) => d.dialogueText)
      .then(setDialog);
  }, []);

  return (
    <div className="scena">
      <div className="grafika">
        <img src={bg} className="bg" alt="Kancelář" />
        <div className="inventar-sc3">
          <Inventar />
        </div>
        <div className="dialogText">"{dialog}"</div>
        <img src={postava} alt="Postava" className="postava-sc3" />
        <div
          className="sc3-tlacitko"
          onClick={() => klikTlacitko("klic-od-supliku")}
          style={{
            left: "5%",
            bottom: "38%",
            width: "14%",
            height: "27%",
          }}
        />
        <div
          className="sc3-tlacitko"
          onClick={() => clickCheck("wire", "card")}
          style={{
            left: "75%",
            bottom: "30%",
            width: "18%",
            height: "36%",
          }}
        />
        <div
          className="sc3-tlacitko"
          onClick={() => klikTlacitko("mug")}
          style={{
            left: "57%",
            bottom: "45%",
            width: "7%",
            height: "15%",
          }}
        />
        <div
          className="sc3-tlacitko"
          onClick={() => clickCheck("klic-od-supliku", "kod")}
          style={{
            left: "62%",
            bottom: "20%",
            width: "7%",
            height: "15%",
          }}
        />
        <div
          className="sc3-tlacitko"
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

export default Sc3KancelarStarosty;
