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
    
  const { setScena } = game;
  const konec = () => {
    setScena("intro")
  }

    return (
        <div className="scena">
            <div className="grafika">
                <img src={bg} alt="Trezor" className="bg"/>
                <div className="inventar-sc4"><Inventar/></div>
                <img src={postava} alt="Postava" className="postava-sc4" />
                <div className="sc1-tlacitko" onClick={() => konec()} style={{
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