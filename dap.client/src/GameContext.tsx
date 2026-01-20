import {
  type FC,
  useEffect,
  createContext,
  useState,
  type PropsWithChildren,
} from "react";

type ScenaId = "intro" | "sc1" | "sc2" | "sc3" | "sc4" | "sc5";
export type ItemId =
  | "wire"
  | "klic-od-radnice"
  | "klic-od-supliku"
  | "coil"
  | "card"
  | "mug"
  | "levers-comb"
  | "kod";
type GameContextValue = {
  scena: ScenaId;
  setScena: (scena: ScenaId) => void;
  items: ItemId[];
  addItem: (item: ItemId) => void;
  removeItem: (item: ItemId) => void;
  hasItem: (item: ItemId) => boolean;
  clearItems: () => void;
  history: string[];
  isDone: (id: string) => boolean;
  setDone: (id: string) => void;
};


export const GameContext = createContext<GameContextValue | null>(null);

export const ScenaProvider: FC<PropsWithChildren> = ({ children }) => {

  const [isCoilRequired, setIsCoilRequired] = useState(true);

  const [scena, setScena] = useState<ScenaId>(() => {
    try {
      const data = localStorage.getItem("stavhry");
      if (!data) return "intro";
      const parsed = JSON.parse(data) as { scena?: ScenaId; items?: ItemId[] };
      return parsed.scena ?? "intro";
    } catch {
      return "intro";
    }
  });

  const [items, setItems] = useState<ItemId[]>(() => {
    try {
      const data = localStorage.getItem("stavhry");
      if (!data) return [];
      const parsed = JSON.parse(data) as { scena?: ScenaId; items?: ItemId[] };
      return parsed.items ?? [];
    } catch {
      return [];
    }
  });
  const [history, setHistory] = useState<string[]>(() => {
    const data = localStorage.getItem("stavhry");
    return JSON.parse(data || "{}").history ?? [];
  });

  useEffect(() => {
    localStorage.setItem("stavhry", JSON.stringify({ scena, items, history }));
  }, [scena, items, history]);

  const setDone = (id: string) => {
    setHistory(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const addItem = (item: ItemId) => {
    setItems(prev => prev.includes(item) ? prev : [...prev, item]);
    setDone(item);
  };
  const isDone = (id: string) => history.includes(id);

  const removeItem = (item: ItemId) => {
    setItems((asf) => {
      if (asf.includes(item)) {
        return asf.filter((i) => i !== item);
      }
      return asf;
    });
  };

  const hasItem = (item: ItemId) => {
    return items.includes(item);
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <GameContext.Provider
      value={{
        scena,
        setScena,
        items,
        addItem,
        removeItem,
        hasItem,
        clearItems,
        history,
        isDone,
        setDone,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default ScenaProvider;
