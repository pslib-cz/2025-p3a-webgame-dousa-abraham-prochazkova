
import type { Scene } from "../assets/types/types";
import Styles from "../assets/styles/Intro.module.css";
import { GameContext } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
    const game = useContext(GameContext);
    const [scene, setScene] = useState<Scene | null>(null);

  if (!game) {
    throw new Error("Neni game");
  }

  const { setScena } = game;
  const u = useNavigate();
  const klikTlacitkoStart = () => {
    setScena("sc1");
    //const u = useNavigate();
    u("/sc1");
    };

    useEffect(() => {
        const fetchScene = async () => {
            try {
                const res = await fetch("https://localhost:7219/api/scene/1");
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
        <button className={Styles["start-tlacitko"]} onClick={klikTlacitkoStart}>
          Nová hra
        </button>
      </div>
    </div>
  );
};

export default Intro;
