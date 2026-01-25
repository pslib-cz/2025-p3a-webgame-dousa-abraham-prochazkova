import type { Scene } from "../assets/types/types";
import { GameContext } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDialogue } from "../dialogApi";

const Sc5Trezor = () => {
  const game = useContext(GameContext);
  const [dialog, setDialog] = useState("prazdny text");

  if (!game) {
    throw new Error("Neni game");
  }

  const { setScena, clearItems } = game;
  const u = useNavigate();
  const konec = () => {
    setScena("intro");
    clearItems();
    u("/");
  };

  useEffect(() => {
    fetchDialogue(5)
      .then((d) => d.dialogueText)
      .then(setDialog);
  }, []);

    const [scene, setScene] = useState<Scene | null>(null);

    useEffect(() => {
        const fetchScene = async () => {
            try {
                const res = await fetch("https://localhost:7219/api/scene/5");
                if (!res.ok) throw new Error("Chyba pøi naèítání scény");
                const data: Scene = await res.json();
                setScene(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchScene();
    }, []);

    if (!scene) return <p>Naèítám scénu...</p>;

  return (
    <div className="scena">
      <div className="grafika">
        <img src={`https://localhost:7219${scene.sceneImage}`} className="bg" />
        <div className="dialogText">"{dialog}"</div>
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
      </div>
    </div>
  );
};

export default Sc5Trezor;
