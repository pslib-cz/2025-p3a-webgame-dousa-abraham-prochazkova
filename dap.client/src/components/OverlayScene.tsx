import type { Scene, Zone } from "../assets/types/types";
import { GameContext, type ItemId } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "../assets/styles/Sc2-vstupni-hala.module.css";

const OverlayScene = ({ sceneId }: { sceneId: string }) => {
    const game = useContext(GameContext);
    const navigate = useNavigate();

    const [scene, setScene] = useState<Scene | null>(null);
    const [zone, setZone] = useState<Zone[] | null>(null);
    const [loading, setLoading] = useState(true);

    if (!game) throw new Error("Neni game context");
    const { addItem, hasItem, removeItem, setDone, clearItems } = game;

    const [phoneInput, setPhoneInput] = useState("");
    const correctCode = "7872";
    const [error, setError] = useState(false);

    const handlePhoneButton = (num: string) => {
        if (phoneInput.length >= 4) return;
        setPhoneInput((prev) => prev + num);
    };

    const checkPhoneCode = () => {
        if (phoneInput === correctCode) {
            setDone("phone-correct");
            navigate("/5");
        } else {
            setError(true);
            setPhoneInput("");
            setTimeout(() => setError(false), 1000);
        }
    };

    const buttonBack = () => {
        navigate("/3");
    }


    const handleZoneClick = (zone: Zone) => {
        console.log(`Interakce s: ${zone.interactionName} (${zone.interactionType})`);

        // Kontrola, zda hráč má potřebný item
        if (zone.requiredItem && !hasItem(zone.requiredItem as ItemId)) {
            return;
        }

        switch (zone.interactionType) {
            case "getItem":
                addItem(zone.interactionName as ItemId);
                setDone(zone.zoneId.toString()); // Označíme jako sebrané
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
                // Použije item a třeba někam pustí hráče
                if (zone.requiredItem) removeItem(zone.requiredItem as ItemId);
                setDone(zone.zoneId.toString()); // Označíme jako hotové
                break;

            case "phoneClicked":
                break;

            case "finalScene":
                clearItems();
                navigate("/");
                break;
        }
    };


    useEffect(() => {
        const sceneNumber = Number(sceneId);

        if (!sceneId || isNaN(sceneNumber) || sceneNumber < 6) return;

        const loadData = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/scene/${sceneId}`);

                if (!res.ok) {
                    throw new Error(`Sc�na ${sceneId} nenalezena`);
                }

                const data: Scene = await res.json();
                setScene(data);
            } catch (err) {
                console.error("Chyba p�i na��t�n�:", err);
            } finally {
                setLoading(false);
            }


            try {
                setLoading(true);
                const res = await fetch(`/api/scene/${sceneId}/zones`);

                if (!res.ok) {
                    throw new Error(`Sc�na ${sceneId} nenalezena`);
                }

                const zoneData: Zone[] = await res.json();
                setZone(zoneData);
            } catch (err) {
                console.error("Chyba p�i na��t�n�:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [sceneId]);

    if (loading || !scene) return <p>Na��t�m...</p>;
    return (
        <div className="scena">
            <div className="grafika">
                {/* Pozad� z DB */}
                <img src={scene.sceneImage} className="bg" alt={scene.scene} />



                {sceneId === "7" && (
                    <div className={Styles["overlay-blur"]}>
                        <div className={Styles["overlay"]}>

                            <div
                                className={Styles["phone-display"]}
                                style={{ color: error ? "red" : "black" }}
                            >
                                {phoneInput || "----"}
                            </div>

                            <div className={Styles["phone-buttons"]}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                                    <button
                                        key={n}
                                        onClick={() => handlePhoneButton(n.toString())}
                                        className={Styles["phone-btn"]}
                                    >
                                        {n}
                                    </button>
                                ))}
                                <button
                                    onClick={checkPhoneCode}
                                    className={Styles["phone-btn-enter"]}
                                >
                                    OK
                                </button>
                                <button
                                    onClick={() => setPhoneInput("")}
                                    className={Styles["phone-btn-clear"]}
                                >
                                    C
                                </button>
                            </div>

                            <button
                                className={Styles["overlay-close-button"]}
                                onClick={buttonBack}
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

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