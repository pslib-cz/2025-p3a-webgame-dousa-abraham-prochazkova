interface Dialogue {
  dialogueId: number;
  dialogueText: string;
};

type ItemId = number;

interface Item {
  itemId: number;
  itemName: string;
  imageURL: string;
};

interface UserScene {
  userId: number;
  scene: string;
  sceneImage: string;
  zones: Zone[];
};

interface Zone {
  zoneId: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
  interactionName: string;
  interactionType: string;
  requiredItemId?: number;
  requiredItem?: Item;
  getItemId?: number;
  getItem?: Item;
  userId: number;
  targetSceneId?: number;
  targetScene?: UserScene;
}

type ScProps = { sceneId: string };
export type { Dialogue, Item, ItemId, UserScene, ScProps, Zone };