
import {
  BookOpen,
  Users,
  GraduationCap,
  ClipboardList,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    title: "Total Courses",
    value: "12",
    subtitle: "Available courses",
    icon: BookOpen,
  },
  {
    title: "Total Students",
    value: "248",
    subtitle: "Registered students",
    icon: Users,
  },
  {
    title: "Total Faculty",
    value: "18",
    subtitle: "Active faculty",
    icon: GraduationCap,
  },
  {
    title: "Examinations",
    value: "24",
    subtitle: "Created examinations",
    icon: ClipboardList,
  },
];

const recentStudents = [
  {
    name: "Arun Kumar",
    email: "arun@example.com",
    course: "Advanced Clinical Ayurveda",
    status: "Active",
  },
  {
    name: "Priya S",
    email: "priya@example.com",
    course: "Marma Therapy",
    status: "Active",
  },
  {
    name: "Rahul K",
    email: "rahul@example.com",
    course: "Basic Ayurveda",
    status: "Pending",
  },
  {
    name: "Meena R",
    email: "meena@example.com",
    course: "Advanced Clinical Ayurveda",
    status: "Active",
  },
];

const courses = [
  {
    name: "Advanced Clinical Ayurveda",
    students: 65,
    progress: 78,
  },
  {
    name: "Advanced Clinical Course - Marma Therapy",
    students: 42,
    progress: 65,
  },
  {
    name: "Basic Ayurveda Course",
    students: 89,
    progress: 90,
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#572000]">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-[#8B6B55]">
            Welcome back! Here's your LMS overview.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/courses")}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e86b00]"
        >
          <Plus size={18} />
          Add Course
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-[#F0E1D1] bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#8B6B55]">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-[#572000]">
                    {item.value}
                  </h2>

                  <p className="mt-2 text-xs text-[#A68B76]">
                    {item.subtitle}
                  </p>
                </div>

                <div className="rounded-xl bg-[#FFF3E5] p-3 text-[#FF7600]">
                  <Icon size={25} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Courses */}
        <div className="rounded-2xl border border-[#F0E1D1] bg-white p-5 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[#572000]">
                Course Overview
              </h2>
              <p className="mt-1 text-xs text-[#8B6B55]">
                Student enrolment and course progress
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/courses")}
              className="text-sm font-semibold text-[#FF7600]"
            >
              View All
            </button>
          </div>

          <div className="space-y-6">
            {courses.map((course) => (
              <div key={course.name}>
                <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold text-[#572000]">
                    {course.name}
                  </p>

                  <p className="text-xs text-[#8B6B55]">
                    {course.students} Students
                  </p>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-[#FFF3E5]">
                  <div
                    className="h-full rounded-full bg-[#FF7600]"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <p className="mt-1 text-right text-xs text-[#8B6B55]">
                  {course.progress}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-[#F0E1D1] bg-white p-5">
          <h2 className="font-bold text-[#572000]">
            Quick Actions
          </h2>

          <p className="mt-1 text-xs text-[#8B6B55]">
            Frequently used administration tasks
          </p>

          <div className="mt-5 space-y-3">
            {[
              {
                label: "Manage Courses",
                icon: BookOpen,
                path: "/admin/courses",
              },
              {
                label: "Add Faculty",
                icon: GraduationCap,
                path: "/admin/faculty",
              },
              {
                label: "Manage Students",
                icon: Users,
                path: "/admin/students",
              },
              {
                label: "Examinations",
                icon: ClipboardList,
                path: "/admin/examinations",
              },
            ].map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="flex w-full items-center justify-between rounded-xl border border-[#F0E1D1] p-3 text-left transition hover:border-[#FF7600] hover:bg-[#FFF8EF]"
                >
                  <span className="flex items-center gap-3 text-sm font-medium text-[#572000]">
                    <Icon size={19} className="text-[#FF7600]" />
                    {action.label}
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="text-[#A68B76]"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Students */}
      <div className="overflow-hidden rounded-2xl border border-[#F0E1D1] bg-white">
        <div className="flex items-center justify-between border-b border-[#F0E1D1] p-5">
          <div>
            <h2 className="font-bold text-[#572000]">
              Recent Student Registrations
            </h2>
            <p className="mt-1 text-xs text-[#8B6B55]">
              Latest student registration details
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/students")}
            className="text-sm font-semibold text-[#FF7600]"
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-[#FFF8EF] text-xs text-[#8B6B55]">
              <tr>
                <th className="px-5 py-4 font-semibold">Student</th>
                <th className="px-5 py-4 font-semibold">Email</th>
                <th className="px-5 py-4 font-semibold">Course</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F5E9DD]">
              {recentStudents.map((student) => (
                <tr key={student.email}>
                  <td className="px-5 py-4 text-sm font-semibold text-[#572000]">
                    {student.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#8B6B55]">
                    {student.email}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#8B6B55]">
                    {student.course}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        student.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Note */}
      <div className="flex items-center gap-2 rounded-xl bg-white p-4 text-xs text-[#8B6B55]">
        <TrendingUp size={17} className="text-[#79A91B]" />
        <span>
          Dashboard overview currently displays sample data.
          Connect the LMS API to display live statistics.
        </span>
      </div>

    </div>
  );
}
