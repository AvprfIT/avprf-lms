
import { useMemo, useState } from "react";
import {
  Search,
  ClipboardList,
  BookOpen,
  Users,
  CheckCircle,
  Clock,
  Eye,
  X,
  CalendarDays,
  Timer,
  Award,
  FileText,
  Filter,
  BarChart3,
} from "lucide-react";

const initialExaminations = [
  {
    id: 1,
    title: "Advanced Ayurveda - Final Examination",
    course: "Advanced Clinical Ayurveda",
    faculty: "Dr. Arun Kumar",
    questions: 30,
    totalMarks: 100,
    duration: 60,
    attemptsAllowed: 3,
    passMarks: 50,
    startDate: "2026-11-15",
    endDate: "2026-11-20",
    status: "Published",
    totalStudents: 65,
    completed: 42,
    pending: 23,
    averageScore: 76,
  },
  {
    id: 2,
    title: "Marma Therapy Assessment",
    course: "Marma Therapy",
    faculty: "Dr. Meena",
    questions: 20,
    totalMarks: 50,
    duration: 45,
    attemptsAllowed: 2,
    passMarks: 25,
    startDate: "2026-11-18",
    endDate: "2026-11-25",
    status: "Published",
    totalStudents: 42,
    completed: 28,
    pending: 14,
    averageScore: 82,
  },
  {
    id: 3,
    title: "Basic Ayurveda Knowledge Test",
    course: "Basic Ayurveda Course",
    faculty: "Dr. Priya",
    questions: 15,
    totalMarks: 30,
    duration: 30,
    attemptsAllowed: 1,
    passMarks: 15,
    startDate: "2026-11-25",
    endDate: "2026-11-30",
    status: "Draft",
    totalStudents: 25,
    completed: 0,
    pending: 25,
    averageScore: 0,
  },
  {
    id: 4,
    title: "Clinical Practice Assessment",
    course: "Advanced Clinical Ayurveda",
    faculty: "Dr. Arun Kumar",
    questions: 25,
    totalMarks: 100,
    duration: 60,
    attemptsAllowed: "Unlimited",
    passMarks: 50,
    startDate: "2026-10-20",
    endDate: "2026-10-30",
    status: "Completed",
    totalStudents: 65,
    completed: 60,
    pending: 5,
    averageScore: 78,
  },
];

function AdminExaminations() {
  const [examinations, setExaminations] = useState(initialExaminations);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const [selectedExam, setSelectedExam] = useState(null);

  const totalExams = examinations.length;

  const publishedCount = examinations.filter(
    (exam) => exam.status === "Published"
  ).length;

  const completedCount = examinations.filter(
    (exam) => exam.status === "Completed"
  ).length;

  const totalParticipants = examinations.reduce(
    (total, exam) => total + Number(exam.completed || 0),
    0
  );

  const courses = [
    ...new Set(examinations.map((exam) => exam.course)),
  ];

  const filteredExaminations = useMemo(() => {
    return examinations.filter((exam) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        exam.title.toLowerCase().includes(searchText) ||
        exam.course.toLowerCase().includes(searchText) ||
        exam.faculty.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || exam.status === statusFilter;

      const matchesCourse =
        courseFilter === "All" || exam.course === courseFilter;

      return matchesSearch && matchesStatus && matchesCourse;
    });
  }, [examinations, search, statusFilter, courseFilter]);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const toggleStatus = (id) => {
    setExaminations((previous) =>
      previous.map((exam) => {
        if (exam.id !== id) return exam;

        return {
          ...exam,
          status:
            exam.status === "Published" ? "Draft" : "Published",
        };
      })
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Draft":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#572000]">
          Manage Examinations
        </h1>
        <p className="mt-1 text-sm text-[#8B6B55]">
          Monitor faculty examinations, student participation and results.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<ClipboardList size={21} />}
          label="Total Examinations"
          value={totalExams}
        />

        <StatCard
          icon={<CheckCircle size={21} />}
          label="Published Exams"
          value={publishedCount}
        />

        <StatCard
          icon={<Award size={21} />}
          label="Completed Exams"
          value={completedCount}
        />

        <StatCard
          icon={<Users size={21} />}
          label="Student Attempts"
          value={totalParticipants}
        />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-[#F0E2D3] bg-white p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#572000]">
          <Filter size={17} className="text-[#FF7600]" />
          Search and Filter Examinations
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A88B76]"
            />
            <input
              type="text"
              placeholder="Search exam, course or faculty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#EAD9C8] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#FF7600]"
            />
          </div>

          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
          >
            <option value="All">All Courses</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Examination Table */}
      <div className="overflow-hidden rounded-2xl border border-[#F0E2D3] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#F0E2D3] p-5">
          <div>
            <h2 className="font-bold text-[#572000]">
              Examination Records
            </h2>
            <p className="mt-1 text-xs text-[#9B806C]">
              {filteredExaminations.length} examinations found
            </p>
          </div>
        </div>

        {filteredExaminations.length === 0 ? (
          <div className="p-12 text-center">
            <ClipboardList
              size={38}
              className="mx-auto text-[#C5A88F]"
            />
            <p className="mt-3 font-semibold text-[#572000]">
              No examinations found
            </p>
            <p className="mt-1 text-sm text-[#9B806C]">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-[#FFF8EF]">
                <tr className="text-xs uppercase tracking-wide text-[#92745D]">
                  <th className="px-5 py-4 font-semibold">Examination</th>
                  <th className="px-5 py-4 font-semibold">Faculty</th>
                  <th className="px-5 py-4 font-semibold">Exam Details</th>
                  <th className="px-5 py-4 font-semibold">Participation</th>
                  <th className="px-5 py-4 font-semibold">Exam Period</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F2E8DE]">
                {filteredExaminations.map((exam) => {
                  const percentage =
                    exam.totalStudents > 0
                      ? Math.round(
                          (exam.completed / exam.totalStudents) * 100
                        )
                      : 0;

                  return (
                    <tr key={exam.id} className="hover:bg-[#FFFCF8]">
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-[#572000]">
                          {exam.title}
                        </p>
                        <p className="mt-1 text-xs text-[#9B806C]">
                          {exam.course}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-[#8B6B55]">
                        {exam.faculty}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-[#572000]">
                          {exam.totalMarks} Marks
                        </p>
                        <p className="mt-1 text-xs text-[#9B806C]">
                          {exam.questions} Questions · {exam.duration} Min
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-[#572000]">
                          {exam.completed}/{exam.totalStudents}
                        </p>

                        <div className="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-[#F2E8DE]">
                          <div
                            className="h-full rounded-full bg-[#FF7600]"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>

                        <p className="mt-1 text-xs text-[#9B806C]">
                          {percentage}% Completed
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-xs text-[#572000]">
                          {formatDate(exam.startDate)}
                        </p>
                        <p className="mt-1 text-xs text-[#9B806C]">
                          to {formatDate(exam.endDate)}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                            exam.status
                          )}`}
                        >
                          {exam.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedExam(exam)}
                            title="View examination"
                            className="rounded-lg p-2 text-[#8B6B55] hover:bg-[#FFF3E5] hover:text-[#FF7600]"
                          >
                            <Eye size={17} />
                          </button>

                          {exam.status !== "Completed" && (
                            <button
                              onClick={() => toggleStatus(exam.id)}
                              className="rounded-lg border border-[#EAD9C8] px-3 py-2 text-xs font-semibold text-[#8B6B55] hover:bg-[#FFF3E5]"
                            >
                              {exam.status === "Published"
                                ? "Unpublish"
                                : "Publish"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Examination Details Modal */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F0E2D3] p-5">
              <div>
                <h2 className="text-lg font-bold text-[#572000]">
                  Examination Details
                </h2>
                <p className="mt-1 text-xs text-[#9B806C]">
                  Examination overview and student participation.
                </p>
              </div>

              <button
                onClick={() => setSelectedExam(null)}
                className="rounded-lg p-2 text-[#8B6B55] hover:bg-[#FFF3E5]"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                    selectedExam.status
                  )}`}
                >
                  {selectedExam.status}
                </span>

                <h3 className="mt-3 text-xl font-bold text-[#572000]">
                  {selectedExam.title}
                </h3>

                <p className="mt-1 text-sm text-[#8B6B55]">
                  {selectedExam.course}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <DetailBox
                  icon={<FileText size={17} />}
                  label="Questions"
                  value={selectedExam.questions}
                />

                <DetailBox
                  icon={<Award size={17} />}
                  label="Total Marks"
                  value={selectedExam.totalMarks}
                />

                <DetailBox
                  icon={<Timer size={17} />}
                  label="Duration"
                  value={`${selectedExam.duration} Minutes`}
                />

                <DetailBox
                  icon={<CheckCircle size={17} />}
                  label="Pass Marks"
                  value={selectedExam.passMarks}
                />

                <DetailBox
                  icon={<Clock size={17} />}
                  label="Allowed Attempts"
                  value={selectedExam.attemptsAllowed}
                />

                <DetailBox
                  icon={<Users size={17} />}
                  label="Total Students"
                  value={selectedExam.totalStudents}
                />
              </div>

              <section className="rounded-xl border border-[#EAD9C8] p-4">
                <h4 className="font-semibold text-[#572000]">
                  Faculty and Schedule
                </h4>

                <div className="mt-3 space-y-3">
                  <DetailRow
                    label="Assigned Faculty"
                    value={selectedExam.faculty}
                  />

                  <DetailRow
                    label="Start Date"
                    value={formatDate(selectedExam.startDate)}
                  />

                  <DetailRow
                    label="End Date"
                    value={formatDate(selectedExam.endDate)}
                  />
                </div>
              </section>

              <section>
                <h4 className="mb-3 font-semibold text-[#572000]">
                  Student Participation
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-green-50 p-4">
                    <p className="text-xs text-green-700">
                      Completed
                    </p>
                    <p className="mt-1 text-2xl font-bold text-green-800">
                      {selectedExam.completed}
                    </p>
                  </div>

                  <div className="rounded-xl bg-yellow-50 p-4">
                    <p className="text-xs text-yellow-700">
                      Pending
                    </p>
                    <p className="mt-1 text-2xl font-bold text-yellow-800">
                      {selectedExam.pending}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-[#FFF8EF] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#8B6B55]">
                      Average Score
                    </p>
                    <p className="font-bold text-[#572000]">
                      {selectedExam.averageScore}%
                    </p>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#F2E8DE]">
                    <div
                      className="h-full rounded-full bg-[#FF7600]"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(0, Number(selectedExam.averageScore) || 0)
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </section>

              <div className="flex justify-end border-t border-[#F0E2D3] pt-4">
                <button
                  onClick={() => setSelectedExam(null)}
                  className="rounded-xl bg-[#FF7600] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#e96900]"
                >
                  Close
                </button>
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

function DetailBox({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-[#FFF8EF] p-3">
      <div className="flex items-center gap-2 text-xs text-[#92745D]">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-sm font-bold text-[#572000]">
        {value}
      </p>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-[#92745D]">{label}</span>
      <span className="text-right font-semibold text-[#572000]">
        {value}
      </span>
    </div>
  );
}

export default AdminExaminations;
