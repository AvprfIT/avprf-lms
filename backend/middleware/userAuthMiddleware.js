
import jwt from "jsonwebtoken";
import db from "../config/database.js";

export const verifyUserToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [users] = await db.execute(
      `SELECT id, name, email, phone, role, status
       FROM users
       WHERE id = ?
       LIMIT 1`,
      [decoded.id]
    );

    if (!users.length || users[0].status !== "active") {
      return res.status(401).json({
        success: false,
        message: "User account not found or inactive.",
      });
    }

    req.user = users[0];

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

// Role-based access
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    next();
  };
};
