import ScenaProvider, { GameContext } from "./GameContext";
import "./App.css";
import Intro from "./components/Intro";
import Sc1Namesti from "./components/Sc1-namesti";
import Sc2VstupniHala from "./components/Sc2-vstupni-hala";
import Sc3KancelarStarosty from "./components/Sc3-kancelar-starosty";
import Sc4SklepTrezor from "./components/Sc4-sklep-trezor";
import Sc5Trezor from "./components/Sc5-trezor";
import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useParams } from "react-router-dom";

function SceneSwitch() {
  const { sceneId } = useParams<{ sceneId: any }>();
  const game = useContext(GameContext);

  if (!game) return null;

  // Synchronizace URL do Contextu (aby se uložila do localStorage)
  useEffect(() => {
    if (sceneId && sceneId !== game.scena) {
      game.setScena(sceneId);
    }
  }, [sceneId]);

  // Výběr komponenty podle ID v URL
  switch (sceneId) {
    case "intro": return <Intro />;
    case "sc1": return <Sc1Namesti />;
    case "sc2": return <Sc2VstupniHala />;
    case "sc3": return <Sc3KancelarStarosty />;
    case "sc4": return <Sc4SklepTrezor />;
    case "sc5": return <Sc5Trezor />;
    default: return <Navigate to="/intro" />; // Pokud je URL špatně, hodí nás to na začátek
  }
}

const App = () => {
  return (
    <BrowserRouter>
      <ScenaProvider>
        <Routes>
          <Route path="/:sceneId" element={<SceneSwitch />} />
          <Route path="/" element={<Navigate to="/intro" />} />
        </Routes>
      </ScenaProvider>
    </BrowserRouter>
  );
};

export default App;