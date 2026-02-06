import type { Scene, Zone } from "../assets/types/types";
import { GameContext, type ItemId } from "../GameContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "../assets/styles/OverlayScene.module.css";
import Notifications from "./Notification";

const OverlayScene = ({ sceneId }: { sceneId: string }) => {
    const game = useContext(GameContext);
    const navigate = useNavigate();

    const [scene, setScene] = useState<Scene | null>(null);
    const [loading, setLoading] = useState(true);
    const [zones, setZones] = useState<Zone[]>([]);

    if (!game) throw new Error("Neni game context");
    const { addItem, hasItem, removeItem, setDone, clearItems, message, buttonBack } = game;

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

    const [leverState, setLeverState] = useState<boolean[]>([false, false, false, false]);
    const [correctCombination] = useState<boolean[]>([true, false, true, true]);

    const handleLeverClick = (index: number) => {
        setLeverState(prev => {
            const updated = [...prev];
            updated[index] = !updated[index];
            const solved = updated.every((val, i) => val === correctCombination[i]);
            if (solved) {
                setDone("combination-okay");
            }
            return updated;
        });
    };

    const handleZoneClick = (zone: Zone) => {
        if (zone.requiredItem && !hasItem(zone.requiredItem as ItemId)) return;

        switch (zone.interactionType) {
            case "getItem":
                addItem(zone.interactionName as ItemId);
                setDone(zone.zoneId.toString());
                break;
            case "nextScene":
                navigate(`/${zone.interactionName}`);
                break;
            case "prepniPaku":
                handleLeverClick(Number(zone.interactionName));
                break;
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const resScene = await fetch(`/api/scene/${sceneId}`);
                if (resScene.ok) setScene(await resScene.json());

                const resZones = await fetch(`/api/zones/${sceneId}`);
                if (resZones.ok) setZones(await resZones.json());
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [sceneId]);

    if (loading || !scene) return <p>Načítám...</p>;

    return (
        <div className="scena">
            <div className="grafika">
                {message && <Notifications />}
                <img src={scene.sceneImage} className="bg" alt={scene.scene} />

                <button className={Styles["overlay-close-button"]} onClick={() => buttonBack()}>
                    ×
                </button>

                {sceneId === "7" && (
                    <div className={Styles["overlay-blur"]}>
                        <div className={Styles["overlay"]}>
                            <div className={Styles["phone-display"]} style={{ color: error ? "red" : "black" }}>
                                {phoneInput || "----"}
                            </div>
                            <div className={Styles["phone-buttons"]}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                                    <button key={n} onClick={() => handlePhoneButton(n.toString())} className={Styles["phone-btn"]}>
                                        {n}
                                    </button>
                                ))}
                                <button onClick={checkPhoneCode} className={Styles["phone-btn-enter"]}>OK</button>
                                <button onClick={() => setPhoneInput("")} className={Styles["phone-btn-clear"]}>C</button>
                            </div>
                        </div>
                    </div>
                )}

                {zones && zones.map((z, i) => (
                    z.itemDown ? (
                        <img
                            key={z.zoneId}
                            src={leverState[i] ? z.itemDown.imageURL : z.item?.imageURL}
                            className={leverState[i] ? Styles["lever-down"] : Styles["lever-up"]}
                            style={{
                                position: 'absolute',
                                left: `${z.left}%`,
                                width: `${z.width}%`,
                                zIndex: 100,
                                cursor: 'pointer',
                                objectFit: 'contain'
                            }}
                            onClick={() => handleLeverClick(i)}
                            alt="lever"
                        />
                    ) : (
                        <div
                            key={z.zoneId}
                            onClick={() => handleZoneClick(z)}
                            style={{
                                position: "absolute",
                                left: `${z.left}%`,
                                bottom: `${z.bottom}%`,
                                width: `${z.width}%`,
                                height: `${z.height}%`,
                                cursor: "pointer"
                            }}
                        />
                    )
                ))}
            </div>
        </div>
    );
};

export default OverlayScene;