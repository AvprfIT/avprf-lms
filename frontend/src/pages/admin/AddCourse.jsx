import { useNavigate } from "react-router-dom";
import CourseForm from "../../components/CourseForm";
import { getCourses, saveCourses } from "../../components/courseStorage";

export default function AddCourse() {
  const navigate = useNavigate();
  const handleCreate = (data) => {
    const courses = getCourses();
    const newId = Math.max(0, ...courses.map((course) => Number(course.id) || 0)) + 1;
    saveCourses([{ ...data, id: newId, students: 0 }, ...courses]);
    navigate("/admin/courses");
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold text-[#572000]">Add New Course</h1>
        <p className="mt-1 text-sm text-[#8B6B55]">Manage course information, syllabus and faculty.</p>
      </div>
      <div className="rounded-2xl border border-[#F0E2D3] bg-white shadow-sm">
        <CourseForm mode="add" onSubmit={handleCreate} onCancel={() => navigate("/admin/courses")} />
      </div>
    </div>
  );
}
