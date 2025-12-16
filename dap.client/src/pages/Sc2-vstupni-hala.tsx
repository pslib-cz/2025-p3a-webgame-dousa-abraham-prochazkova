import bg from '../assets/img/sc2-vstupni-hala.png'
import postava from '../assets/img/character.png'
import Inventar from '../components/Inventar'
import '../assets/styles/Intro.css'
import '../assets/styles/Sc2-vstupni-hala.css'
import { GameContext, type ItemId } from '../GameContext'
import { useContext, useEffect, useState } from 'react'

const Sc2VstupniHala = () => {
    const game = useContext(GameContext);
    const [postup, setPostup] = useState(false);

    if (!game) {
      throw new Error("Neni game");
    }

    const { setScena, addItem, hasItem, clearItems } = game;

    const klikTlacitko = (id: ItemId) => {
        console.log("Klik na hotspot:", id)
        addItem(id)
    };

    useEffect(() => {
            if (postup) return
            if (hasItem("pojistka") && hasItem("navod-na-paky")) {
                setPostup(true)
                setScena("sc3")
            }
    }, [hasItem, postup, setScena])
    

    const konec = () => {
        setScena("intro")
        clearItems()
    }


    // return (
    //     <div className="scena">
    //         <img src={bg} alt="Vstupní hala" className="bg"/>
    //         <img src={postava} alt="Postava" className="postava-sc2"/>
    //     </div>
    // )
    return (
        <div className="scena">
            <div className="grafika">
              <img src={bg} className="bg" alt="Vstupní hala"/>
              <div className="inventar-sc2"><Inventar/></div>
              <img src={postava} alt="Postava" className="postava-sc2" />
              <div className="sc2-tlacitko" onClick={() => klikTlacitko("navod-na-paky")} style={{
                              left: "2%",
                              bottom: "55%",
                              width: "7%",
                              height: "22%",
                            }}/>
              <div className="sc2-tlacitko" onClick={() => klikTlacitko("pojistka")} style={{
                              left: "62%",
                              bottom: "40%",
                              width: "12%",
                              height: "36%",
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

export default Sc2VstupniHala