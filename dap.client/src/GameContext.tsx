import {
  type FC,
  useEffect,
  createContext,
  useState,
  type PropsWithChildren,
} from "react";
import { useNavigate } from "react-router-dom";

type ScenaId = string;
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
  konec: () => void;
  message: string | null;
  setMessage: (n: string | null) => void;
  notification: (text: string) => void;
};

export const GameContext = createContext<GameContextValue | null>(null);

export const ScenaProvider: FC<PropsWithChildren> = ({ children }) => {

  const [scena, setScena] = useState<ScenaId>(() => {
    try {
      const data = localStorage.getItem("stavhry");
      if (!data) return "1";
      const parsed = JSON.parse(data) as { scena?: ScenaId; items?: ItemId[] };
      return parsed.scena ?? "1";
    } catch {
      return "1";
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
    setHistory((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const [message, setMessage] = useState<string | null>(null);

  const notification = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 200000);
  }

  const u = useNavigate();

  const konec = () => {
    setHistory([]);
    setScena("1");
    clearItems();
    u("/");
    console.log("Hra byla ukoncena a stav vymazan.");
  };

  const addItem = (item: ItemId) => {
    setItems((prev) => (prev.includes(item) ? prev : [...prev, item]));
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
        konec,
        message,
        setMessage,
        notification,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default ScenaProvider;
