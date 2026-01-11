import type { Dialogue } from "./assets/types/types";

export async function fetchDialogue(id: number): Promise<Dialogue> {
    const res = await fetch(`http://127.0.0.1:5274/Dialogue/${id}`);

    if (!res.ok) {
      if (res.status === 404) throw new Error("Nenalezen");
      throw new Error(`Error: ${res.status}`);
    }

    return res.json();
  }

  export default fetchDialogue
