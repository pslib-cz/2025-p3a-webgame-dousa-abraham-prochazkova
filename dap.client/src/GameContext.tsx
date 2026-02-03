import {
  type FC,
  useEffect,
  createContext,
  useState,
  type PropsWithChildren,
} from "react";
import { useNavigate } from "react-router-dom";
import type { ItemId } from "./assets/types/types";

type ScenaId = string;
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
  buttonBack: () => void;
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

  const isDone = (id: string) => history.includes(id);

  const buttonBack = () => {
    navigate(-1);
  }

  const [message, setMessage] = useState<string | null>(null);

  const notification = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 2500);
  }

  const navigate = useNavigate();

  const konec = () => {
    setHistory([]);
    setScena("1");
    clearItems();
    navigate("/");
    console.log("Hra byla ukoncena a stav vymazan.");
  };

  const addItem = (item: ItemId) => {
    setItems((prev) => (prev.includes(item) ? prev : [...prev, item]));
  };

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
        buttonBack,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default ScenaProvider;
