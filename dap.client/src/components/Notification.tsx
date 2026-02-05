import Styles from "../assets/styles/Notifications.module.css";
import { GameContext } from "../GameContext";
import { useContext, useEffect } from "react";

const Notifications = () => {
    const game = useContext(GameContext);

    if (!game) throw new Error("Neni game context");

    useEffect(() => {
        if (game.message) {
            const timer = setTimeout(() => {
                game.setMessage(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [game.message, game]);

    if (!game.message) return null;

    return (
        <div className={Styles["notification-container"]}>
            {game.message}
        </div>
    );
};

export default Notifications;