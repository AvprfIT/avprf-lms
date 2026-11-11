
import { useMemo, useState } from "react";
import {
  Search,
  Users,
  UserCheck,
  GraduationCap,
  BookOpen,
  Mail,
  Phone,
  CalendarDays,
  Eye,
  X,
  Filter,
  Clock,
  TrendingUp,
  CircleUserRound,
} from "lucide-react";

const courses = [
  { id: 1, title: "Advanced Clinical Ayurveda" },
  { id: 2, title: "Advanced Clinical Course - Marma Therapy" },
  { id: 3, title: "Basic Ayurveda Course" },
];

const initialStudents = [
  {
    id: "AVP001",
    name: "Arun Kumar",
    email: "arun@example.com",
    phone: "+91 98765 43210",
    gender: "Male",
    joinedDate: "05 Oct 2026",
    lastActivity: "Today",
    status: "Active",
    courses: [
      { courseId: 1, progress: 75, completedLessons: 15, totalLessons: 20 },
      { courseId: 2, progress: 35, completedLessons: 7, totalLessons: 20 },
    ],
  },
  {
    id: "AVP002",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 43211",
    gender: "Female",
    joinedDate: "12 Oct 2026",
    lastActivity: "Yesterday",
    status: "Active",
    courses: [
      { courseId: 1, progress: 90, completedLessons: 18, totalLessons: 20 },
    ],
  },
  {
    id: "AVP003",
    name: "Rahul Menon",
    email: "rahul@example.com",
    phone: "+91 98765 43212",
    gender: "Male",
    joinedDate: "15 Oct 2026",
    lastActivity: "3 days ago",
    status: "Inactive",
    courses: [
      { courseId: 3, progress: 40, completedLessons: 6, totalLessons: 15 },
    ],
  },
  {
    id: "AVP004",
    name: "Divya Nair",
    email: "divya@example.com",
    phone: "+91 98765 43213",
    gender: "Female",
    joinedDate: "20 Oct 2026",
    lastActivity: "Today",
    status: "Active",
    courses: [
      { courseId: 2, progress: 65, completedLessons: 13, totalLessons: 20 },
    ],
  },
  {
    id: "AVP005",
    name: "Vignesh Raj",
    email: "vignesh@example.com",
    phone: "+91 98765 43214",
    gender: "Male",
    joinedDate: "25 Oct 2026",
    lastActivity: "5 days ago",
    status: "Inactive",
    courses: [
      { courseId: 1, progress: 20, completedLessons: 4, totalLessons: 20 },
      { courseId: 3, progress: 60, completedLessons: 9, totalLessons: 15 },
    ],
  },
  {
    id: "AVP006",
    name: "Meena Krishnan",
    email: "meena@example.com",
    phone: "+91 98765 43215",
    gender: "Female",
    joinedDate: "01 Nov 2026",
    lastActivity: "Today",
    status: "Active",
    courses: [
      { courseId: 3, progress: 100, completedLessons: 15, totalLessons: 15 },
    ],
  },
];

function FacultyStudents() {
  const [students] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  const totalEnrollments = students.reduce(
    (total, student) => total + student.courses.length,
    0
  );

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        student.name.toLowerCase().includes(searchText) ||
        student.email.toLowerCase().includes(searchText) ||
        student.id.toLowerCase().includes(searchText);

      const matchesCourse =
        courseFilter === "all" ||
        student.courses.some(
          (course) => course.courseId === Number(courseFilter)
        );

      const matchesStatus =
        statusFilter === "all" || student.status === statusFilter;

      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [students, search, courseFilter, statusFilter]);

  const getCourseName = (courseId) =>
    courses.find((course) => course.id === courseId)?.title ||
    "Unknown Course";

  const getInitials = (name) =>
    name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const getAverageProgress = (student) => {
    if (!student.courses.length) return 0;

    return Math.round(
      student.courses.reduce((total, course) => total + course.progress, 0) /
        student.courses.length
    );
  };

  return (
    <div className="min-h-screen">

      {/* PAGE HEADER */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-[#572000]">
          My Students
        </h1>
        <p className="mt-1 text-sm text-[#8B6B55]">
          View enrolled students and monitor their course participation.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          title="Total Students"
          value={students.length}
          icon={<Users size={22} />}
        />

        <SummaryCard
          title="Active Students"
          value={activeStudents}
          icon={<UserCheck size={22} />}
        />

        <SummaryCard
          title="Inactive Students"
          value={inactiveStudents}
          icon={<CircleUserRound size={22} />}
        />

        <SummaryCard
          title="Total Enrollments"
          value={totalEnrollments}
          icon={<GraduationCap size={22} />}
        />

      </div>

      {/* SEARCH AND FILTER */}
      <div className="mb-6 rounded-2xl border border-[#F0E1D1] bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center gap-2">
          <Filter size={18} className="text-[#FF7600]" />
          <h2 className="font-semibold text-[#572000]">
            Search & Filter Students
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A68B76]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email or student ID..."
              className="w-full rounded-xl border border-[#EAD9C8] py-3 pl-10 pr-4 text-sm outline-none focus:border-[#FF7600]"
            />
          </div>

          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
          >
            <option value="all">All Courses</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

        </div>
      </div>

      {/* STUDENT TABLE */}
      <div className="overflow-hidden rounded-2xl border border-[#F0E1D1] bg-white shadow-sm">

        <div className="flex flex-col justify-between gap-2 border-b border-[#F0E1D1] p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-[#572000]">
              Student List
            </h2>
            <p className="mt-1 text-sm text-[#9A806C]">
              {filteredStudents.length} student(s) found
            </p>
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="py-14 text-center">
            <Users
              size={40}
              className="mx-auto mb-3 text-[#C5A88D]"
            />
            <h3 className="font-semibold text-[#572000]">
              No students found
            </h3>
            <p className="mt-1 text-sm text-[#9A806C]">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-[#FFF8EF]">
                <tr className="text-xs uppercase tracking-wide text-[#8B6B55]">
                  <th className="px-5 py-4 font-semibold">Student</th>
                  <th className="px-5 py-4 font-semibold">Student ID</th>
                  <th className="px-5 py-4 font-semibold">Courses</th>
                  <th className="px-5 py-4 font-semibold">Progress</th>
                  <th className="px-5 py-4 font-semibold">Last Activity</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-center font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F1E7DD]">
                {filteredStudents.map((student) => {
                  const progress = getAverageProgress(student);

                  return (
                    <tr
                      key={student.id}
                      className="transition hover:bg-[#FFFCF8]"
                    >
                      {/* STUDENT */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFE7CF] text-sm font-bold text-[#FF7600]">
                            {getInitials(student.name)}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-[#572000]">
                              {student.name}
                            </p>
                            <p className="mt-1 text-xs text-[#9A806C]">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* ID */}
                      <td className="px-5 py-4">
                        <span className="text-sm font-medium text-[#8B6B55]">
                          {student.id}
                        </span>
                      </td>

                      {/* COURSES */}
                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-[#FFF0E1] px-3 py-1.5 text-xs font-semibold text-[#B95400]">
                          {student.courses.length} Course(s)
                        </span>
                      </td>

                      {/* PROGRESS */}
                      <td className="px-5 py-4">
                        <div className="w-32">
                          <div className="mb-1 flex justify-between">
                            <span className="text-xs text-[#9A806C]">
                              Overall
                            </span>
                            <span className="text-xs font-bold text-[#572000]">
                              {progress}%
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-[#F3E8DC]">
                            <div
                              className="h-full rounded-full bg-[#FF7600]"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* ACTIVITY */}
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1.5 text-xs text-[#8B6B55]">
                          <Clock size={14} />
                          {student.lastActivity}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <StatusBadge status={student.status} />
                      </td>

                      {/* ACTION */}
                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#EAD9C8] px-3 py-2 text-xs font-semibold text-[#FF7600] transition hover:bg-[#FFF3E5]"
                        >
                          <Eye size={15} />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* STUDENT PROFILE MODAL */}
      {selectedStudent && (
        <Modal
          title="Student Profile"
          onClose={() => setSelectedStudent(null)}
        >
          <div className="space-y-5">

            {/* PROFILE HEADER */}
            <div className="rounded-xl bg-[#FFF8EF] p-5 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFE7CF] text-2xl font-bold text-[#FF7600]">
                {getInitials(selectedStudent.name)}
              </div>

              <h3 className="mt-3 text-lg font-bold text-[#572000]">
                {selectedStudent.name}
              </h3>

              <p className="mt-1 text-sm text-[#9A806C]">
                Student ID: {selectedStudent.id}
              </p>

              <div className="mt-3">
                <StatusBadge status={selectedStudent.status} />
              </div>
            </div>

            {/* CONTACT DETAILS */}
            <div>
              <h4 className="mb-3 font-semibold text-[#572000]">
                Personal Information
              </h4>

              <div className="space-y-3 rounded-xl border border-[#F0E1D1] p-4">
                <InfoRow
                  icon={<Mail size={17} />}
                  label="Email"
                  value={selectedStudent.email}
                />

                <InfoRow
                  icon={<Phone size={17} />}
                  label="Phone"
                  value={selectedStudent.phone}
                />

                <InfoRow
                  icon={<CircleUserRound size={17} />}
                  label="Gender"
                  value={selectedStudent.gender}
                />

                <InfoRow
                  icon={<CalendarDays size={17} />}
                  label="Joined Date"
                  value={selectedStudent.joinedDate}
                />
              </div>
            </div>

            {/* ENROLLED COURSES */}
            <div>
              <h4 className="mb-3 font-semibold text-[#572000]">
                Enrolled Courses
              </h4>

              <div className="space-y-3">
                {selectedStudent.courses.map((course) => (
                  <div
                    key={course.courseId}
                    className="rounded-xl border border-[#F0E1D1] p-4"
                  >
                    <p className="text-sm font-semibold text-[#572000]">
                      {getCourseName(course.courseId)}
                    </p>

                    <div className="mb-2 mt-3 flex justify-between text-xs">
                      <span className="text-[#9A806C]">
                        Lesson Completion
                      </span>
                      <span className="font-bold text-[#572000]">
                        {course.progress}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#F3E8DC]">
                      <div
                        className="h-full rounded-full bg-[#FF7600]"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>

                    <p className="mt-2 text-xs text-[#9A806C]">
                      {course.completedLessons} of {course.totalLessons} lessons completed
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* OVERALL PROGRESS */}
            <div className="flex items-center justify-between rounded-xl bg-[#FFF3E5] p-4">
              <div>
                <p className="text-sm font-semibold text-[#572000]">
                  Overall Course Progress
                </p>
                <p className="mt-1 text-xs text-[#9A806C]">
                  Average across enrolled courses
                </p>
              </div>

              <p className="text-2xl font-bold text-[#FF7600]">
                {getAverageProgress(selectedStudent)}%
              </p>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="w-full rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white hover:bg-[#E66A00]"
            >
              Close Profile
            </button>

          </div>
        </Modal>
      )}
    </div>
  );
}

// SUMMARY CARD
function SummaryCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-[#F0E1D1] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#9A806C]">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-[#572000]">
            {value}
          </h3>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E1] text-[#FF7600]">
          {icon}
        </div>
      </div>
    </div>
  );
}

// STATUS BADGE
function StatusBadge({ status }) {
  const active = status === "Active";

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
        active
          ? "bg-green-50 text-green-700"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

// PROFILE INFO ROW
function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-[#FF7600]">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-[#9A806C]">{label}</p>
        <p className="mt-1 break-all text-sm font-medium text-[#572000]">
          {value}
        </p>
      </div>
    </div>
  );
}

// MODAL
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-3 sm:p-5">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#F0E1D1] bg-white px-5 py-4">
          <h2 className="text-lg font-bold text-[#572000]">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#8B6B55] hover:bg-[#FFF3E5]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export default FacultyStudents;
