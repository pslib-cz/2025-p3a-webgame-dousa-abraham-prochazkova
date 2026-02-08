import ScenaProvider, { GameContext } from "./GameContext";
import VerticalWarning from "./components/VerticalWarning";
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
import UniversalScene from "./components/UniversalScene";
import OverlayScene from "./components/OverlayScene"

function SceneSwitch() {
  const { sceneId } = useParams<{ sceneId: string }>();
  const game = useContext(GameContext);

  const isOnlyNumbers = sceneId && /^\d+$/.test(sceneId);

  if (!isOnlyNumbers) {
    return <Navigate to="/1" replace />;
  }

  const currentId = sceneId || "1";
  const sceneNumber = Number(currentId);

  useEffect(() => {
    if (currentId && game && currentId !== game.scena) {
      game.setScena(currentId);
    }
  }, [currentId, game]);

  // Pokud je v URL "intro" nebo "1", můžeme zobrazit Intro
  if (currentId === "1") {
    return <Intro sceneId="1" />;
  }

  if (!isNaN(sceneNumber) && sceneNumber > 6 && sceneNumber < 10) {
    return <OverlayScene sceneId={currentId} />;
  }
  return <UniversalScene sceneId={currentId} />;

}

const App = () => {
  return (
    <BrowserRouter>
      <ScenaProvider>
        <VerticalWarning />
        <Routes>
          <Route path="/" element={<Navigate to="/1" replace />} />
          <Route path="/:sceneId" element={<SceneSwitch />} />
          <Route path="*" element={<Navigate to="/1" replace />} />
        </Routes>
      </ScenaProvider>
    </BrowserRouter>
  );
};

export default App;