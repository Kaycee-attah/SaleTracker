import { createContext, useState } from "react";

export const DarkModeContext = createContext()

const ModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false)

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

export default ModeProvider;

