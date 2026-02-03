import "../assets/styles/Inventar.css";
import klic1 from "/img/key1.png";
import klic2 from "/img/key2.png";
import wire from "/img/wire.png";
import card from "/img/card.png";
import kod from "/img/kod.png";
import coil from "/img/coil.png";
import leverscomb from "/img/levers-comb.png";
import mug from "/img/mug.png";
import { GameContext, type ItemId } from "../GameContext";
import { useContext } from "react";

const Inventar = () => {
  const game = useContext(GameContext);

  if (!game) {
    throw new Error("Neni game");
  }

  const { items } = game;

  const predmety = items;

  function getItemImage(id: ItemId): string | null {
    switch (id) {
      case "wire":
        return wire;
      case "klic-od-radnice":
        return klic1;
      case "klic-od-supliku":
        return klic2;
      case "card":
        return card;
      case "kod":
        return kod;
      case "coil":
        return coil;
      case "levers-comb":
        return leverscomb;
      case "mug":
        return mug;
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
              {src && (
                <img src={src} alt={itemId ?? ""} className="inventory-item" />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Inventar;
