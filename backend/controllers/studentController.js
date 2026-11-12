import db from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerStudent = async (req, res) => {
  try {
    // 1. Get data from frontend
    const { student_name, email, phone, password } = req.body;

    // 2. Validate required fields
    if (!student_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // 3. Check whether email already exists
    const [existingStudent] = await db.query(
      "SELECT id FROM students WHERE email = ?",
      [email]
    );

    if (existingStudent.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // 4. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Insert student into database
    const [result] = await db.query(
      `INSERT INTO students 
      (student_name, email, phone, password)
      VALUES (?, ?, ?, ?)`,
      [student_name, email, phone || null, hashedPassword]
    );

    // 6. Send success response
    return res.status(201).json({
      success: true,
      message: "Student registered successfully",
      student: {
        id: result.insertId,
        student_name,
        email,
        phone,
      },
    });

  } catch (error) {
    console.error("Student registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong during registration",
    });
  }
};


export const loginStudent = async (req, res) => {
  try {
    // 1. Get email and password
    const { email, password } = req.body;

    // 2. Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 3. Find student by email
    const [students] = await db.query(
      "SELECT * FROM students WHERE email = ?",
      [email.trim().toLowerCase()]
    );

    if (students.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const student = students[0];

    // 4. Check account status
    if (student.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive",
      });
    }

    // 5. Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      student.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 6. Generate JWT token
    const token = jwt.sign(
      {
        id: student.id,
        email: student.email,
        role: "student",
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    // 7. Return success response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      student: {
        id: student.id,
        student_name: student.student_name,
        email: student.email,
        phone: student.phone,
      },
    });

  } catch (error) {
    console.error("Student login error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong during login",
    });
  }
};


export const getStudentProfile = async (req, res) => {
  try {
    // Get logged-in student's ID from JWT
    const studentId = req.user.id;

    // Fetch student details from database
    const [students] = await db.query(
      `SELECT id, student_name, email, phone, status, date_of_birth,gender,qualification,occupation,address,city,state,pincode,country,created_at
       FROM students
       WHERE id = ?`,
      [studentId]
    );

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student profile retrieved successfully",
      student: students[0],
    });

  } catch (error) {
    console.error("Profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve student profile",
    });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const studentId = req.user.id;
    const {
      student_name,
      phone,
      date_of_birth,
      gender,
      qualification,
      occupation,
      address,
      city,
      state,
      pincode,
      country,
    } = req.body;

    if (!student_name || !student_name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Student name is required",
      });
    }
    const [result] = await db.execute(
      `UPDATE students SET
        student_name = ?,
        phone = ?,
        date_of_birth = ?,
        gender = ?,
        qualification = ?,
        occupation = ?,
        address = ?,
        city = ?,
        state = ?,
        pincode = ?,
        country = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        student_name.trim(),
        phone || null,
        date_of_birth || null,
        gender || null,
        qualification || null,
        occupation || null,
        address || null,
        city || null,
        state || null,
        pincode || null,
        country || null,
        studentId,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const [students] = await db.execute(
      `SELECT id, student_name, email, phone, status,
       date_of_birth, gender, qualification, occupation,
       address, city, state, pincode, country, created_at
       FROM students WHERE id = ?`,
      [studentId]
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      student: students[0],
    });


  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update the student profile",
    });
  }
}


export const changeStudentPassword = async (req, res) => {
  try {
    // Get student ID from verified JWT
    const studentId = req.user.id;

    const {
      currentPassword,
      newPassword,
    } = req.body;

    // Validate required fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    // Validate new password length
    if (newPassword.length < 5) {
      return res.status(400).json({
        success: false,
        message: "New password must contain at least 8 characters",
      });
    }

    // Get existing student password
    const [students] = await db.execute(
      "SELECT id, password FROM students WHERE id = ?",
      [studentId]
    );

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const student = students[0];

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      student.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Prevent using the same password
    const isSamePassword = await bcrypt.compare(
      newPassword,
      student.password
    );

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password in database
    await db.execute(
      `UPDATE students
       SET password = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [hashedPassword, studentId]
    );

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error("Change Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to change password",
    });
  }
};
