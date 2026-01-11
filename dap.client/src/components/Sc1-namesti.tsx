import bg from "../assets/img/sc1-square.png";
import postava from "../assets/img/character.png";
import "../assets/styles/Intro.css";
import "../assets/styles/Sc1-namesti.css";
import Inventar from "../components/Inventar";
import { GameContext, type ItemId } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDialogue } from "../dialogApi";

const Sc1Namesti = () => {
  const game = useContext(GameContext);
  const [postup, setPostup] = useState(false);
  const [dialog, setDialog] = useState("prazdny text");

  if (!game) {
    throw new Error("Neni game");
  }

  const { setScena, addItem, hasItem, clearItems } = game;

  const klikTlacitko = (id: ItemId) => {
    console.log("Klik na hotspot:", id);
    addItem(id);
  };
  const u = useNavigate();
  useEffect(() => {
    if (postup) return;
    if (hasItem("wire") && hasItem("klic-od-radnice")) {
      setPostup(true);
      setScena("sc2");
      u("/sc2");
    }
  }, [hasItem, postup, setScena]);

  useEffect(() => {
    fetchDialogue(1)
      //{ dialogueId = 11, dialogueText = "zprava"}
      .then((d) => d.dialogueText)
      //"zprava"
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
        <img src={bg} className="bg" />
        <div className="inventar-sc1">
          <Inventar />
        </div>
        <div className="dialogText">"{dialog}"</div>
        <img src={postava} className="postava-sc1" />
        <div
          className="sc1-tlacitko"
          onClick={() => klikTlacitko("wire")}
          style={{
            left: "6%",
            bottom: "0%",
            width: "8%",
            height: "22%",
          }}
        />
        <div
          className="sc1-tlacitko"
          onClick={() => klikTlacitko("klic-od-radnice")}
          style={{
            left: "35%",
            bottom: "0%",
            width: "12%",
            height: "6%",
          }}
        />
        <div
          className="sc1-tlacitko"
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

export default Sc1Namesti;
