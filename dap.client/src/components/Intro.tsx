import type { UserScene, ScProps } from "../assets/types/types";
import Styles from "../assets/styles/Intro.module.css";
import { GameContext } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Intro = ({ sceneId }: ScProps) => {
  const game = useContext(GameContext);
  const [scene, setScene] = useState<UserScene | null>(null);

  if (!game) {
    throw new Error("Neni game");
  }

  const { setScena } = game;
  const u = useNavigate();
  const klikTlacitkoStart = () => {
    setScena("2");
    //const u = useNavigate();
    u("/2");
  };

  useEffect(() => {
    const fetchScene = async () => {
      try {
        const res = await fetch("/api/scene/" + sceneId);
        if (!res.ok) throw new Error("Chyba při načítání scény");
        const data: UserScene = await res.json();
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
        <img src={`${scene.sceneImage}`} className="bg" alt={scene.scene} />
        <button
          className={Styles["start-tlacitko"]}
          onClick={klikTlacitkoStart}
        >
          Nová hra
        </button>
      </div>
    </div>
  );
};

export default Intro;
