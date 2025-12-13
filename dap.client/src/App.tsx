
import ScenaProvider, { GameContext } from "./GameContext";
import './App.css'
import Intro from './assets/pages/Intro'
import Sc1Namesti from './assets/pages/Sc1-namesti'
import Sc2VstupniHala from './assets/pages/Sc2-vstupni-hala'
import Sc3KancelarStarosty from './assets/pages/Sc3-kancelar-starosty'
import Sc4SklepTrezor from './assets/pages/Sc4-sklep-trezor'
import { useContext } from "react";


function SceneSwitch() {
  const game = useContext(GameContext);
  if (!game) {
    return <div>GameContext chybí</div>;
  }
  const { scena } = game;

  switch (scena) {
    case "intro":
      return <Intro />;
    case "sc1":
      return <Sc1Namesti />;
    case "sc2":
      return <Sc2VstupniHala />;
    case "sc3":
      return <Sc3KancelarStarosty />;
    case "sc4":
      return <Sc4SklepTrezor />;
    default:
      return <div>Error scena: {scena}</div>;
  }
}

const App = () => {
  return (
    <ScenaProvider>
      <SceneSwitch />
    </ScenaProvider>
  );
}

export default App
