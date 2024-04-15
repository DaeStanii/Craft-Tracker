import { useState, useEffect } from "react";
import darkModeIcon from "../../../images/dark-mode.png"
import lightModeIcon from "../../../images/light-mode.png"
const Header = () => {

    const [darkMode, setDarkMode] = useState(false);
    const [iconImage, setIconImage] = useState();

    useEffect(() => {
        if (darkMode) {
            setIconImage(lightModeIcon)
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
            setIconImage(darkModeIcon)
        }
    }, [darkMode])

    return (
        <button
        className="absolute"
        onClick={() => {
            setDarkMode(!darkMode)
        }}>
            <img
            className="invert-0 dark:invert pt-3 pl-2"
            
            src={iconImage} />
            {/* {darkMode?"Light": "Moon"} Mode */}
        </button>
    )
}

export default Header;