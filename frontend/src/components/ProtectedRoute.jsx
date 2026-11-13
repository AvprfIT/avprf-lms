
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios.js";

const getLoginPath = (role) => {
  if (role === "admin") return "/admin-login";
  if (role === "faculty") return "/faculty-login";
  return "/student-login";
};

const getDashboardPath = (role) => {
  if (role === "admin") return "/admin/dashboard";
  if (role === "faculty") return "/faculty/dashboard";
  return "/dashboard";
};

function ProtectedRoute({ allowedRoles = ["student"] }) {
  const rolesKey = allowedRoles.join("|");
  const roles = rolesKey.split("|");

  const [status, setStatus] = useState("checking");
  const [redirectTo, setRedirectTo] = useState("");

  useEffect(() => {
    let isMounted = true;

    const verifyToken = async () => {
      const isStudentRoute = roles.includes("student");

      const token = isStudentRoute
        ? localStorage.getItem("studentToken")
        : localStorage.getItem("userToken") ||
          sessionStorage.getItem("userToken");

      if (!token) {
        if (isMounted) {
          setRedirectTo(getLoginPath(roles[0]));
          setStatus("denied");
        }
        return;
      }

      try {
        let actualRole;

        if (isStudentRoute) {
          // Verify Student token
          await API.get("/students/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          actualRole = "student";
        } else {
          // Verify Admin / Faculty token
          const response = await API.get("/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          actualRole = response.data.user?.role;

          if (!actualRole) {
            throw new Error("User role not found.");
          }
        }

        if (!isMounted) return;

        if (roles.includes(actualRole)) {
          setStatus("allowed");
        } else {
          // Valid login, but the account has a different role.
          setRedirectTo(getDashboardPath(actualRole));
          setStatus("denied");
        }
      } catch (error) {
        console.error("Authentication verification failed:", error);

        if (isStudentRoute) {
          localStorage.removeItem("studentToken");
          localStorage.removeItem("studentData");
        } else {
          localStorage.removeItem("userToken");
          localStorage.removeItem("userData");
          sessionStorage.removeItem("userToken");
          sessionStorage.removeItem("userData");
        }

        if (isMounted) {
          setRedirectTo(getLoginPath(roles[0]));
          setStatus("denied");
        }
      }
    };

    verifyToken();

    return () => {
      isMounted = false;
    };
  }, [rolesKey]);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-[#572000]">
          Verifying your login...
        </p>
      </div>
    );
  }

  if (status === "denied") {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
