import ScenaProvider, { GameContext } from "./GameContext";
import "./App.css";
import Intro from "./components/Intro";
import Sc1Namesti from "./components/Sc1-namesti";
import Sc2VstupniHala from "./components/Sc2-vstupni-hala";
import Sc3KancelarStarosty from "./components/Sc3-kancelar-starosty";
import Sc4SklepTrezor from "./components/Sc4-sklep-trezor";
import Sc5Trezor from "./components/Sc5-trezor";
import { useContext, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";

function SceneSwitch() {
  const { sceneId } = useParams<{ sceneId: any }>();
  const game = useContext(GameContext);

  if (!game) return null;

  useEffect(() => {
    if (sceneId && sceneId !== game.scena) {
      game.setScena(sceneId);
    }
  }, [sceneId]);

  switch (sceneId) {
    case "1":
      return <Intro sceneId={sceneId} />;
    case "2":
      return <Sc1Namesti sceneId={sceneId} />;
    case "3":
      return <Sc2VstupniHala sceneId={sceneId} />;
    case "4":
      return <Sc3KancelarStarosty sceneId={sceneId} />;
    case "5":
      return <Sc4SklepTrezor sceneId={sceneId} />;
    case "6":
      return <Sc5Trezor sceneId={sceneId} />;
    default:
      return <Navigate to="/1" />;
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
