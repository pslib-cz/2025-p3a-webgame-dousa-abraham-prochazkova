
import ScenaProvider, { GameContext } from "./GameContext";
import './App.css'
import Intro from './assets/components/Intro'
import Sc1Namesti from './assets/components/Sc1-namesti'
import Sc2VstupniHala from './assets/components/Sc2-vstupni-hala'
import Sc3KancelarStarosty from './assets/components/Sc3-kancelar-starosty'
import Sc4SklepTrezor from './assets/components/Sc4-sklep-trezor'
import Sc5Trezor from './assets/components/Sc5-trezor'
import { useContext } from "react";


  function SceneSwitch() {
    const game  = useContext(GameContext);
    if (!game) {
     return <div>GameContext chybí</div>;
    }
    const {scena} = game;

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
      case "sc5":
        return <Sc5Trezor/>;
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
