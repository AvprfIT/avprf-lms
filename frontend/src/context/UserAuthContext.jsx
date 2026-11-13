
import { createContext, useContext, useState } from "react";

const UserAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {

    const getSavedUser = () => {
        const savedUser =
            localStorage.getItem("userData") ||
            sessionStorage.getItem("userData");

        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    };

    const [user, setUser] = useState(getSavedUser);

    // Login - Admin / Faculty
    const login = (token, userData, rememberMe = false) => {

        // Remove old session
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");

        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userData");

        // Remember me decides storage
        const storage = rememberMe ? localStorage : sessionStorage;

        storage.setItem("userToken", token);
        storage.setItem("userData", JSON.stringify(userData));

        setUser(userData);
    };

    // Logout - Admin / Faculty
    const logout = () => {

        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");

        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userData");

        setUser(null);
    };

    return (
        <UserAuthContext.Provider
            value={{ user, login, logout }}
        >
            {children}
        </UserAuthContext.Provider>
    );
};

export const useUserAuth = () => {
    const context = useContext(UserAuthContext);

    if (!context) {
        throw new Error(
            "useUserAuth must be used inside UserAuthProvider"
        );
    }

    return context;
};
