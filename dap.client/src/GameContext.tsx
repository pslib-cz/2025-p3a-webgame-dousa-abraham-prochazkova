import { type FC, useEffect, createContext, useContext, useState, type PropsWithChildren } from "react"

type ScenaId = "intro" | "sc1" | "sc2" | "sc3" | "sc4"

type GameContextValue = {
  scena: ScenaId;
  setScena: (scena: ScenaId) => void;
}

export const GameContext = createContext<GameContextValue | null>(null)

export const ScenaProvider: FC<PropsWithChildren> = ({ children }) => {
    const [scena, setScena] = useState<ScenaId>(() => {
      try {
        const data = localStorage.getItem("scenaId");
        if (!data) return "intro";
        const parsed = JSON.parse(data) as { scena?: ScenaId };
        return parsed.scena ?? "intro";
      } catch {
        return "intro";
      }
    });
    
    useEffect(() => {
      localStorage.setItem("scenaId", JSON.stringify({ scena }));
    }, [scena]);

    return (
        <GameContext.Provider value={{ scena, setScena }}>
          {children}
        </GameContext.Provider>
      );
}

export default ScenaProvider;