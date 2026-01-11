type Dialogue = {
  dialogueId: number;
  dialogueText: string;
};

type Item = {
  ItendID: string;
  ItemName: string;
  ImageURL: string;
};

type Minigame = {
  MinigameID: number;
  MinigameName: string;
  MinigameDesc: string;
};

type Scene = {
  SceneID: number;
  SceneName: string;
  ImageURL: string;
};

export type { Dialogue, Item, Minigame, Scene };
