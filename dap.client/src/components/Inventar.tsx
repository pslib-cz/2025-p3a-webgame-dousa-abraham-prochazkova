import Style from "../assets/styles/Inventar.module.css";
import { GameContext } from "../GameContext";
import type { Item } from "../assets/types/types";
import { useContext, useEffect, useState } from "react";

const Inventar = () => {
  const game = useContext(GameContext);
  const [dbItems, setDbItems] = useState<Item[]>([]);

  if (!game) {
    throw new Error("Neni game");
  }

  const { items } = game;


  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const res = await fetch("/api/item");
        if (res.ok) {
          const data: Item[] = await res.json();
          setDbItems(data);
        }
      } catch (err) {
        console.error("Chyba při načítání číselníku předmětů:", err);
      }
    };

    fetchAllItems();
  }, []);

  const getItemData = (itemId: number) => {
    return dbItems.find((item) => item.itemId === itemId);
  }

  const maxSlots = 6;
  const slots = Array.from({ length: maxSlots }, (_, i) => {
    const itemId = items[i];
    return itemId ? getItemData(itemId) : null;
  });

  return (
    <>
      <div className={Style["inventory-bar"]}>
        {slots.map((item, index) => (
          <div className={Style["inventory-slot"]} key={index}>
            {item && (
              <img
                src={item.imageURL}
                alt={item.itemName}
                title={item.itemName}
                className={Style["inventory-item"]}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Inventar;
