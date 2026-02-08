import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import type { UserScene, Zone } from "../assets/types/types";
import { GameContext } from "../GameContext";
import Styles from "../assets/styles/OverlayScene.module.css";
import Notifications from "./Notification";

const OverlayScene = ({ sceneId }: { sceneId: string }) => {
    const game = useContext(GameContext);
    const navigate = useNavigate();

    const [scene, setScene] = useState<UserScene | null>(null);
    const [loading, setLoading] = useState(true);
    const [zones, setZones] = useState<Zone[]>([]);

    const [phoneInput, setPhoneInput] = useState("");
    const correctCode = "7872";
    const [error, setError] = useState(false);

    if (!game) throw new Error("Neni game context");
    const {
        hasItem, removeItem, setDone, history, levers, setLevers, message, buttonBack, notification
    } = game;

    const correctCombination = [true, false, true, true];

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

    const handleLeverClick = (index: number) => {
        const updated = [...levers];
        updated[index] = !updated[index];
        setLevers(updated);

        const isCorrectNow = updated.every((val, i) => val === correctCombination[i]);
        if (isCorrectNow && !history.includes("combination-okay")) {
            setDone("combination-okay");
            notification("Páky jsou správně!");
        }
    };

    const handleZoneClick = (zone: Zone) => {
        const hasRequired = !zone.requiredItemId || hasItem(zone.requiredItemId as any);

        if (zone.interactionType === "prepniPaku") {
            handleLeverClick(zone.zoneId - 12);
            return;
        }

        if (zone.requiredItemId) {
            if (!hasRequired) {
                notification(`Chybí ti: ${zone.requiredItem?.itemName}`);
                return;
            }
            if (!history.includes(zone.zoneId.toString())) {
                setDone(zone.zoneId.toString());
                removeItem(zone.requiredItemId as any);
                notification(`Aktivováno: ${zone.requiredItem?.itemName}`);
            }
        }

        if (zone.interactionType === "nextScene") {
            navigate(`/${zone.interactionName || zone.targetSceneId}`);
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
            <div className={Styles["overlay-container"]}>
                {message && <Notifications />}
                <img src={scene.sceneImage} className={Styles["overlay-img"]} alt={scene.scene} />
                <button className={Styles["overlay-close-button"]} onClick={() => buttonBack()}>×</button>

                {sceneId === "7" && (
                    <div className={Styles["overlay-blur"]}>
                        <div className={Styles["overlay"]}>
                            <div className={Styles["phone-display"]} style={{ color: error ? "red" : "black" }}>
                                {phoneInput || "----"}
                            </div>
                            <div className={Styles["phone-buttons"]}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                                    <button key={n} onClick={() => handlePhoneButton(n.toString())} className={Styles["phone-btn"]}>{n}</button>
                                ))}
                                <button onClick={checkPhoneCode} className={Styles["phone-btn-enter"]}>OK</button>
                                <button onClick={() => setPhoneInput("")} className={Styles["phone-btn-clear"]}>C</button>
                            </div>
                        </div>
                    </div>
                )}

                {zones && zones.map((z) => (
                    z.itemDown ? (
                        <img
                            key={z.zoneId}
                            src={levers[z.zoneId - 12] ? z.itemDown.imageURL : z.item?.imageURL}
                            className={levers[z.zoneId - 12] ? Styles["lever-down"] : Styles["lever-up"]}
                            style={{
                                position: 'absolute',
                                left: `${z.left}%`,
                                bottom: `${z.bottom}%`,
                                width: `${z.width}%`,
                                cursor: 'pointer'
                            }}
                            onClick={() => handleLeverClick(z.zoneId - 12)}
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