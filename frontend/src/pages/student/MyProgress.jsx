import { useState } from "react";
import { Link } from "react-router-dom";

import {
  BookOpen,
  CheckCircle2,
  Clock3,
  Award,
  TrendingUp,
  PlayCircle,
  GraduationCap,
  Download,
  Eye,
  Target,
  CalendarDays,
  ChartNoAxesCombined,
  ArrowRight,
  FileBadge,
  Trophy,
} from "lucide-react";

function MyProgress() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");

  // Sample progress data
  const stats = [
    {
      title: "Enrolled Courses",
      value: "03",
      subtitle: "Currently enrolled",
      icon: BookOpen,
      color: "bg-orange-50 text-[#FF7600]",
    },
    {
      title: "Completed Courses",
      value: "01",
      subtitle: "Successfully completed",
      icon: GraduationCap,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Lessons Completed",
      value: "25",
      subtitle: "Out of 55 lessons",
      icon: CheckCircle2,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Learning Hours",
      value: "32",
      subtitle: "Total study hours",
      icon: Clock3,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const courses = [
    {
      id: 1,
      title: "Advanced Clinical Ayurveda",
      category: "Clinical Ayurveda",
      progress: 65,
      completedLessons: 13,
      totalLessons: 20,
      status: "In Progress",
      lastActivity: "Today",
    },
    {
      id: 2,
      title: "Advanced Clinical Course - Marma Therapy",
      category: "Marma Therapy",
      progress: 35,
      completedLessons: 7,
      totalLessons: 20,
      status: "In Progress",
      lastActivity: "Yesterday",
    },
    {
      id: 3,
      title: "Basic Ayurveda Course",
      category: "Basic Ayurveda",
      progress: 100,
      completedLessons: 15,
      totalLessons: 15,
      status: "Completed",
      lastActivity: "Nov 05, 2026",
    },
  ];

  // Weekly activity - sample values
  const weeklyActivity = [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 3 },
    { day: "Wed", hours: 1 },
    { day: "Thu", hours: 4 },
    { day: "Fri", hours: 2 },
    { day: "Sat", hours: 5 },
    { day: "Sun", hours: 3 },
  ];

  const maxHours = Math.max(
    ...weeklyActivity.map((item) => item.hours)
  );

  const certificates = [
    {
      id: 1,
      title: "Basic Ayurveda Course",
      issuedDate: "November 05, 2026",
      certificateNo: "AVPRF/CERT/2026/001",
      status: "Available",
    },
  ];

  const totalHours = weeklyActivity.reduce(
    (sum, item) => sum + item.hours,
    0
  );

  const handleCertificateDownload = (certificate) => {
    alert(
      "Certificate download will be available after connecting the certificate PDF."
    );
  };

  return (
    <div className="space-y-6 text-[#572000]">

      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">
            My Progress
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Track your learning journey and course achievements.
          </p>
        </div>

        
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                  <Icon size={23} />
                </div>
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                {item.value}
              </h3>

              <p className="mt-1 text-sm font-semibold">
                {item.title}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      {/* Overall Progress */}
      <section className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">
              Overall Learning Progress
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Your progress across all enrolled courses.
            </p>
          </div>

          <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-[#FF7600]">
            65% Overall
          </span>
        </div>

        <div className="mt-6 h-4 overflow-hidden rounded-full bg-orange-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FF7600] to-[#FFD76A]"
            style={{ width: "65%" }}
          />
        </div>

        <div className="mt-3 flex justify-between text-xs text-gray-500">
          <span>Learning Started</span>
          <span>65% Completed</span>
          <span>100%</span>
        </div>
      </section>

      {/* Course Progress */}
      <section className="space-y-5">

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">
              Course-wise Progress
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Monitor your progress in each course.
            </p>
          </div>

          <Link
            to="/my-courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF7600] hover:underline"
          >
            View All Courses
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#FF7600]">
                    <BookOpen size={23} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold leading-6">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {course.category}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    course.status === "Completed"
                      ? "bg-green-50 text-green-700"
                      : "bg-orange-50 text-[#FF7600]"
                  }`}
                >
                  {course.status}
                </span>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    Course Progress
                  </span>
                  <span className="font-bold text-[#FF7600]">
                    {course.progress}%
                  </span>
                </div>

                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-orange-100">
                  <div
                    className={`h-full rounded-full ${
                      course.progress === 100
                        ? "bg-[#79A91B]"
                        : "bg-[#FF7600]"
                    }`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {course.completedLessons}/{course.totalLessons} Lessons
                  </span>
                  <span>
                    Last activity: {course.lastActivity}
                  </span>
                </div>
              </div>

              <div className="mt-5 border-t border-gray-100 pt-4">
                <Link
                  to={
                    course.progress === 100
                      ? `/course/${course.id}`
                      : `/learning/${course.id}/1`
                  }
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF7600] hover:underline"
                >
                  {course.status === "Completed"
                    ? "View Course"
                    : "Continue Learning"}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Learning Activity */}
      <section className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">
              Learning Activity
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Your weekly study activity in hours.
            </p>
          </div>

          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="rounded-xl border border-orange-100 bg-[#FFF8EF] px-4 py-2.5 text-sm outline-none focus:border-[#FF7600]"
          >
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
          </select>
        </div>

        <div className="mt-8 flex h-52 items-end justify-around gap-3 border-b border-gray-100 pb-2">
          {weeklyActivity.map((item) => (
            <div
              key={item.day}
              className="flex h-full flex-1 flex-col items-center justify-end gap-3"
            >
              <span className="text-xs font-semibold text-gray-500">
                {item.hours}h
              </span>

              <div
                className="w-full max-w-12 rounded-t-xl bg-[#FF7600] transition-all hover:bg-[#E96A00]"
                style={{
                  height: `${(item.hours / maxHours) * 70}%`,
                }}
              />

              <span className="text-xs text-gray-500">
                {item.day}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between rounded-xl bg-[#FFF8EF] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#FF7600]">
              <Clock3 size={21} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Total study time this week
              </p>
              <p className="mt-1 text-lg font-bold">
                {totalHours} Hours
              </p>
            </div>
          </div>

          <TrendingUp size={22} className="text-[#79A91B]" />
        </div>
      </section>

      {/* Achievements and Certificates */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Achievements */}
        <section className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#FF7600]">
              <Trophy size={23} />
            </div>

            <div>
              <h2 className="font-bold">
                My Achievements
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Your learning milestones.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#FFF8EF] p-4 text-center">
              <Award size={27} className="mx-auto text-[#FF7600]" />
              <h3 className="mt-2 text-xl font-bold">01</h3>
              <p className="mt-1 text-xs text-gray-500">
                Course Completed
              </p>
            </div>

            <div className="rounded-xl bg-[#FFF8EF] p-4 text-center">
              <Target size={27} className="mx-auto text-[#FF7600]" />
              <h3 className="mt-2 text-xl font-bold">25</h3>
              <p className="mt-1 text-xs text-gray-500">
                Lessons Completed
              </p>
            </div>
          </div>
        </section>

        {/* Certificates */}
        <section className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#FF7600]">
              <FileBadge size={23} />
            </div>

            <div>
              <h2 className="font-bold">
                My Certificates
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Your completed course certificates.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="rounded-xl border border-orange-100 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold">
                      {certificate.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-500">
                      Issued: {certificate.issuedDate}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {certificate.certificateNo}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    {certificate.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleCertificateDownload(certificate)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#FF7600] px-4 py-2 text-xs font-semibold text-white hover:bg-[#E96A00]"
                  >
                    <Download size={15} />
                    Download
                  </button>

                  <button
                    type="button"
                    onClick={() => alert("Certificate preview will be connected later.")}
                    className="inline-flex items-center gap-2 rounded-lg border border-orange-200 px-4 py-2 text-xs font-semibold text-[#572000] hover:bg-orange-50"
                  >
                    <Eye size={15} />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Learning Reminder */}
      <section className="rounded-2xl bg-gradient-to-r from-[#572000] to-[#A64B00] p-6 text-white md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays size={22} />
              <h2 className="text-lg font-bold">
                Keep Learning!
              </h2>
            </div>

            <p className="mt-2 max-w-xl text-sm leading-6 text-orange-100">
              Continue your Ayurveda learning journey. Complete your pending lessons and achieve your course goals.
            </p>
          </div>

          <Link
            to="/my-courses"
            className="inline-flex items-center gap-2 rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white hover:bg-[#E96A00]"
          >
            My Courses
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

    </div>
  );
}

export default MyProgress;