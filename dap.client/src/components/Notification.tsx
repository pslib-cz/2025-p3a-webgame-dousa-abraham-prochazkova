import Styles from "../assets/styles/Notifications.module.css";
import { GameContext } from "../GameContext";
import { useContext } from "react";

const Notifications = () => {

    const game = useContext(GameContext);
    if (!game) throw new Error("Neni game context");

    return (
        <>
            <div className={Styles["notification-container"]}>
                {game.message}
            </div>
        </> 
    );
};

export default Notifications;
