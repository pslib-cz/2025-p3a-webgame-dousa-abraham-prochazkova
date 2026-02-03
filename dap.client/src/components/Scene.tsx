import type { Scene, Zone, Item } from "../assets/types/types";
import Styles from "../assets/styles/Scene.module.css";
import Inventar from "../components/Inventar";
import Notifications from "../components/Notification";
import { GameContext } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
/*import { fetchDialogue } from "../dialogApi";*/

const UniversalScene = ({ sceneId }: { sceneId: string }) => {
    const game = useContext(GameContext);
    const navigate = useNavigate();

    const [scene, setScene] = useState<Scene | null>(null);
    const [dialog, setDialog] = useState("");
    const [loading, setLoading] = useState(true);

    if (!game) throw new Error("Neni game context");
    const { addItem, hasItem, removeItem, isDone, setDone, clearItems, konec, message, buttonBack } = game;


    useEffect(() => {
        if (!sceneId || sceneId === "undefined") return;

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
                console.error("Chyba při načítání:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [sceneId]);

    const handleZoneClick = (zone: Zone) => {


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
                    game.notification(`Potřebuješ: ${zone.requiredItem}`);
                    return;
                }
                break;

            case "nextScene":
                if (isDone(zone.zoneId.toString())) {
                    navigate(`/${zone.interactionName}`);
                    return;
                } else if (zone.requiredItemId && hasItem(zone.requiredItemId) && !isDone(zone.zoneId.toString())) {
                    removeItem(zone.requiredItemId);
                    setDone(zone.zoneId.toString());
                    navigate(`/${zone.interactionName}`);
                    game.notification(`Použil jsi: ${zone.requiredItem?.itemName}`);
                } else if (zone.requiredItemId && !hasItem(zone.requiredItemId)) {
                    game.notification(`Potřebuješ: ${zone.requiredItem?.itemName}`);
                } else if (zone.requiredItemId === null) {
                    navigate(`/${zone.interactionName}`);
                    game.notification(`Přešel jsi do scény: ${zone.interactionName}`);
                }
                break;

            case "useItem":
                if (zone.requiredItemId) removeItem(zone.requiredItemId);
                setDone(zone.zoneId.toString());
                game.notification(`Použil jsi: ${zone.requiredItem?.itemName}`);
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
                clearItems();
                navigate("/6");
                game.notification("Hra byla ukončena a stav vymazán.");
                break;
        }
    };



    if (loading || !scene) return <p>Načítám...</p>;
    return (
        <div className="scena">
            <div className="grafika">
                {message && <Notifications />}
                <img src={scene.sceneImage} className="bg" alt={scene.scene} />

                <Inventar />
                <div className={Styles["inventar"]}>
                </div>

                <div className={Styles["dialogText"]}>"{dialog}"</div>
                {/* DEBUG */}
                <div
                    className="debug-tlacitko"
                    onClick={() => konec()}
                    style={{
                        left: "95%",
                        bottom: "92%",
                        width: "5%",
                        height: "auto",
                        aspectRatio: 1 / 1,
                    }}
                />
                {scene.zones &&
                    scene.zones.map((zone) => {
                        if (isDone(zone.zoneId.toString()) && zone.interactionType !== "nextScene") {
                            return null;
                        }
                        return (
                            <div
                                key={zone.zoneId}
                                className="debug-tlacitko"
                                onClick={() => handleZoneClick(zone)}
                                style={{
                                    left: `${zone.left}%`,
                                    bottom: `${zone.bottom}%`,
                                    width: `${zone.width}%`,
                                    height: `${zone.height}%`,
                                }}
                            />
                        );
                    })
                }

                {(sceneId === "4" || sceneId === "5") && (
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