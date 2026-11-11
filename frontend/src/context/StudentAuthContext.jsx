
import { createContext, useContext, useState } from "react";

const StudentAuthContext = createContext();

export const StudentAuthProvider = ({ children }) => {

    const [student, setStudent] = useState(() => {
        const savedStudent = localStorage.getItem("studentData");
        return savedStudent ? JSON.parse(savedStudent) : null;
    });

    const login = (token, studentData) => {
        localStorage.setItem("studentToken", token);
        localStorage.setItem("studentData", JSON.stringify(studentData));

        setStudent(studentData);
    };

    const logout = () => {
        localStorage.removeItem("studentToken");
        localStorage.removeItem("studentData");
        setStudent(null);
    };

    return (
        <StudentAuthContext.Provider
            value={{ student, login, logout }}
        >
            {children}
        </StudentAuthContext.Provider>
    );
};

export const useStudentAuth = () => {
    return useContext(StudentAuthContext);
};
