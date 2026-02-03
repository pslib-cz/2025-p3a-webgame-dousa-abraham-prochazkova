interface Dialogue {
  dialogueId: number;
  dialogueText: string;
};

type ItemId = number;

interface Item {
  itemId: ItemId;
  itemName: string;
  imageURL: string;
};

interface Scene {
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
  userId: number;
  interactionName: string;
  interactionType: string;
  requiredItemId?: ItemId;
  requiredItem?: Item;
  getItemId?: ItemId;
  getItem?: Item;
}

type ScProps = { sceneId: string };
export type { Dialogue, Item, ItemId, Scene, ScProps, Zone };
