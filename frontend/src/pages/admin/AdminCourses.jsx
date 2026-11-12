
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses, saveCourses } from "../../components/courseStorage";
import {
  Plus,
  Search,
  BookOpen,
  Pencil,
  Trash2,
  Eye,
  X,
  Image as ImageIcon,
  IndianRupee,
  Clock,
  Users,
  FileText,
  GraduationCap,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const facultyList = [
  {
    id: 1,
    name: "Dr. Arun Kumar",
    specialization: "Ayurveda Physician",
  },
  {
    id: 2,
    name: "Dr. Priya",
    specialization: "Panchakarma",
  },
  {
    id: 3,
    name: "Dr. Rahul",
    specialization: "Clinical Ayurveda",
  },
  {
    id: 4,
    name: "Dr. Meena",
    specialization: "Marma Therapy",
  },
];

function AdminCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(getCourses);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [viewCourse, setViewCourse] = useState(null);

  const [expandedModules, setExpandedModules] = useState({});

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || course.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const publishedCount = courses.filter(
    (course) => course.status === "Published"
  ).length;

  const draftCount = courses.filter(
    (course) => course.status === "Draft"
  ).length;

  const totalStudents = courses.reduce(
    (total, course) => total + Number(course.students || 0),
    0
  );

  const handleDelete = (courseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    const next = courses.filter((course) => course.id !== courseId);
    setCourses(next);
    saveCourses(next);
  };

  const toggleStatus = (courseId) => {
    const next = courses.map((course) =>
      course.id === courseId
        ? { ...course, status: course.status === "Published" ? "Draft" : "Published" }
        : course
    );
    setCourses(next);
    saveCourses(next);
  };

  const toggleModuleView = (moduleId) => {
    setExpandedModules((previous) => ({
      ...previous,
      [moduleId]: !previous[moduleId],
    }));
  };

  const getFacultyNames = (facultyIds = []) => {
    return facultyIds
      .map((id) => facultyList.find((faculty) => faculty.id === id)?.name)
      .filter(Boolean);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#572000]">
            Manage Courses
          </h1>
          <p className="mt-1 text-sm text-[#8B6B55]">
            Create courses, manage syllabus and assign faculty members.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/courses/add")}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e96900]"
        >
          <Plus size={18} />
          Add New Course
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<BookOpen size={21} />}
          label="Total Courses"
          value={courses.length}
        />

        <StatCard
          icon={<GraduationCap size={21} />}
          label="Published Courses"
          value={publishedCount}
        />

        <StatCard
          icon={<FileText size={21} />}
          label="Draft Courses"
          value={draftCount}
        />

        <StatCard
          icon={<Users size={21} />}
          label="Enrolled Students"
          value={totalStudents}
        />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#F0E2D3] bg-white p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A88B76]"
          />

          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#EAD9C8] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#FF7600]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
        >
          <option value="All">All Status</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      {/* Course Cards */}
      {filteredCourses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#EAD9C8] bg-white py-16 text-center">
          <BookOpen className="mx-auto text-[#C5A88F]" size={40} />
          <h3 className="mt-3 font-semibold text-[#572000]">
            No courses found
          </h3>
          <p className="mt-1 text-sm text-[#9B806C]">
            Try changing your search or add a new course.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="overflow-hidden rounded-2xl border border-[#F0E2D3] bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Course Image */}
              <div className="relative h-44 bg-[#FFF3E5]">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon size={48} className="text-[#D5B99F]" />
                  </div>
                )}

                <span
                  className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                    course.status === "Published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {course.status}
                </span>
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#FF7600]">
                    {course.category}
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-[#572000]">
                    {course.title}
                  </h3>

                  <p className="mt-1 text-sm text-[#967D69]">
                    {course.description || "No description added."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#FFF8EF] p-3">
                    <div className="flex items-center gap-2 text-xs text-[#92745D]">
                      <Clock size={15} />
                      Duration
                    </div>
                    <p className="mt-1 text-sm font-semibold text-[#572000]">
                      {course.duration}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#FFF8EF] p-3">
                    <div className="flex items-center gap-2 text-xs text-[#92745D]">
                      <IndianRupee size={15} />
                      Course Fee
                    </div>
                    <p className="mt-1 text-sm font-semibold text-[#572000]">
                      {course.feeType === "Free"
                        ? "Free"
                        : `₹${Number(course.fee).toLocaleString("en-IN")}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-[#8B6B55]">
                    <Users size={16} />
                    {course.students} Students
                  </span>

                  <span className="text-xs text-[#8B6B55]">
                    {course.syllabus?.length || 0} Modules
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 border-t border-[#F2E8DE] pt-4">
                  <button
                    onClick={() => setViewCourse(course)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#EAD9C8] px-3 py-2 text-xs font-semibold text-[#572000] hover:bg-[#FFF3E5]"
                  >
                    <Eye size={15} />
                    View
                  </button>

                  <button
                    onClick={() => navigate(`/admin/courses/edit/${course.id}`)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#FF7600]/30 px-3 py-2 text-xs font-semibold text-[#E96900] hover:bg-[#FFF3E5]"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    onClick={() => toggleStatus(course.id)}
                    className="rounded-lg border border-[#EAD9C8] px-3 py-2 text-xs font-semibold text-[#572000] hover:bg-[#FFF3E5]"
                    title="Change course status"
                  >
                    {course.status === "Published" ? "Unpublish" : "Publish"}
                  </button>

                  <button
                    onClick={() => handleDelete(course.id)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                    title="Delete course"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Course Modal */}
      {viewCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F0E2D3] p-5">
              <h2 className="text-xl font-bold text-[#572000]">
                Course Details
              </h2>

              <button
                onClick={() => setViewCourse(null)}
                className="rounded-lg p-2 text-[#8B6B55] hover:bg-[#FFF3E5]"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              {viewCourse.image && (
                <img
                  src={viewCourse.image}
                  alt={viewCourse.title}
                  className="h-48 w-full rounded-xl object-cover"
                />
              )}

              <div>
                <p className="text-xs font-semibold uppercase text-[#FF7600]">
                  {viewCourse.category}
                </p>
                <h3 className="mt-1 text-xl font-bold text-[#572000]">
                  {viewCourse.title}
                </h3>
                <p className="mt-2 text-sm text-[#8B6B55]">
                  {viewCourse.description || "No description available."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <DetailBox
                  label="Duration"
                  value={viewCourse.duration}
                />
                <DetailBox
                  label="Course Fee"
                  value={
                    viewCourse.feeType === "Free"
                      ? "Free"
                      : `₹${Number(viewCourse.fee).toLocaleString("en-IN")}`
                  }
                />
                <DetailBox
                  label="Students"
                  value={viewCourse.students}
                />
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-[#572000]">
                  Course Syllabus
                </h4>

                {viewCourse.syllabus?.length > 0 ? (
                  <div className="space-y-2">
                    {viewCourse.syllabus.map((module, index) => (
                      <div
                        key={module.id}
                        className="overflow-hidden rounded-xl border border-[#EAD9C8]"
                      >
                        <button
                          onClick={() => toggleModuleView(module.id)}
                          className="flex w-full items-center justify-between bg-[#FFF8EF] p-3 text-left"
                        >
                          <span className="text-sm font-semibold text-[#572000]">
                            Module {index + 1}: {module.title}
                          </span>

                          {expandedModules[module.id] ? (
                            <ChevronDown size={17} />
                          ) : (
                            <ChevronRight size={17} />
                          )}
                        </button>

                        {expandedModules[module.id] && (
                          <div className="space-y-2 p-3">
                            {module.topics?.length > 0 ? (
                              module.topics.map((topic, topicIndex) => (
                                <p
                                  key={topicIndex}
                                  className="text-sm text-[#8B6B55]"
                                >
                                  • {topic}
                                </p>
                              ))
                            ) : (
                              <p className="text-xs text-[#9B806C]">
                                No topics added.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#9B806C]">
                    No syllabus added.
                  </p>
                )}
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-[#572000]">
                  Assigned Faculty
                </h4>

                {getFacultyNames(viewCourse.assignedFaculty).length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {getFacultyNames(viewCourse.assignedFaculty).map(
                      (name) => (
                        <span
                          key={name}
                          className="rounded-full bg-[#FFF3E5] px-3 py-2 text-xs font-semibold text-[#8B2E00]"
                        >
                          {name}
                        </span>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-[#9B806C]">
                    No faculty assigned.
                  </p>
                )}
              </div>

              <div>
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    viewCourse.status === "Published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {viewCourse.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Reusable Components */

function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#F0E2D3] bg-white p-5 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF3E5] text-[#FF7600]">
        {icon}
      </div>

      <div>
        <p className="text-sm text-[#92745D]">{label}</p>
        <h3 className="mt-1 text-2xl font-bold text-[#572000]">
          {value}
        </h3>
      </div>
    </div>
  );
}

function DetailBox({ label, value }) {
  return (
    <div className="rounded-xl bg-[#FFF8EF] p-3">
      <p className="text-xs text-[#92745D]">{label}</p>
      <p className="mt-1 text-sm font-bold text-[#572000]">{value}</p>
    </div>
  );
}

export default AdminCourses;
