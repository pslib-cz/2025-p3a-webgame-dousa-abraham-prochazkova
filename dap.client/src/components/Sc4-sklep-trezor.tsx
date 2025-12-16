import bg from '../assets/img/sc4-sklep-trezor.png'
import postava from '../assets/img/character.png'
import Inventar from '../components/Inventar'
import '../assets/styles/Intro.css'
import '../assets/styles/Sc4-sklep-trezor.css'
import { GameContext } from '../GameContext'
import { useContext } from 'react'

const Sc4SklepTrezor = () => {
  const game = useContext(GameContext);
        
  if (!game) {
    throw new Error("Neni game");
  }
    
  const { setScena, removeItem, clearItems } = game;
  const konec = () => {
    setScena("intro")
    clearItems()
  }

    const vodaDoGen = () => {
        removeItem("hrnek")
    };

    const nastavPaky = () => {
      removeItem("navod-na-paky")
    }

    const magnetickaKarta = () => {
      removeItem("karta")
      setScena("sc5")
    }

    return (
        <div className="scena">
            <div className="grafika">
                <img src={bg} alt="Trezor" className="bg"/>
                <div className="inventar-sc4"><Inventar/></div>
                <img src={postava} alt="Postava" className="postava-sc4" />
              <div className="sc4-tlacitko" onClick={() => vodaDoGen()} style={{
                              left: "5%",
                              bottom: "42%",
                              width: "20%",
                              height: "22%",
                            }}/>
              <div className="sc4-tlacitko" onClick={() => nastavPaky()} style={{
                              left: "15%",
                              bottom: "27%",
                              width: "13%",
                              height: "13%",
                            }}/>
              <div className="sc4-tlacitko" onClick={() => magnetickaKarta()} style={{
                              left: "72%",
                              bottom: "39%",
                              width: "6%",
                              height: "13%",
                            }}/>
                <div className="sc4-tlacitko" onClick={() => konec()} style={{
                                right: "0%",
                                top: "0%",
                                width: "5%",
                                height: "auto",
                                aspectRatio: 1/1
                              }}/>
            </div>
        </div>
    )
}

export default Sc4SklepTrezor