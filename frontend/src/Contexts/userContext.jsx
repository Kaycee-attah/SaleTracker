import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        email: localStorage.getItem("email"),
        role: localStorage.getItem("role") || "user", // Default role is user
    })
    

    return (
        <UserContext.Provider value={{ user, setUser }}>
            
            {children}

        </UserContext.Provider>
    )
}

export default UserProvider