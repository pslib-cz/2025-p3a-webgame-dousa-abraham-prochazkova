import bg from '../img/sc3-kancelar-starosty.png'
import postava from '../img/character.png'
import Inventar from './Inventar'
import '../styles/Intro.css'
import '../styles/Sc3-kancelar-starosty.css'
import { GameContext, type ItemId } from '../../GameContext'
import { useContext, useEffect, useState } from 'react'

const Sc3KancelarStarosty = () => {
  const game = useContext(GameContext);
  const [postup, setPostup] = useState(false);
    
  if (!game) {
    throw new Error("Neni game");
  }

  const { setScena, addItem, removeItem, hasItem, clearItems } = game;

  const klikTlacitko = (id: ItemId) => {
      console.log("Klik na hotspot:", id);
      if (id === "karta") {
        removeItem("drat")
      }
      if (id === "kod" && ! hasItem("klic-od-supliku")) return
      addItem(id)
  };

  const konec = () => {
      setScena("intro")
      clearItems()
  }

  useEffect(() => {
              if (postup) return
              if (hasItem("karta") && hasItem("kod") && hasItem("hrnek")) {
                  setPostup(true)
                  setScena("sc2")
              }
      }, [hasItem, postup, setScena])

    return (
        <div className="scena">
            <div className="grafika">
              <img src={bg} className="bg" alt="Kancelář"/>
              <div className="inventar-sc3"><Inventar/></div>
              <img src={postava} alt="Postava" className="postava-sc3" />
              <div className="sc3-tlacitko" onClick={() => klikTlacitko("klic-od-supliku")} style={{
                              left: "5%",
                              bottom: "38%",
                              width: "14%",
                              height: "27%",
                            }}/>
              <div className="sc3-tlacitko" onClick={() => klikTlacitko("karta")} style={{
                              left: "75%",
                              bottom: "30%",
                              width: "18%",
                              height: "36%",
                            }}/>
              <div className="sc3-tlacitko" onClick={() => klikTlacitko("hrnek")} style={{
                              left: "57%",
                              bottom: "45%",
                              width: "7%",
                              height: "15%",
                            }}/>
              <div className="sc3-tlacitko" onClick={() => klikTlacitko("kod")} style={{
                              left: "62%",
                              bottom: "20%",
                              width: "7%",
                              height: "15%",
                            }}/>
              <div className="sc3-tlacitko" onClick={() => konec()} style={{
                              right: "0%",
                              top: "0%",
                              width: "5%",
                              height: "auto",
                              aspectRatio: 1/1
                            }}/>

            </div>
        </div>
    );
}

export default Sc3KancelarStarosty