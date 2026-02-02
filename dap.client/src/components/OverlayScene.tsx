import type { Scene, Zone } from "../assets/types/types";
import { GameContext, type ItemId } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDialogue } from "../dialogApi";

const OverlayScene = ({ sceneId }: { sceneId: string }) => {
    const game = useContext(GameContext);
    const navigate = useNavigate();

    const [scene, setScene] = useState<Scene | null>(null);
    const [zone, setZone] = useState<Zone[] | null>(null);
    const [dialog, setDialog] = useState("");
    const [loading, setLoading] = useState(true);

    if (!game) throw new Error("Neni game context");
    const { addItem, hasItem, removeItem, isDone, setDone, clearItems } = game;

    useEffect(() => {
        const sceneNumber = Number(sceneId);

        if (!sceneId || isNaN(sceneNumber) || sceneNumber < 6) return;

        const loadData = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/scene/${sceneId}`);

                if (!res.ok) {
                    throw new Error(`Scéna ${sceneId} nenalezena`);
                }

                const data: Scene = await res.json();
                setScene(data);
            } catch (err) {
                console.error("Chyba pøi naèítání:", err);
            } finally {
                setLoading(false);
            }


            try {
                setLoading(true);
                const res = await fetch(`/api/scene/${sceneId}/zones`);

                if (!res.ok) {
                    throw new Error(`Scéna ${sceneId} nenalezena`);
                }

                const zoneData: Zone[] = await res.json();
                setZone(zoneData);
            } catch (err) {
                console.error("Chyba pøi naèítání:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [sceneId]);

    if (loading || !scene) return <p>Naèítám...</p>;
    return (
        <div className="scena">
            <div className="grafika">
                {/* Pozadí z DB */}
                <img src={scene.sceneImage} className="bg" alt={scene.scene} />
                <div className="inventar">
                    <Inventar />
                </div>

                <div className="dialogText">"{dialog}"</div>

                {/* Postava - v CSS mùžeš mìnit class podle ID scény */}
                <img src={postava} className={`postava-sc${sceneId}`} />
                {/* DYNAMICKÉ GENEROVÁNÍ ZÓN */}
                {zone &&
                    zone.map((zone) => {
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
                    })
                }
            </div>
        </div>
    );
};

export default OverlayScene;