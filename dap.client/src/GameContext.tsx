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
  levers: boolean[];
  setLevers: (levers: boolean[]) => void;
  konec: () => void;
  message: string | null;
  setMessage: (n: string | null) => void;
  notification: (text: string) => void;
  buttonBack: () => void;
};

export const GameContext = createContext<GameContextValue | null>(null);

export const ScenaProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const correctCombination = [true, false, true, true];

  const [scena, setScena] = useState<ScenaId>(() => {
    try {
      const data = localStorage.getItem("stavhry");
      return JSON.parse(data || "{}").scena ?? "1";
    } catch { return "1"; }
  });

  const [items, setItems] = useState<ItemId[]>(() => {
    try {
      const data = localStorage.getItem("stavhry");
      return JSON.parse(data || "{}").items ?? [];
    } catch { return []; }
  });

  const [history, setHistory] = useState<string[]>(() => {
    try {
      const data = localStorage.getItem("stavhry");
      return JSON.parse(data || "{}").history ?? [];
    } catch { return []; }
  });

  const [levers, setLeversState] = useState<boolean[]>(() => {
    try {
      const data = localStorage.getItem("stavhry");
      return JSON.parse(data || "{}").levers ?? [false, false, false, false];
    } catch { return [false, false, false, false]; }
  });

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("stavhry", JSON.stringify({ scena, items, history, levers }));
  }, [scena, items, history, levers]);

  useEffect(() => {
    const leversOk = levers.every((val, i) => val === correctCombination[i]);
    const cardOk = history.includes("16");
    const waterOk = history.includes("18");

    if (leversOk && cardOk && waterOk) {
      const timer = setTimeout(() => {
        navigate("/6");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [levers, history, navigate]);

  const setLevers = (newLevers: boolean[]) => {
    setLeversState(newLevers);
  };

  const setDone = (id: string) => {
    setHistory((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const isDone = (id: string) => history.includes(id);

  const addItem = (item: ItemId) => {
    setItems((prev) => (prev.includes(item) ? prev : [...prev, item]));
  };

  const removeItem = (item: ItemId) => {
    setItems((prev) => prev.filter((i) => i !== item));
  };

  const hasItem = (item: ItemId) => items.includes(item);
  const clearItems = () => setItems([]);
  const notification = (text: string) => setMessage(text);
  const buttonBack = () => {
    if (scena === "4" || scena === "5" || scena === "10") {
      navigate("/3");
    }
    else { navigate(-1); }
  };

  const konec = () => {
    setHistory([]);
    setLeversState([false, false, false, false]);
    setScena("1");
    clearItems();
    navigate("/");
  };

  return (
    <GameContext.Provider
      value={{
        scena, setScena, items, addItem, removeItem, hasItem,
        clearItems, history, isDone, setDone, levers, setLevers,
        konec, message, setMessage, notification, buttonBack,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default ScenaProvider;