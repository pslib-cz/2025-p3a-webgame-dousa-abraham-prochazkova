import ScenaProvider, { GameContext } from "./GameContext";
import "./App.css";
import Intro from "./components/Intro";
import { useContext, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";
import UniversalScene from "./components/Scene";
import OverlayScene from "./components/OverlayScene"

function SceneSwitch() {
  const { sceneId } = useParams<{ sceneId: string }>();
  const game = useContext(GameContext);

  const sceneNumber = Number(sceneId);

  useEffect(() => {
    if (sceneId && game && sceneId !== game.scena) {
      game.setScena(sceneId as any);
    }
  }, [sceneId, game]);

  // Pokud je v URL "intro" nebo "1", můžeme zobrazit Intro
  if (sceneId === "1") {
    return <Intro sceneId="1" />;
  }

  if (!isNaN(sceneNumber) && sceneNumber > 6) {
    return <OverlayScene sceneId={sceneId!} />;
  }
  // Vše ostatní vyřeší UniversalScene
  // Pokud v URL nic není, defaultně skočíme na scénu "1" (nebo "2")
  return <UniversalScene sceneId={sceneId || "1"} />;

}

const App = () => {
  return (
    <BrowserRouter>
      <ScenaProvider>
        <Routes>
          {/* Definujeme cestu pro ID scény */}
          <Route path="/:sceneId" element={<SceneSwitch />} />
          {/* Základní cesta přesměruje na intro */}
          <Route path="/" element={<Navigate to="/1" />} />
        </Routes>
      </ScenaProvider>
    </BrowserRouter>
  );
};

export default App;