
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios.js";

function ProtectedRoute() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const verifyToken = async () => {

            const token = localStorage.getItem("studentToken");

            if (!token) {
                setLoading(false);
                return;
            }

            try {

                // Verify token with backend
                await API.get("/students/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setIsAuthenticated(true);

            } catch (error) {

                // Invalid or expired token
                localStorage.removeItem("studentToken");
                localStorage.removeItem("studentData");

                setIsAuthenticated(false);

            } finally {
                setLoading(false);
            }
        };

        verifyToken();

    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-[#572000]">
                    Verifying your login...
                </p>
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/student-login" replace />;
}

export default ProtectedRoute;
