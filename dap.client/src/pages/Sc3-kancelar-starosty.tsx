import bg from '../assets/img/sc3-kancelar-starosty.png'
import postava from '../assets/img/character.png'
import Inventar from '../components/Inventar'
import '../assets/styles/Intro.css'
import '../assets/styles/Sc3-kancelar-starosty.css'
import { GameContext } from '../GameContext'
import { useContext } from 'react'

const Sc3KancelarStarosty = () => {
  const game = useContext(GameContext);
    
  if (!game) {
    throw new Error("Neni game");
  }

  const { setScena } = game;

  const klikTlacitko = (id: string) => {
      console.log("Klik na hotspot:", id);
      setScena("sc4"); // prozatim na test
  };

  const konec = () => {
      setScena("intro")
  }

    
    // return (
    //     <div className="scena">
    //         <img src={bg} alt="Kancelář" className="bg"/>
    //         <img src={postava} alt="Postava" className="postava-sc3"/>
    //     </div>
    // )
    return (
        <div className="scena">
            <div className="grafika">
              <img src={bg} className="bg" alt="Kancelář"/>
              <div className="inventar-sc3"><Inventar/></div>
              <img src={postava} alt="Postava" className="postava-sc3" />
              <div className="sc3-tlacitko" onClick={() => klikTlacitko("globus")} style={{
                              left: "5%",
                              bottom: "38%",
                              width: "14%",
                              height: "27%",
                            }}/>
              <div className="sc3-tlacitko" onClick={() => klikTlacitko("akvarko")} style={{
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
              <div className="sc1-tlacitko" onClick={() => konec()} style={{
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