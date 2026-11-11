
import jwt from "jsonwebtoken";

export const verifyStudentToken = (req, res, next) => {
  try {
    // 1. Get token from request header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1];

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach student information to request
    if (decoded.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Student access only",
      });
    }

    req.user = decoded;

    // 5. Continue to next function
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
