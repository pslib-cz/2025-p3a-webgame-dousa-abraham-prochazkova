import type { UserScene, Zone } from "../assets/types/types";
import Styles from "../assets/styles/UniversalScene.module.css";
import Inventar from "./Inventar";
import Notifications from "./Notification";
import { GameContext } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UniversalScene = ({ sceneId }: { sceneId: string }) => {
    const game = useContext(GameContext);
    const navigate = useNavigate();

    const [scene, setScene] = useState<UserScene | null>(null);
    const [loading, setLoading] = useState(true);

    if (!game) throw new Error("Neni game context");
    const { addItem, hasItem, removeItem, isDone, setDone, clearItems, konec, message, buttonBack } = game;


    useEffect(() => {
        if (!sceneId || sceneId === "undefined") return;

        if (sceneId === "4" && isDone("9")) {
            navigate("/10");
            return;
        }

        const loadData = async () => {
            try {
                if (!scene) {
                    setLoading(true);
                }

                const res = await fetch(`/api/scene/${sceneId}`);

                if (!res.ok) {
                    navigate("/1");
                    throw new Error(`Scéna ${sceneId} nenalezena`);
                }
                const data: UserScene = await res.json();

                if (sceneId === "10") {
                    const res4 = await fetch(`/api/scene/4`);
                    if (res4.ok) {
                        const data4: UserScene = await res4.json();
                        data.zones = data4.zones;
                    }
                }

                setScene(data);
            } catch (err) {
                console.error("Chyba při načítání:", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [sceneId]);

    const handleZoneClick = (zone: Zone) => {

        if (loading) return;

        switch (zone.interactionType) {
            case "getItem":
                if (!zone.requiredItemId) {
                    addItem(zone.getItemId as any);
                    game.notification(`Získal jsi: ${zone.getItem?.itemName}`);
                    setDone(zone.zoneId.toString());
                    return;
                } else if (zone.requiredItemId && hasItem(zone.requiredItemId)) {
                    if (zone.requiredItemId === 1) {
                        addItem(zone.getItemId as any);
                        game.notification(`Získal ${zone.getItem?.itemName}`);
                        setDone(zone.zoneId.toString());
                    } else {
                        removeItem(zone.requiredItemId);
                        addItem(zone.getItemId as any);
                        game.notification(`Použil jsi: ${zone.requiredItem?.itemName} a získal ${zone.getItem?.itemName}`);
                        setDone(zone.zoneId.toString());
                    }
                    return
                } else if (zone.requiredItemId && !hasItem(zone.requiredItemId)) {
                    game.notification(`Potřebuješ: ${zone.requiredItem?.itemName}`);
                    return;
                }
                break;

            case "nextScene":
                if (zone.zoneId === 9) {
                    removeItem(zone.requiredItemId as any);
                    addItem(zone.getItemId as any);
                    setDone(zone.zoneId.toString());
                    game.notification(`Získal jsi: ${zone.getItem?.itemName}`);
                    navigate(`/${zone.targetSceneId}`);
                    return;
                }
                if (isDone(zone.zoneId.toString())) {
                    navigate(`/${zone.targetSceneId}`);
                    return;
                } else if (zone.requiredItemId && hasItem(zone.requiredItemId) && !isDone(zone.zoneId.toString())) {
                    removeItem(zone.requiredItemId);
                    setDone(zone.zoneId.toString());
                    navigate(`/${zone.targetSceneId}`);
                } else if (zone.requiredItemId && !hasItem(zone.requiredItemId)) {
                    game.notification(`Potřebuješ: ${zone.requiredItem?.itemName}`);
                } else if (zone.requiredItemId === null) {
                    navigate(`/${zone.targetSceneId}`);
                }
                break;

            case "useItem":
                if (zone.requiredItemId) {
                    if (hasItem(zone.requiredItemId)) {
                        removeItem(zone.requiredItemId);
                        setDone(zone.zoneId.toString());
                        game.notification(`Použil jsi: ${zone.requiredItem?.itemName}`);
                    } else {
                        game.notification(`Potřebuješ: ${zone.requiredItem?.itemName}`);
                    }
                }
                break;

            case "phoneClicked":
                let fixed = isDone("phone-coil");

                if (!fixed) {
                    if (hasItem(3)) {
                        removeItem(3);
                        setDone("phone-coil");
                        fixed = true;
                        game.notification("Použil jsi cívku k opravě telefonu.");
                    } else {
                        game.notification("Telefon je rozbitý. Potřebuješ něco k opravě.");
                        return;
                    }
                } else {
                    if (!isDone("phone-correct")) {
                        navigate(`/${zone.interactionName}`);
                        game.notification("Je potřeba zadat správný kód.");
                    } else if (isDone("phone-correct")) {
                        navigate("/5");
                        game.notification("Přešel jsi do scény 5.");
                    }
                }

                break;
            case "finalScene":
                if (zone.requiredItemId && !hasItem(zone.requiredItemId)) {
                    game.notification(`Potřebuješ: ${zone.requiredItem?.itemName}`);
                } else {
                    clearItems();
                    navigate("/6");
                    game.notification("Hra byla ukončena a stav vymazán.");
                }
                break;
        }
    };



    if (!scene && loading) return <div>Načítám svět...</div>;
    if (!scene) return null;

    return (
        <div className="scena">
            <div className="grafika">
                {message && <Notifications />}
                <img src={scene.sceneImage} className="bg" alt={scene.scene} />

                {sceneId !== "6" && <Inventar />}


                {sceneId === "6" && (
                    <div className={Styles["final-screen-container"]}>
                        <div className={Styles["final-card"]}>
                            <h1 className={Styles["final-title"]}>Jsi legenda, zachránil jsi starostu!</h1>
                            <button
                                className={Styles["final-button"]}
                                onClick={() => {
                                    konec();
                                }}
                            >
                                UKONČIT HRU
                            </button>
                        </div>
                    </div>
                )}

                {scene.zones &&
                    scene.zones.map((zone) => {
                        if (isDone(zone.zoneId.toString()) && zone.interactionType !== "nextScene" || isDone(zone.zoneId.toString()) && zone.zoneId === 9) {
                            return null;
                        }
                        return (
                            <div
                                key={zone.zoneId}
                                className="debug-tlacitko"
                                onClick={() => handleZoneClick(zone)}
                                style={{
                                    position: "absolute",
                                    left: `${zone.left}%`,
                                    bottom: `${zone.bottom}%`,
                                    width: `${zone.width}%`,
                                    height: `${zone.height}%`,
                                }}
                            />
                        );
                    })
                }

                {(sceneId === "4" || sceneId === "5" || sceneId === "10") && (
                    <button
                        className={Styles.buttonBack}
                        onClick={buttonBack}>
                        Zpět
                    </button>
                )}
            </div>
        </div >
    );
};

export default UniversalScene;