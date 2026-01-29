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
  userId: number;
  scene: string;
  sceneImage: string;
  zones: Zone[];
};

type Zone = {
  zoneId: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
  userId: number;
}

type ScProps = { sceneId: string };
export type { Dialogue, Item, Minigame, Scene, ScProps, Zone };
