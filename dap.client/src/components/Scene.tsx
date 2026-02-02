import type { Scene, Zone } from "../assets/types/types";
import postava from "/img/character.png";
import Inventar from "../components/Inventar";
import Notifications from "../components/Notification";
import { GameContext, type ItemId } from "../GameContext";
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
    const { addItem, hasItem, removeItem, isDone, setDone, clearItems, konec, message } = game;


    const buttonBack = () => {
        navigate("/3");
    };

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
    console.log(scene?.zones?.map(z => z.interactionName));


    const handleZoneClick = (zone: Zone) => {
        console.log(`Interakce s: ${zone.interactionName} (${zone.interactionType})`);
        /*
                if (zone.requiredItem && !hasItem(zone.requiredItem as ItemId)) {
                    setDialog(`Potřebuješ: ${zone.requiredItem}`);
                    return;
                }
        */
        switch (zone.interactionType) {
            case "getItem":
                addItem(zone.interactionName as ItemId);
                game.notification(`Získal jsi: ${zone.interactionName}`);
                setDone(zone.zoneId.toString());
                break;

            case "nextScene":
                if (zone.requiredItem) {
                    removeItem(zone.requiredItem as ItemId);
                    navigate(`/${zone.interactionName}`);
                } else if (zone.requiredItem === null) {
                    navigate(`/${zone.interactionName}`);
                }
                break;

            case "useItem":
                if (zone.requiredItem) removeItem(zone.requiredItem as ItemId);
                setDone(zone.zoneId.toString());
                break;

            case "phoneClicked":
                let jeOpraveno = isDone("phone-coil");

                if (!jeOpraveno) {
                    if (hasItem("coil")) {
                        removeItem("coil");
                        setDone("phone-coil");
                        jeOpraveno = true
                    } else {
                        setDialog("Telefon je rozbitý, chybí mu cívka.");
                        return;
                    }
                } else {
                    if (!isDone("phone-correct")) {
                        navigate(`/${zone.interactionName}`);
                        setDialog("Telefon je opravený, ale číslo ještě nebylo vytočeno.");
                    } else if (isDone("phone-correct")) {
                        navigate("/5");
                        setDialog("Volání proběhlo úspěšně.");
                    }
                }

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
                {message && <Notifications />}
                {/* Pozadí z DB */}
                <img src={scene.sceneImage} className="bg" alt={scene.scene} />

                <div className="inventar">
                    <Inventar />
                </div>

                <div className="dialogText">"{dialog}"</div>

                {/* Postava - v CSS můžeš měnit class podle ID scény */}
                <img src={postava} className={`postava-sc${sceneId}`} />

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
                {/* DYNAMICKÉ GENEROVÁNÍ ZÓN */}
                {scene.zones &&
                    scene.zones.map((zone) => {
                        if (isDone(zone.zoneId.toString())) {
                            return null; // Pokud je zóna hotová, nevykreslujeme ji
                        }
                        return (
                            <div
                                key={zone.zoneId}
                                className="debug-tlacitko" // nebo Styles.hotspot
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
                        className="buttonBack"
                        onClick={buttonBack}>
                        Zpět
                    </button>
                )}
            </div>
        </div >
    );
};

export default UniversalScene;