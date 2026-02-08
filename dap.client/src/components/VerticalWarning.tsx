import { useEffect, useState } from 'react';
import Style from '../assets/styles/VerticalWarning.module.css';

const VerticalWarning: React.FC = () => {

    const [isPortrait, setIsPortrait] = useState(
        window.matchMedia("(orientation: portrait)").matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(orientation: portrait)");

        const handleChange = (e: MediaQueryListEvent) => setIsPortrait(e.matches);

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    if (isPortrait) {
        return (
            <div className={Style.warning}>
                <h1>Prosím, otočte zařízení na šířku (Landscape mode).</h1>
            </div>
        );
    }

    return null;
};


export default VerticalWarning;