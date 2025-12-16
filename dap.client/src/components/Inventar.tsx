import '../assets/styles/Inventar.css'
import klic1 from '../assets/img/key1.png'
import klic2 from '../assets/img/key2.png'
import drat from '../assets/img/drat.png'
import karta from '../assets/img/karta.png'
import kod from '../assets/img/kod.png'
import pojistka from '../assets/img/pojistka.png'
import navodNaPaky from '../assets/img/navod-na-paky.png'
import hrnek from '../assets/img/hrnek.png'
import { GameContext, type ItemId } from '../GameContext'
import { useContext } from 'react'

const Inventar = () => {
    const game = useContext(GameContext);

    if (!game) {
      throw new Error("Neni game");
    }

    const { items } = game;

    const predmety = items;

    function getItemImage(id: ItemId): string | null {
      switch (id) {
        case "drat":
          return drat;
        case "klic-od-radnice":
          return klic1;
        case "klic-od-supliku":
          return klic2;
        case "karta":
          return karta;
        case "kod":
          return kod;
        case "pojistka":
          return pojistka;
        case "navod-na-paky":
          return navodNaPaky;
        case "hrnek":
          return hrnek;
        default:
          return null;
      }
    }

    console.log("Seznam itemu " + predmety)

    return (
        <>
            <div className="inventory-bar">
              {predmety.map((itemId, index) => {
                const src = itemId ? getItemImage(itemId) : null;
                return (
                  <div className="inventory-slot" key={index}>
                    {src && <img src={src} alt={itemId ?? ""} className="inventory-item" />}
                  </div>
                );
              })}
            </div>
        </>
    )
}

export default Inventar