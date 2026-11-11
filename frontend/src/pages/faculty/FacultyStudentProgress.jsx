
import { useMemo, useState } from "react";
import {
  Search,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Clock,
  Eye,
  X,
  Video,
  FileText,
  ClipboardCheck,
  CheckCircle2,
  AlertCircle,
  Target,
  GraduationCap,
  CalendarDays,
  Filter,
} from "lucide-react";

const courses = [
  { id: 1, title: "Advanced Clinical Ayurveda" },
  { id: 2, title: "Advanced Clinical Course - Marma Therapy" },
  { id: 3, title: "Basic Ayurveda Course" },
];

const initialProgress = [
  {
    id: 1,
    studentId: "AVP001",
    studentName: "Arun Kumar",
    email: "arun@example.com",
    courseId: 1,
    progress: 75,
    completedLessons: 15,
    totalLessons: 20,
    quizScore: 85,
    completedAssignments: 3,
    totalAssignments: 4,
    lastActivity: "Today",
    status: "In Progress",
    lessons: [
      { id: 1, title: "Introduction to Ayurveda", type: "Video", completed: true },
      { id: 2, title: "Basic Principles", type: "PDF", completed: true },
      { id: 3, title: "Clinical Assessment", type: "Video", completed: true },
      { id: 4, title: "Patient Examination", type: "Video", completed: false },
    ],
  },
  {
    id: 2,
    studentId: "AVP002",
    studentName: "Priya Sharma",
    email: "priya@example.com",
    courseId: 1,
    progress: 90,
    completedLessons: 18,
    totalLessons: 20,
    quizScore: 95,
    completedAssignments: 4,
    totalAssignments: 4,
    lastActivity: "Yesterday",
    status: "In Progress",
    lessons: [
      { id: 1, title: "Introduction to Ayurveda", type: "Video", completed: true },
      { id: 2, title: "Basic Principles", type: "PDF", completed: true },
      { id: 3, title: "Clinical Assessment", type: "Video", completed: true },
      { id: 4, title: "Patient Examination", type: "Video", completed: true },
    ],
  },
  {
    id: 3,
    studentId: "AVP003",
    studentName: "Rahul Menon",
    email: "rahul@example.com",
    courseId: 3,
    progress: 40,
    completedLessons: 6,
    totalLessons: 15,
    quizScore: 55,
    completedAssignments: 1,
    totalAssignments: 3,
    lastActivity: "3 days ago",
    status: "In Progress",
    lessons: [
      { id: 1, title: "Fundamentals of Ayurveda", type: "Video", completed: true },
      { id: 2, title: "Tridosha Principles", type: "PDF", completed: true },
      { id: 3, title: "Introduction to Sanskrit", type: "Video", completed: false },
    ],
  },
  {
    id: 4,
    studentId: "AVP004",
    studentName: "Divya Nair",
    email: "divya@example.com",
    courseId: 2,
    progress: 65,
    completedLessons: 13,
    totalLessons: 20,
    quizScore: 78,
    completedAssignments: 2,
    totalAssignments: 3,
    lastActivity: "Today",
    status: "In Progress",
    lessons: [
      { id: 1, title: "Introduction to Marma Therapy", type: "Video", completed: true },
      { id: 2, title: "Marma Point Identification", type: "PDF", completed: true },
      { id: 3, title: "Clinical Demonstration", type: "Video", completed: false },
    ],
  },
  {
    id: 5,
    studentId: "AVP005",
    studentName: "Vignesh Raj",
    email: "vignesh@example.com",
    courseId: 1,
    progress: 20,
    completedLessons: 4,
    totalLessons: 20,
    quizScore: 35,
    completedAssignments: 0,
    totalAssignments: 4,
    lastActivity: "5 days ago",
    status: "At Risk",
    lessons: [
      { id: 1, title: "Introduction to Ayurveda", type: "Video", completed: true },
      { id: 2, title: "Basic Principles", type: "PDF", completed: false },
      { id: 3, title: "Clinical Assessment", type: "Video", completed: false },
    ],
  },
  {
    id: 6,
    studentId: "AVP006",
    studentName: "Meena Krishnan",
    email: "meena@example.com",
    courseId: 3,
    progress: 100,
    completedLessons: 15,
    totalLessons: 15,
    quizScore: 92,
    completedAssignments: 3,
    totalAssignments: 3,
    lastActivity: "Today",
    status: "Completed",
    lessons: [
      { id: 1, title: "Fundamentals of Ayurveda", type: "Video", completed: true },
      { id: 2, title: "Tridosha Principles", type: "PDF", completed: true },
      { id: 3, title: "Introduction to Sanskrit", type: "Video", completed: true },
    ],
  },
];

function FacultyStudentProgress() {
  const [progressData] = useState(initialProgress);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredProgress = useMemo(() => {
    return progressData.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        item.studentName.toLowerCase().includes(searchText) ||
        item.studentId.toLowerCase().includes(searchText) ||
        item.email.toLowerCase().includes(searchText);

      const matchesCourse =
        courseFilter === "all" ||
        item.courseId === Number(courseFilter);

      const matchesStatus =
        statusFilter === "all" ||
        item.status === statusFilter;

      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [progressData, search, courseFilter, statusFilter]);

  const totalRecords = progressData.length;

  const averageProgress = totalRecords
    ? Math.round(
        progressData.reduce((sum, item) => sum + item.progress, 0) /
          totalRecords
      )
    : 0;

  const completedCount = progressData.filter(
    (item) => item.status === "Completed"
  ).length;

  const atRiskCount = progressData.filter(
    (item) => item.status === "At Risk"
  ).length;

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

  return (
    <div className="min-h-screen">

      {/* PAGE HEADER */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-[#572000]">
          Student Progress
        </h1>
        <p className="mt-1 text-sm text-[#8B6B55]">
          Monitor student learning progress, assessments and course performance.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          title="Total Enrolments"
          value={totalRecords}
          icon={<Users size={22} />}
        />

        <SummaryCard
          title="Average Progress"
          value={`${averageProgress}%`}
          icon={<TrendingUp size={22} />}
        />

        <SummaryCard
          title="Completed Courses"
          value={completedCount}
          icon={<Award size={22} />}
        />

        <SummaryCard
          title="Students At Risk"
          value={atRiskCount}
          icon={<AlertCircle size={22} />}
        />

      </div>

      {/* PROGRESS OVERVIEW */}
      <div className="mb-7 rounded-2xl border border-[#F0E1D1] bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-2">
          <Target size={20} className="text-[#FF7600]" />
          <h2 className="font-bold text-[#572000]">
            Learning Performance Overview
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          <OverviewItem
            label="Completed"
            count={completedCount}
            total={totalRecords}
            color="#79A91B"
          />

          <OverviewItem
            label="In Progress"
            count={progressData.filter(
              (item) => item.status === "In Progress"
            ).length}
            total={totalRecords}
            color="#FF7600"
          />

          <OverviewItem
            label="At Risk"
            count={atRiskCount}
            total={totalRecords}
            color="#DC6464"
          />

        </div>
      </div>

      {/* FILTERS */}
      <div className="mb-6 rounded-2xl border border-[#F0E1D1] bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center gap-2">
          <Filter size={18} className="text-[#FF7600]" />
          <h2 className="font-semibold text-[#572000]">
            Search & Filter Progress
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
              placeholder="Search student name or ID..."
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
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="At Risk">At Risk</option>
          </select>

        </div>
      </div>

      {/* STUDENT PROGRESS TABLE */}
      <div className="overflow-hidden rounded-2xl border border-[#F0E1D1] bg-white shadow-sm">

        <div className="border-b border-[#F0E1D1] p-5">
          <h2 className="text-lg font-bold text-[#572000]">
            Course-wise Student Progress
          </h2>
          <p className="mt-1 text-sm text-[#9A806C]">
            {filteredProgress.length} record(s) found
          </p>
        </div>

        {filteredProgress.length === 0 ? (
          <div className="py-14 text-center">
            <BookOpen
              size={40}
              className="mx-auto mb-3 text-[#C5A88D]"
            />
            <h3 className="font-semibold text-[#572000]">
              No progress records found
            </h3>
            <p className="mt-1 text-sm text-[#9A806C]">
              Try changing your filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left">
              <thead className="bg-[#FFF8EF]">
                <tr className="text-xs uppercase tracking-wide text-[#8B6B55]">
                  <th className="px-5 py-4 font-semibold">Student</th>
                  <th className="px-5 py-4 font-semibold">Course</th>
                  <th className="px-5 py-4 font-semibold">Lesson Progress</th>
                  <th className="px-5 py-4 font-semibold">Quiz Score</th>
                  <th className="px-5 py-4 font-semibold">Assignments</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-center font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F1E7DD]">
                {filteredProgress.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-[#FFFCF8]"
                  >

                    {/* STUDENT */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFE7CF] text-sm font-bold text-[#FF7600]">
                          {getInitials(item.studentName)}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-[#572000]">
                            {item.studentName}
                          </p>
                          <p className="mt-1 text-xs text-[#9A806C]">
                            {item.studentId}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* COURSE */}
                    <td className="max-w-[200px] px-5 py-4">
                      <p className="text-sm font-medium text-[#572000]">
                        {getCourseName(item.courseId)}
                      </p>
                    </td>

                    {/* LESSON PROGRESS */}
                    <td className="px-5 py-4">
                      <div className="w-36">
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="text-[#9A806C]">
                            {item.completedLessons}/{item.totalLessons}
                          </span>
                          <span className="font-bold text-[#572000]">
                            {item.progress}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-[#F3E8DC]">
                          <div
                            className="h-full rounded-full bg-[#FF7600]"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* QUIZ */}
                    <td className="px-5 py-4">
                      <span
                        className={`text-sm font-bold ${
                          item.quizScore >= 70
                            ? "text-green-700"
                            : "text-red-500"
                        }`}
                      >
                        {item.quizScore}%
                      </span>
                    </td>

                    {/* ASSIGNMENTS */}
                    <td className="px-5 py-4">
                      <span className="text-sm text-[#572000]">
                        {item.completedAssignments}/{item.totalAssignments}
                      </span>
                      <p className="mt-1 text-xs text-[#9A806C]">
                        Completed
                      </p>
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-4">
                      <ProgressStatus status={item.status} />
                    </td>

                    {/* ACTION */}
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => setSelectedStudent(item)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#EAD9C8] px-3 py-2 text-xs font-semibold text-[#FF7600] hover:bg-[#FFF3E5]"
                      >
                        <Eye size={15} />
                        View Details
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* STUDENT PROGRESS DETAIL MODAL */}
      {selectedStudent && (
        <Modal
          title="Student Progress Details"
          onClose={() => setSelectedStudent(null)}
        >
          <div className="space-y-5">

            {/* STUDENT INFO */}
            <div className="rounded-xl bg-[#FFF8EF] p-5">
              <p className="text-lg font-bold text-[#572000]">
                {selectedStudent.studentName}
              </p>

              <p className="mt-1 text-sm text-[#9A806C]">
                {selectedStudent.studentId}
              </p>

              <p className="mt-1 break-all text-xs text-[#9A806C]">
                {selectedStudent.email}
              </p>

              <div className="mt-3">
                <ProgressStatus status={selectedStudent.status} />
              </div>
            </div>

            {/* COURSE */}
            <div>
              <h3 className="mb-2 font-semibold text-[#572000]">
                Course Information
              </h3>

              <div className="rounded-xl border border-[#F0E1D1] p-4">
                <div className="flex items-center gap-2">
                  <GraduationCap size={19} className="text-[#FF7600]" />
                  <p className="text-sm font-semibold text-[#572000]">
                    {getCourseName(selectedStudent.courseId)}
                  </p>
                </div>
              </div>
            </div>

            {/* PROGRESS STATS */}
            <div className="grid grid-cols-2 gap-3">
              <DetailStat
                label="Lesson Completion"
                value={`${selectedStudent.progress}%`}
                icon={<BookOpen size={18} />}
              />

              <DetailStat
                label="Quiz Score"
                value={`${selectedStudent.quizScore}%`}
                icon={<Award size={18} />}
              />

              <DetailStat
                label="Completed Lessons"
                value={`${selectedStudent.completedLessons}/${selectedStudent.totalLessons}`}
                icon={<CheckCircle2 size={18} />}
              />

              <DetailStat
                label="Assignments"
                value={`${selectedStudent.completedAssignments}/${selectedStudent.totalAssignments}`}
                icon={<ClipboardCheck size={18} />}
              />
            </div>

            {/* LESSON CHECKLIST */}
            <div>
              <h3 className="mb-3 font-semibold text-[#572000]">
                Lesson Completion
              </h3>

              <div className="space-y-2">
                {selectedStudent.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[#F0E1D1] p-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="text-[#FF7600]">
                        {lesson.type === "Video" ? (
                          <Video size={18} />
                        ) : (
                          <FileText size={18} />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#572000]">
                          {lesson.title}
                        </p>
                        <p className="mt-1 text-xs text-[#9A806C]">
                          {lesson.type}
                        </p>
                      </div>
                    </div>

                    {lesson.completed ? (
                      <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-green-700">
                        <CheckCircle2 size={15} />
                        Completed
                      </span>
                    ) : (
                      <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-orange-600">
                        <Clock size={15} />
                        Pending
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* LAST ACTIVITY */}
            <div className="flex items-center justify-between rounded-xl bg-[#FFF3E5] p-4">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} className="text-[#FF7600]" />
                <span className="text-sm font-medium text-[#572000]">
                  Last Learning Activity
                </span>
              </div>

              <span className="text-sm font-semibold text-[#8B6B55]">
                {selectedStudent.lastActivity}
              </span>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="w-full rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white hover:bg-[#E66A00]"
            >
              Close
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

// OVERVIEW ITEM
function OverviewItem({ label, count, total, color }) {
  const percentage = total ? (count / total) * 100 : 0;

  return (
    <div className="rounded-xl border border-[#F0E1D1] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-[#8B6B55]">
          {label}
        </span>

        <span className="text-lg font-bold text-[#572000]">
          {count}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#F3E8DC]">
        <div
          className="h-full rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>

      <p className="mt-2 text-xs text-[#9A806C]">
        {percentage.toFixed(0)}% of total records
      </p>
    </div>
  );
}

// STATUS
function ProgressStatus({ status }) {
  const styles = {
    Completed: "bg-green-50 text-green-700",
    "In Progress": "bg-orange-50 text-orange-700",
    "At Risk": "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

// DETAIL STAT
function DetailStat({ label, value, icon }) {
  return (
    <div className="rounded-xl border border-[#F0E1D1] p-4">
      <div className="mb-2 flex items-center gap-2 text-[#FF7600]">
        {icon}
        <span className="text-xs text-[#9A806C]">{label}</span>
      </div>

      <p className="text-xl font-bold text-[#572000]">{value}</p>
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

export default FacultyStudentProgress;
