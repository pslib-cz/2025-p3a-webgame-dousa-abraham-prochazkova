import type { Scene, ScProps } from "../assets/types/types";
import { GameContext } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDialogue } from "../dialogApi";

const Sc5Trezor = ({ sceneId }: ScProps) => {
  const game = useContext(GameContext);
  const [dialog, setDialog] = useState("prazdny text");

  if (!game) {
    throw new Error("Neni game");
  }

  const { setScena, clearItems } = game;
  const u = useNavigate();
  const konec = () => {
    setScena("1");
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

  if (!scene) return <p>Na��t�m sc�nu...</p>;

  return (
    <div className="scena">
      <div className="grafika">
        <img src={`${scene.sceneImage}`} className="bg" />
        <div className="dialogText">"{dialog}"</div>
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

export default Sc5Trezor;
