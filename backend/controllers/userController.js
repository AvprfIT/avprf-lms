
import db from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find user
    const [users] = await db.execute(
      `SELECT id, name, email, phone, password, role, status
       FROM users
       WHERE email = ?
       LIMIT 1`,
      [email.trim().toLowerCase()]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const user = users[0];

    // Check account status
    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive. Please contact Admin.",
      });
    }

    // Allow only Admin and Faculty
    if (!["admin", "faculty"].includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to login.",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Check JWT configuration
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in environment configuration.");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      }
    );

    // Successful login
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("User login error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong during login.",
    });
  }
};
