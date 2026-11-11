
import { useMemo, useState } from "react";
import {
  Users,
  BookOpen,
  GraduationCap,
  ClipboardList,
  IndianRupee,
  TrendingUp,
  Download,
  Search,
  Filter,
  Award,
  CheckCircle,
  Clock,
  UserCheck,
  BarChart3,
  FileText,
} from "lucide-react";

const courseReports = [
  {
    id: 1,
    course: "Advanced Clinical Ayurveda",
    category: "Advanced Course",
    faculty: "Dr. Arun Kumar",
    students: 65,
    completed: 38,
    ongoing: 22,
    pending: 5,
    fee: 15000,
    revenue: 975000,
    averageScore: 78,
    pass: 34,
    fail: 4,
  },
  {
    id: 2,
    course: "Marma Therapy",
    category: "Clinical Course",
    faculty: "Dr. Meena",
    students: 42,
    completed: 28,
    ongoing: 12,
    pending: 2,
    fee: 10000,
    revenue: 420000,
    averageScore: 82,
    pass: 25,
    fail: 3,
  },
  {
    id: 3,
    course: "Basic Ayurveda Course",
    category: "Basic Course",
    faculty: "Dr. Priya",
    students: 35,
    completed: 15,
    ongoing: 15,
    pending: 5,
    fee: 0,
    revenue: 0,
    averageScore: 72,
    pass: 12,
    fail: 3,
  },
];

const facultyReports = [
  {
    id: 1,
    name: "Dr. Arun Kumar",
    specialization: "Clinical Ayurveda",
    courses: 2,
    students: 65,
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Priya",
    specialization: "Panchakarma",
    courses: 1,
    students: 35,
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Meena",
    specialization: "Marma Therapy",
    courses: 1,
    students: 42,
    status: "Active",
  },
];

const initialExamReports = [
  {
    id: 1,
    exam: "Advanced Ayurveda - Final Examination",
    course: "Advanced Clinical Ayurveda",
    attempts: 42,
    passed: 34,
    failed: 8,
    average: 76,
  },
  {
    id: 2,
    exam: "Marma Therapy Assessment",
    course: "Marma Therapy",
    attempts: 28,
    passed: 25,
    failed: 3,
    average: 82,
  },
  {
    id: 3,
    exam: "Basic Ayurveda Knowledge Test",
    course: "Basic Ayurveda Course",
    attempts: 15,
    passed: 12,
    failed: 3,
    average: 72,
  },
];

function AdminReports() {
  const [activeTab, setActiveTab] = useState("overview");
  const [courseFilter, setCourseFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredCourses = useMemo(() => {
    return courseReports.filter((item) => {
      const matchesCourse =
        courseFilter === "All" || item.course === courseFilter;

      const matchesSearch =
        item.course.toLowerCase().includes(search.toLowerCase()) ||
        item.faculty.toLowerCase().includes(search.toLowerCase());

      return matchesCourse && matchesSearch;
    });
  }, [courseFilter, search]);

  const totalStudents = courseReports.reduce(
    (sum, item) => sum + item.students,
    0
  );

  const totalRevenue = courseReports.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const totalCompleted = courseReports.reduce(
    (sum, item) => sum + item.completed,
    0
  );

  const totalPass = initialExamReports.reduce(
    (sum, item) => sum + item.passed,
    0
  );

  const totalFail = initialExamReports.reduce(
    (sum, item) => sum + item.failed,
    0
  );

  const totalExamAttempts = totalPass + totalFail;

  const overallPassRate =
    totalExamAttempts > 0
      ? Math.round((totalPass / totalExamAttempts) * 100)
      : 0;

  const averageScore = Math.round(
    courseReports.reduce((sum, item) => sum + item.averageScore, 0) /
      courseReports.length
  );

  const formatCurrency = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  const handleExportCSV = () => {
    const headers = [
      "Course",
      "Category",
      "Faculty",
      "Students",
      "Completed",
      "Ongoing",
      "Pending",
      "Course Fee",
      "Revenue",
      "Average Score",
      "Passed",
      "Failed",
    ];

    const rows = filteredCourses.map((item) => [
      item.course,
      item.category,
      item.faculty,
      item.students,
      item.completed,
      item.ongoing,
      item.pending,
      item.fee,
      item.revenue,
      item.averageScore,
      item.pass,
      item.fail,
    ]);

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "AVPRF-LMS-Course-Reports.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "courses", label: "Course Reports", icon: BookOpen },
    { id: "faculty", label: "Faculty Reports", icon: Users },
    { id: "examinations", label: "Examination Reports", icon: ClipboardList },
    { id: "payments", label: "Payment Reports", icon: IndianRupee },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#572000]">
            Reports & Analytics
          </h1>
          <p className="mt-1 text-sm text-[#8B6B55]">
            Monitor student enrolments, courses, faculty, examinations and payments.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e96900]"
        >
          <Download size={17} />
          Export Course CSV
        </button>
      </div>

      {/* Main Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Users size={21} />}
          label="Total Enrolments"
          value={totalStudents}
          description="Across all courses"
        />

        <StatCard
          icon={<BookOpen size={21} />}
          label="Total Courses"
          value={courseReports.length}
          description="Course records"
        />

        <StatCard
          icon={<GraduationCap size={21} />}
          label="Course Completions"
          value={totalCompleted}
          description="Students completed"
        />

        <StatCard
          icon={<IndianRupee size={21} />}
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          description="Sample course revenue"
        />
      </div>

      {/* Report Tabs */}
      <div className="overflow-x-auto rounded-2xl border border-[#F0E2D3] bg-white p-2">
        <div className="flex min-w-max gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-[#FF7600] text-white"
                    : "text-[#8B6B55] hover:bg-[#FFF3E5]"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* Course Completion */}
          <ReportCard title="Course Completion Overview">
            <div className="space-y-5">
              {courseReports.map((item) => {
                const percentage = Math.round(
                  (item.completed / item.students) * 100
                );

                return (
                  <div key={item.id}>
                    <div className="mb-2 flex justify-between gap-3">
                      <p className="text-sm font-semibold text-[#572000]">
                        {item.course}
                      </p>
                      <p className="text-sm font-bold text-[#FF7600]">
                        {percentage}%
                      </p>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-[#F2E8DE]">
                      <div
                        className="h-full rounded-full bg-[#FF7600]"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <p className="mt-1 text-xs text-[#9B806C]">
                      {item.completed} completed out of {item.students} students
                    </p>
                  </div>
                );
              })}
            </div>
          </ReportCard>

          {/* Examination Performance */}
          <ReportCard title="Examination Performance">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-xs text-green-700">Passed</p>
                <p className="mt-2 text-3xl font-bold text-green-800">
                  {totalPass}
                </p>
              </div>

              <div className="rounded-xl bg-red-50 p-4">
                <p className="text-xs text-red-700">Failed</p>
                <p className="mt-2 text-3xl font-bold text-red-800">
                  {totalFail}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-[#FFF8EF] p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#8B6B55]">
                  Overall Pass Rate
                </p>
                <p className="text-lg font-bold text-[#572000]">
                  {overallPassRate}%
                </p>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#F2E8DE]">
                <div
                  className="h-full rounded-full bg-[#79A91B]"
                  style={{ width: `${overallPassRate}%` }}
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm text-[#8B6B55]">
                Average Course Score
              </span>
              <span className="text-xl font-bold text-[#572000]">
                {averageScore}%
              </span>
            </div>
          </ReportCard>

          {/* Faculty Allocation */}
          <ReportCard title="Faculty-wise Course Allocation">
            <div className="space-y-4">
              {facultyReports.map((faculty) => (
                <div
                  key={faculty.id}
                  className="flex items-center justify-between gap-3 rounded-xl bg-[#FFF8EF] p-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#572000]">
                      {faculty.name}
                    </p>
                    <p className="mt-1 text-xs text-[#92745D]">
                      {faculty.specialization}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-[#572000]">
                      {faculty.courses} Courses
                    </p>
                    <p className="mt-1 text-xs text-[#92745D]">
                      {faculty.students} Students
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ReportCard>

          {/* Payment Summary */}
          <ReportCard title="Payment Summary">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#92745D]">
                    Paid Course Revenue
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[#572000]">
                    {formatCurrency(totalRevenue)}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF3E5] text-[#FF7600]">
                  <IndianRupee size={22} />
                </div>
              </div>

              <div className="border-t border-[#F0E2D3] pt-4">
                <p className="text-sm text-[#92745D]">
                  Free Course Enrolments
                </p>
                <p className="mt-1 text-xl font-bold text-[#572000]">
                  {courseReports
                    .filter((course) => course.fee === 0)
                    .reduce((sum, course) => sum + course.students, 0)}
                </p>
              </div>

              <p className="text-xs leading-5 text-[#9B806C]">
                Revenue shown here is sample course-fee data, not verified payment transactions.
              </p>
            </div>
          </ReportCard>
        </div>
      )}

      {/* Course Reports */}
      {activeTab === "courses" && (
        <div className="space-y-4">
          <ReportFilters
            search={search}
            setSearch={setSearch}
            courseFilter={courseFilter}
            setCourseFilter={setCourseFilter}
          />

          <div className="overflow-x-auto rounded-2xl border border-[#F0E2D3] bg-white">
            <table className="w-full min-w-[950px] text-left">
              <TableHeader
                columns={[
                  "Course",
                  "Faculty",
                  "Students",
                  "Completed",
                  "Ongoing",
                  "Pending",
                  "Average Score",
                  "Revenue",
                ]}
              />

              <tbody className="divide-y divide-[#F2E8DE]">
                {filteredCourses.map((item) => (
                  <tr key={item.id}>
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-[#572000]">
                        {item.course}
                      </p>
                      <p className="mt-1 text-xs text-[#9B806C]">
                        {item.category}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-[#8B6B55]">
                      {item.faculty}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-[#572000]">
                      {item.students}
                    </td>

                    <td className="px-5 py-4 text-sm text-green-700">
                      {item.completed}
                    </td>

                    <td className="px-5 py-4 text-sm text-[#8B6B55]">
                      {item.ongoing}
                    </td>

                    <td className="px-5 py-4 text-sm text-[#8B6B55]">
                      {item.pending}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-[#FF7600]">
                      {item.averageScore}%
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-[#572000]">
                      {formatCurrency(item.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredCourses.length === 0 && (
              <EmptyState message="No course reports found." />
            )}
          </div>
        </div>
      )}

      {/* Faculty Reports */}
      {activeTab === "faculty" && (
        <div className="overflow-x-auto rounded-2xl border border-[#F0E2D3] bg-white">
          <table className="w-full min-w-[700px] text-left">
            <TableHeader
              columns={[
                "Faculty Name",
                "Specialization",
                "Assigned Courses",
                "Students",
                "Status",
              ]}
            />

            <tbody className="divide-y divide-[#F2E8DE]">
              {facultyReports.map((faculty) => (
                <tr key={faculty.id}>
                  <td className="px-5 py-4 text-sm font-semibold text-[#572000]">
                    {faculty.name}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#8B6B55]">
                    {faculty.specialization}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#572000]">
                    {faculty.courses}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#572000]">
                    {faculty.students}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                      {faculty.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Examination Reports */}
      {activeTab === "examinations" && (
        <div className="overflow-x-auto rounded-2xl border border-[#F0E2D3] bg-white">
          <table className="w-full min-w-[850px] text-left">
            <TableHeader
              columns={[
                "Examination",
                "Course",
                "Attempts",
                "Passed",
                "Failed",
                "Average Score",
                "Pass Rate",
              ]}
            />

            <tbody className="divide-y divide-[#F2E8DE]">
              {initialExamReports.map((exam) => {
                const passRate =
                  exam.attempts > 0
                    ? Math.round((exam.passed / exam.attempts) * 100)
                    : 0;

                return (
                  <tr key={exam.id}>
                    <td className="px-5 py-4 text-sm font-semibold text-[#572000]">
                      {exam.exam}
                    </td>

                    <td className="px-5 py-4 text-sm text-[#8B6B55]">
                      {exam.course}
                    </td>

                    <td className="px-5 py-4 text-sm text-[#572000]">
                      {exam.attempts}
                    </td>

                    <td className="px-5 py-4 text-sm text-green-700">
                      {exam.passed}
                    </td>

                    <td className="px-5 py-4 text-sm text-red-600">
                      {exam.failed}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-[#572000]">
                      {exam.average}%
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-[#FF7600]">
                      {passRate}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Payment Reports */}
      {activeTab === "payments" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <PaymentCard
              label="Total Course Revenue"
              value={formatCurrency(totalRevenue)}
              icon={<IndianRupee size={21} />}
            />

            <PaymentCard
              label="Paid Course Enrolments"
              value={courseReports
                .filter((course) => course.fee > 0)
                .reduce((sum, course) => sum + course.students, 0)}
              icon={<Users size={21} />}
            />

            <PaymentCard
              label="Free Course Enrolments"
              value={courseReports
                .filter((course) => course.fee === 0)
                .reduce((sum, course) => sum + course.students, 0)}
              icon={<BookOpen size={21} />}
            />
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#F0E2D3] bg-white">
            <TableHeader columns={["Course", "Fee", "Enrolments", "Revenue"]} />

            <table className="w-full min-w-[600px] text-left">
              <tbody className="divide-y divide-[#F2E8DE]">
                {courseReports.map((course) => (
                  <tr key={course.id}>
                    <td className="px-5 py-4 text-sm font-semibold text-[#572000]">
                      {course.course}
                    </td>
                    <td className="px-5 py-4 text-sm text-[#8B6B55]">
                      {course.fee === 0 ? "Free" : formatCurrency(course.fee)}
                    </td>
                    <td className="px-5 py-4 text-sm text-[#572000]">
                      {course.students}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-[#572000]">
                      {formatCurrency(course.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[#9B806C]">
            Payment figures are illustrative. Actual collected amounts, refunds and pending payments must come from verified payment transactions.
          </p>
        </div>
      )}
    </div>
  );
}

/* Reusable Components */

function StatCard({ icon, label, value, description }) {
  return (
    <div className="rounded-2xl border border-[#F0E2D3] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#92745D]">{label}</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF3E5] text-[#FF7600]">
          {icon}
        </div>
      </div>

      <h3 className="mt-3 text-2xl font-bold text-[#572000]">
        {value}
      </h3>

      <p className="mt-1 text-xs text-[#9B806C]">{description}</p>
    </div>
  );
}

function ReportCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-[#F0E2D3] bg-white p-5 shadow-sm">
      <h3 className="mb-5 font-bold text-[#572000]">{title}</h3>
      {children}
    </div>
  );
}

function ReportFilters({
  search,
  setSearch,
  courseFilter,
  setCourseFilter,
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#F0E2D3] bg-white p-4 sm:flex-row">
      <div className="relative flex-1">
        <Search
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A88B76]"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search course or faculty..."
          className="w-full rounded-xl border border-[#EAD9C8] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#FF7600]"
        />
      </div>

      <select
        value={courseFilter}
        onChange={(e) => setCourseFilter(e.target.value)}
        className="rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
      >
        <option value="All">All Courses</option>
        {courseReports.map((course) => (
          <option key={course.id} value={course.course}>
            {course.course}
          </option>
        ))}
      </select>
    </div>
  );
}

function TableHeader({ columns }) {
  return (
    <table className="w-full text-left">
      <thead className="bg-[#FFF8EF]">
        <tr className="text-xs uppercase tracking-wide text-[#92745D]">
          {columns.map((column) => (
            <th key={column} className="px-5 py-4 font-semibold">
              {column}
            </th>
          ))}
        </tr>
      </thead>
    </table>
  );
}

function PaymentCard({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-[#F0E2D3] bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#92745D]">{label}</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF3E5] text-[#FF7600]">
          {icon}
        </div>
      </div>
      <h3 className="mt-4 text-2xl font-bold text-[#572000]">{value}</h3>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="p-10 text-center text-sm text-[#9B806C]">
      {message}
    </div>
  );
}

export default AdminReports;
