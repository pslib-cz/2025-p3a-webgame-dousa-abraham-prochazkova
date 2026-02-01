import type { Scene, Zone } from "../assets/types/types";
import postava from "/img/character.png";
import Inventar from "../components/Inventar";
import { GameContext, type ItemId } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDialogue } from "../dialogApi";

const UniversalScene = ({ sceneId }: { sceneId: string }) => {
    const game = useContext(GameContext);
    const navigate = useNavigate();

    const [scene, setScene] = useState<Scene | null>(null);
    const [dialog, setDialog] = useState("");
    const [loading, setLoading] = useState(true);

    if (!game) throw new Error("Neni game context");
    const { addItem, hasItem, removeItem, isDone, setDone, clearItems } = game;

    // 1. Načtení dat scény z API
    useEffect(() => {
        // Pokud je sceneId undefined nebo prázdné, vůbec nic nedělej
        if (!sceneId || sceneId === "undefined") return;

        const loadData = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/scene/${sceneId}`);

                if (!res.ok) {
                    // Pokud server vrátí 400/404, vyhodíme chybu
                    throw new Error(`Scéna ${sceneId} nenalezena`);
                }

                const data: Scene = await res.json();
                setScene(data);
            } catch (err) {
                console.error("Chyba při načítání:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [sceneId]); // Důležité: Sledujeme změnu sceneId

    // 2. Univerzální handler pro klikání na zóny
    const handleZoneClick = (zone: Zone) => {
        console.log(`Interakce s: ${zone.interactionName} (${zone.interactionType})`);

        // Kontrola, zda hráč má potřebný item
        if (zone.requiredItem && !hasItem(zone.requiredItem as ItemId)) {
            setDialog(`Potřebuješ: ${zone.requiredItem}`);
            return;
        }

        switch (zone.interactionType) {
            case "getItem":
                addItem(zone.interactionName as ItemId);
                setDone(zone.interactionName); // Označíme jako sebrané
                break;

            case "nextScene":
                // Pokud interactionName obsahuje ID cílové scény (např. "3")
                navigate(`/${zone.interactionName}`);
                break;

            case "useItem":
                // Použije item a třeba někam pustí hráče
                if (zone.requiredItem) removeItem(zone.requiredItem as ItemId);
                setDone(zone.interactionName);
                break;

            case "finalScene":
                clearItems();
                navigate("/");
                break;
        }
    };

    if (loading || !scene) return <p>Načítám...</p>;
    return (
        <div className="scena">
            <div className="grafika">
                {/* Pozadí z DB */}
                <img src={scene.sceneImage} className="bg" alt={scene.scene} />
                <div className="inventar">
                    <Inventar />
                </div>

                <div className="dialogText">"{dialog}"</div>

                {/* Postava - v CSS můžeš měnit class podle ID scény */}
                <img src={postava} className={`postava-sc${sceneId}`} />

                {/* DYNAMICKÉ GENEROVÁNÍ ZÓN */}
                {scene.zones.map((zone) => {
                    // Pokud je to předmět a už je sebraný, nevykresluj ho
                    if (zone.interactionType === "getItem" && isDone(zone.interactionName)) {
                        return null;
                    }

                    return (
                        <div
                            key={zone.zoneId}
                            className="debug-tlacitko" // nebo Styles.hotspot
                            onClick={() => handleZoneClick(zone)}
                            style={{
                                position: "absolute",
                                left: `${zone.left}%`,
                                bottom: `${zone.bottom}%`,
                                width: `${zone.width}%`,
                                height: `${zone.height}%`,
                                cursor: "pointer",
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default UniversalScene;