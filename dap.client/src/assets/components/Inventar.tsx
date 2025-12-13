import ramecky from '../img/ramecky.png'
import '../styles/Inventar.css'
import klic from '../img/key1.png'
import drat from '../img/drat.png'
import karta from '../img/karta.png'
import pojistka from '../img/pojistka.png'
import navodNaPaky from '../img/navod-na-paky.png'
import hrnek from '../img/hrnek.png'

const Inventar = () => {
  // seznam predmetu, useState ??
  // -- je to drzeno v kontextu -- useContext()
  // predmety vykresli do obdelnickku

  const predmety = ["klic", "drat", "pojistka", "hrnek"]

  function getItemImage(id: string): string | null {
    switch (id) {
      case "drat":
        return drat;
      case "klic":
        return klic;
      case "karta":
        return karta;
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