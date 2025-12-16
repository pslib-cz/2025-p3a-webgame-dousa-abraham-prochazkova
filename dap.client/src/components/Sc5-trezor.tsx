import bg from '../assets/img/skeleton.png'
import { GameContext } from '../GameContext'
import { useContext } from 'react'


const Sc5Trezor = () => {
  const game = useContext(GameContext);
        
  if (!game) {
    throw new Error("Neni game");
  }
    
  const { setScena, clearItems } = game;
  const konec = () => {
    setScena("intro")
    clearItems()
  }


    return (
        <div className="scena">
            <div className="grafika">
                <img src={bg} alt="Trezor" className="bg"/>
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

export default Sc5Trezor