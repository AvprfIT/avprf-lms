
import db from "../config/database.js";

const createSlug = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getFacultyIds = (value) => {
  if (!value) return [];

  let ids = value;

  // Supports JSON string when the request uses FormData.
  if (typeof value === "string") {
    try {
      ids = JSON.parse(value);
    } catch {
      ids = [value];
    }
  }

  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  return [...new Set(
    ids.map(Number).filter((id) => Number.isInteger(id) && id > 0)
  )];
};

const validateFaculty = async (connection, facultyIds) => {
  if (!facultyIds.length) return;

  const placeholders = facultyIds.map(() => "?").join(",");

  const [faculty] = await connection.execute(
    `SELECT id FROM users
     WHERE role = 'faculty'
     AND status = 'active'
     AND id IN (${placeholders})`,
    facultyIds
  );

  if (faculty.length !== facultyIds.length) {
    throw new Error("One or more selected faculty members are invalid or inactive.");
  }
};

// GET /api/courses
export const getAllCourses = async (req, res) => {
  try {
    const [courses] = await db.execute(
      `SELECT * FROM courses ORDER BY created_at DESC`
    );

    if (!courses.length) {
      return res.status(200).json({
        success: true,
        courses: [],
      });
    }

    const courseIds = courses.map((course) => course.id);
    const placeholders = courseIds.map(() => "?").join(",");

    const [assignments] = await db.execute(
      `SELECT course_id, faculty_id
       FROM course_faculty
       WHERE course_id IN (${placeholders})`,
      courseIds
    );

    const result = courses.map((course) => ({
      ...course,
      assignedFaculty: assignments
        .filter((item) => Number(item.course_id) === Number(course.id))
        .map((item) => Number(item.faculty_id)),
    }));

    return res.status(200).json({
      success: true,
      courses: result,
    });
  } catch (error) {
    console.error("Get courses error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch courses.",
    });
  }
};

// GET /api/courses/:id
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const [courses] = await db.execute(
      "SELECT * FROM courses WHERE id = ?",
      [id]
    );

    if (!courses.length) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    const [assignments] = await db.execute(
      `SELECT faculty_id
       FROM course_faculty
       WHERE course_id = ?`,
      [id]
    );

    return res.status(200).json({
      success: true,
      course: {
        ...courses[0],
        assignedFaculty: assignments.map((item) =>
          Number(item.faculty_id)
        ),
      },
    });
  } catch (error) {
    console.error("Get course error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch course.",
    });
  }
};

// GET /api/courses/faculty
export const getFacultyList = async (req, res) => {
  try {
    const [faculty] = await db.execute(
      `SELECT id, name, email
       FROM users
       WHERE role = 'faculty'
       AND status = 'active'
       ORDER BY name ASC`
    );

    return res.status(200).json({
      success: true,
      faculty,
    });
  } catch (error) {
    console.error("Get faculty error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch faculty.",
    });
  }
};

// POST /api/courses
export const createCourse = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const {
      course_title,
      slug,
      category,
      duration,
      eligibility,
      description,
      image,
      fee_type = "free",
      fee = 0,
      start_date,
      end_date,
      language,
      status = "draft",
      assignedFaculty,
    } = req.body;

    if (!course_title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Course title is required.",
      });
    }

    if (!["free", "paid"].includes(fee_type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course fee type.",
      });
    }

    if (!["draft", "published"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course status.",
      });
    }

    const courseFee = fee_type === "free" ? 0 : Number(fee);

    if (!Number.isFinite(courseFee) || courseFee < 0 ||
        (fee_type === "paid" && courseFee <= 0)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid course fee.",
      });
    }

    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Please log in before creating a course.",
      });
    }

    const finalSlug = createSlug(slug || course_title);

    if (!finalSlug) {
      return res.status(400).json({
        success: false,
        message: "Unable to generate course slug.",
      });
    }

    const facultyIds = getFacultyIds(assignedFaculty);

    await connection.beginTransaction();

    await validateFaculty(connection, facultyIds);

    const [result] = await connection.execute(
      `INSERT INTO courses
      (
        course_title, slug, category, duration, eligibility,
        description, image, fee_type, fee, start_date,
        end_date, language, status, created_by
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        course_title.trim(),
        finalSlug,
        category || null,
        duration || null,
        eligibility || null,
        description || null,
        image || null,
        fee_type,
        courseFee,
        start_date || null,
        end_date || null,
        language || null,
        status,
        req.user.id,
      ]
    );

    const courseId = result.insertId;

    for (const facultyId of facultyIds) {
      await connection.execute(
        `INSERT INTO course_faculty (course_id, faculty_id)
         VALUES (?, ?)`,
        [courseId, facultyId]
      );
    }

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: "Course created successfully.",
      courseId,
    });
  } catch (error) {
    await connection.rollback();

    console.error("Create course error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "A course with this slug already exists.",
      });
    }

    if (error.message.includes("selected faculty")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create course.",
    });
  } finally {
    connection.release();
  }
};

// PUT /api/courses/:id
export const updateCourse = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { id } = req.params;

    const {
      course_title,
      slug,
      category,
      duration,
      eligibility,
      description,
      image,
      fee_type,
      fee,
      start_date,
      end_date,
      language,
      status,
      assignedFaculty,
    } = req.body;

    if (!course_title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Course title is required.",
      });
    }

    if (!["free", "paid"].includes(fee_type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course fee type.",
      });
    }

    if (!["draft", "published"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course status.",
      });
    }

    const courseFee = fee_type === "free" ? 0 : Number(fee);

    if (!Number.isFinite(courseFee) || courseFee < 0 ||
        (fee_type === "paid" && courseFee <= 0)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid course fee.",
      });
    }

    const finalSlug = createSlug(slug || course_title);
    const facultyIds = getFacultyIds(assignedFaculty);

    await connection.beginTransaction();

    const [existing] = await connection.execute(
      "SELECT id FROM courses WHERE id = ?",
      [id]
    );

    if (!existing.length) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    await validateFaculty(connection, facultyIds);

    await connection.execute(
      `UPDATE courses SET
        course_title = ?,
        slug = ?,
        category = ?,
        duration = ?,
        eligibility = ?,
        description = ?,
        image = ?,
        fee_type = ?,
        fee = ?,
        start_date = ?,
        end_date = ?,
        language = ?,
        status = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        course_title.trim(),
        finalSlug,
        category || null,
        duration || null,
        eligibility || null,
        description || null,
        image || null,
        fee_type,
        courseFee,
        start_date || null,
        end_date || null,
        language || null,
        status,
        id,
      ]
    );

    await connection.execute(
      "DELETE FROM course_faculty WHERE course_id = ?",
      [id]
    );

    for (const facultyId of facultyIds) {
      await connection.execute(
        `INSERT INTO course_faculty (course_id, faculty_id)
         VALUES (?, ?)`,
        [id, facultyId]
      );
    }

    await connection.commit();

    return res.status(200).json({
      success: true,
      message: "Course updated successfully.",
    });
  } catch (error) {
    await connection.rollback();

    console.error("Update course error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "A course with this slug already exists.",
      });
    }

    if (error.message.includes("selected faculty")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to update course.",
    });
  } finally {
    connection.release();
  }
};

// DELETE /api/courses/:id
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      "DELETE FROM courses WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully.",
    });
  } catch (error) {
    console.error("Delete course error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete course.",
    });
  }
};
