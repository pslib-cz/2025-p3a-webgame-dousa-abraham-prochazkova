import ScenaProvider, { GameContext } from "./GameContext";
import "./App.css";
import Intro from "./components/Intro";
import Sc1Namesti from "./components/Sc1-namesti";
import Sc2VstupniHala from "./components/Sc2-vstupni-hala";
import Sc3KancelarStarosty from "./components/Sc3-kancelar-starosty";
import Sc4SklepTrezor from "./components/Sc4-sklep-trezor";
import Sc5Trezor from "./components/Sc5-trezor";
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
    case "sc5":
      return <Sc5Trezor />;
    default:
      return <div>Error scena: {scena}</div>;
  }
}

const App = () => {
  return (
    <BrowserRouter>
      <ScenaProvider>
        <Routes>
          <Route path="/" element={<Intro />}></Route>
          <Route path="/sc1" element={<Sc1Namesti />}></Route>
          <Route path="/sc2" element={<Sc2VstupniHala />}></Route>
          <Route path="/sc3" element={<Sc3KancelarStarosty />}></Route>
          <Route path="/sc4" element={<Sc4SklepTrezor />}></Route>
          <Route path="/sc5" element={<Sc5Trezor />}></Route>
        </Routes>
      </ScenaProvider>
    </BrowserRouter>
  );
};

export default App;
