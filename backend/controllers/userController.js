
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

export const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        role: req.user.role,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch user details.",
    });
  }
};

export const createFaculty = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    if (password.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 3 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check duplicate email
    const [existingUser] = await db.execute(
      "SELECT id FROM users WHERE email = ?",
      [normalizedEmail]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Faculty account
    const [result] = await db.execute(
      `INSERT INTO users
       (name, email, phone, password, role, status)
       VALUES (?, ?, ?, ?, 'faculty', 'active')`,
      [
        name.trim(),
        normalizedEmail,
        phone?.trim() || null,
        hashedPassword,
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Faculty account created successfully.",
      faculty: {
        id: result.insertId,
        name: name.trim(),
        email: normalizedEmail,
        phone: phone?.trim() || null,
        role: "faculty",
        status: "active",
      },
    });

  } catch (error) {
    console.error("Create faculty error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create faculty account.",
    });
  }
};

export const getAllFaculty = async (req, res) => {
  try {
    const [faculty] = await db.execute(
      `SELECT
        id,
        name,
        email,
        phone,
        role,
        status,
        created_at
      FROM users
      WHERE role = 'faculty'
      ORDER BY created_at DESC`
    );

    return res.status(200).json({
      success: true,
      count: faculty.length,
      faculty,
    });

  } catch (error) {
    console.error("Get faculty list error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch faculty list.",
    });
  }
};


export const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, status } = req.body;

    // Validate faculty ID
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid faculty ID.",
      });
    }

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !status) {
      return res.status(400).json({
        success: false,
        message: "Name, email and status are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid account status.",
      });
    }

    // Check whether faculty exists
    const [existingFaculty] = await db.execute(
      `SELECT id FROM users
       WHERE id = ? AND role = 'faculty'`,
      [id]
    );

    if (!existingFaculty.length) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found.",
      });
    }

    // Check duplicate email
    const [duplicateEmail] = await db.execute(
      `SELECT id FROM users
       WHERE email = ? AND id != ?`,
      [normalizedEmail, id]
    );

    if (duplicateEmail.length) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Update faculty details
    await db.execute(
      `UPDATE users
       SET name = ?,
           email = ?,
           phone = ?,
           status = ?,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND role = 'faculty'`,
      [
        name.trim(),
        normalizedEmail,
        phone?.trim() || null,
        status,
        id,
      ]
    );

    return res.status(200).json({
      success: true,
      message: "Faculty updated successfully.",
    });

  } catch (error) {
    console.error("Update faculty error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update faculty.",
    });
  }
};


export const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid faculty ID.",
      });
    }

    const [result] = await db.execute(
      `UPDATE users
       SET status = 'inactive',
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND role = 'faculty'`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Faculty deactivated successfully.",
    });

  } catch (error) {
    console.error("Delete faculty error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to deactivate faculty.",
    });
  }
};
