import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  CreditCard,
  FileText,
  GraduationCap,
  LockKeyhole,
  PlayCircle,
  Video,
} from "lucide-react";

// Sample Course Data
const courseData = {
  1: {
    id: 1,
    title: "Advanced Clinical Ayurveda",
    category: "Clinical Ayurveda",
    instructor: "AVPRF Faculty",
    description:
      "Enhance your clinical knowledge through structured Ayurveda learning modules, practical concepts and expert guidance.",
    fee: 15000,
    duration: "6 Weeks",
    level: "Advanced",
    progress: 65,
    completedLessons: 13,
    totalLessons: 20,

    modules: [
      {
        id: 1,
        title: "Introduction to Clinical Ayurveda",
        lessons: [
          {
            id: 1,
            title: "Introduction to Ayurveda",
            duration: "15 min",
            type: "video",
            completed: true,
          },
          {
            id: 2,
            title: "Fundamentals of Clinical Practice",
            duration: "22 min",
            type: "video",
            completed: true,
          },
          {
            id: 3,
            title: "Module Study Material",
            duration: "PDF",
            type: "pdf",
            completed: true,
          },
        ],
      },
      {
        id: 2,
        title: "Ayurveda Diagnosis and Assessment",
        lessons: [
          {
            id: 4,
            title: "Patient Assessment",
            duration: "25 min",
            type: "video",
            completed: true,
          },
          {
            id: 5,
            title: "Clinical Examination Methods",
            duration: "30 min",
            type: "video",
            completed: false,
          },
          {
            id: 6,
            title: "Clinical Case Studies",
            duration: "PDF",
            type: "pdf",
            completed: false,
          },
        ],
      },
      {
        id: 3,
        title: "Treatment Principles and Practice",
        lessons: [
          {
            id: 7,
            title: "Treatment Planning",
            duration: "28 min",
            type: "video",
            completed: false,
          },
          {
            id: 8,
            title: "Practical Applications",
            duration: "35 min",
            type: "video",
            completed: false,
          },
        ],
      },
    ],
  },

  2: {
    id: 2,
    title: "Advanced Clinical Course - Marma Therapy",
    category: "Marma Therapy",
    instructor: "AVPRF Faculty",
    description:
      "Explore the principles and clinical applications of Marma Therapy through structured lessons and practical learning.",
    fee: 10000,
    duration: "6 Days",
    level: "Advanced",
    progress: 35,
    completedLessons: 7,
    totalLessons: 20,
    modules: [
      {
        id: 1,
        title: "Introduction to Marma Therapy",
        lessons: [
          {
            id: 1,
            title: "Fundamentals of Marma",
            duration: "20 min",
            type: "video",
            completed: true,
          },
          {
            id: 2,
            title: "Introduction Study Material",
            duration: "PDF",
            type: "pdf",
            completed: false,
          },
        ],
      },
      {
        id: 2,
        title: "Clinical Applications",
        lessons: [
          {
            id: 3,
            title: "Marma Points and Practice",
            duration: "30 min",
            type: "video",
            completed: false,
          },
        ],
      },
    ],
  },

  3: {
    id: 3,
    title: "Basic Ayurveda Course",
    category: "Basic Ayurveda",
    instructor: "AVPRF Faculty",
    description:
      "Learn the foundational principles of Ayurveda, including its concepts, practices and applications.",
    fee: 5000,
    duration: "4 Weeks",
    level: "Beginner",
    progress: 100,
    completedLessons: 15,
    totalLessons: 15,
    modules: [
      {
        id: 1,
        title: "Fundamentals of Ayurveda",
        lessons: [
          {
            id: 1,
            title: "Introduction to Ayurveda",
            duration: "20 min",
            type: "video",
            completed: true,
          },
          {
            id: 2,
            title: "Basic Principles",
            duration: "25 min",
            type: "video",
            completed: true,
          },
        ],
      },
      {
        id: 2,
        title: "Ayurveda Lifestyle",
        lessons: [
          {
            id: 3,
            title: "Daily Routine",
            duration: "PDF",
            type: "pdf",
            completed: true,
          },
        ],
      },
    ],
  },
};

function CourseDetails() {
  const { courseId } = useParams();

  const course = courseData[courseId];

  const [openModule, setOpenModule] = useState(1);

  // Handle invalid course ID
  if (!course) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl bg-white p-8 text-center">
        <BookOpen size={45} className="text-[#FF7600]" />
        <h2 className="mt-4 text-xl font-bold">
          Course Not Found
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          The requested course could not be found.
        </p>
        <Link
          to="/my-courses"
          className="mt-5 rounded-xl bg-[#FF7600] px-6 py-3 text-sm font-semibold text-white"
        >
          Back to My Courses
        </Link>
      </div>
    );
  }

  const nextLesson = course.modules
    .flatMap((module) => module.lessons)
    .find((lesson) => !lesson.completed);

  const toggleModule = (id) => {
    setOpenModule((previous) => (previous === id ? null : id));
  };

  const handlePayment = () => {
    alert("Razorpay payment integration will be added next.");
  };

  return (
    <div className="space-y-6 text-[#572000]">

      {/* Back Navigation */}
      <Link
        to="/my-courses"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#FF7600]"
      >
        <ArrowLeft size={17} />
        Back to My Courses
      </Link>

      {/* Course Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#572000] to-[#A64B00] p-6 text-white md:p-9">
        <div className="relative z-10 max-w-3xl">

          <span className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium">
            {course.category}
          </span>

          <h1 className="mt-5 text-2xl font-bold leading-snug md:text-3xl">
            {course.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-orange-50">
            {course.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-5 text-sm">
            <span className="flex items-center gap-2">
              <GraduationCap size={18} />
              {course.instructor}
            </span>

            <span className="flex items-center gap-2">
              <Clock3 size={18} />
              {course.duration}
            </span>

            <span className="flex items-center gap-2">
              <BookOpen size={18} />
              {course.modules.length} Modules
            </span>
          </div>

          {nextLesson && (
            <Link
              to={`/learning/${course.id}/${nextLesson.id}`}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#FF7600] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E96A00]"
            >
              <PlayCircle size={19} />
              Continue Learning
              <ArrowRight size={17} />
            </Link>
          )}
        </div>

        <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border-[35px] border-white/5" />

        <div className="pointer-events-none absolute -bottom-24 right-32 h-56 w-56 rounded-full bg-[#FF7600]/15" />
      </section>

      {/* Course Statistics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            label: "Course Duration",
            value: course.duration,
            icon: Clock3,
          },
          {
            label: "Total Modules",
            value: course.modules.length,
            icon: BookOpen,
          },
          {
            label: "Total Lessons",
            value: course.totalLessons,
            icon: Video,
          },
          {
            label: "Course Level",
            value: course.level,
            icon: Award,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#FF7600]">
                <Icon size={22} />
              </div>

              <p className="text-xs text-gray-500">
                {item.label}
              </p>

              <h3 className="mt-1 text-xl font-bold">
                {item.value}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">

        {/* Left Content */}
        <div className="space-y-6 xl:col-span-2">

          {/* Course Overview */}
          <section className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">
              Course Overview
            </h2>

            <p className="mt-4 text-sm leading-8 text-gray-600">
              {course.description}
              {" "}
              This course provides organized learning resources,
              video lessons, study materials and practical knowledge
              to support your Ayurveda education.
            </p>

            <h3 className="mt-6 font-semibold">
              What You Will Learn
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Core Ayurveda concepts",
                "Clinical assessment methods",
                "Treatment principles",
                "Practical case discussions",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#79A91B]"
                  />
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* Course Curriculum */}
          <section
            id="curriculum"
            className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm md:p-6"
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">
                  Course Curriculum
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {course.modules.length} Modules • {course.totalLessons} Lessons
                </p>
              </div>

              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-[#FF7600]">
                Self-paced Learning
              </span>
            </div>

            <div className="space-y-3">
              {course.modules.map((module, index) => {
                const expanded = openModule === module.id;

                const completedCount = module.lessons.filter(
                  (lesson) => lesson.completed
                ).length;

                return (
                  <div
                    key={module.id}
                    className="overflow-hidden rounded-xl border border-orange-100"
                  >
                    <button
                      type="button"
                      onClick={() => toggleModule(module.id)}
                      className="flex w-full items-center justify-between gap-3 bg-[#FFF8EF] px-4 py-4 text-left transition hover:bg-orange-50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-bold text-[#FF7600]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div>
                          <h3 className="text-sm font-semibold md:text-base">
                            {module.title}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            {module.lessons.length} Lessons • {completedCount} Completed
                          </p>
                        </div>
                      </div>

                      {expanded ? (
                        <ChevronUp size={19} />
                      ) : (
                        <ChevronDown size={19} />
                      )}
                    </button>

                    {expanded && (
                      <div className="divide-y divide-gray-100">
                        {module.lessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            to={`/learning/${course.id}/${lesson.id}`}
                            className="flex items-center justify-between gap-3 px-4 py-4 transition hover:bg-orange-50"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF7600]">
                                {lesson.type === "pdf" ? (
                                  <FileText size={18} />
                                ) : (
                                  <PlayCircle size={18} />
                                )}
                              </span>

                              <div className="min-w-0">
                                <p className="text-sm font-medium">
                                  {lesson.title}
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                  {lesson.duration}
                                </p>
                              </div>
                            </div>

                            {lesson.completed ? (
                              <CheckCircle2
                                size={19}
                                className="shrink-0 text-[#79A91B]"
                              />
                            ) : (
                              <ArrowRight
                                size={17}
                                className="shrink-0 text-gray-400"
                              />
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="space-y-6">

          {/* Course Progress */}
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">
              Your Progress
            </h2>

            <div className="mt-6 flex items-center justify-center">
              <div
                className="flex h-36 w-36 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#FF7600 ${course.progress}% , #FFE9D2 0)`,
                }}
              >
                <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-3xl font-bold">
                    {course.progress}%
                  </span>

                  <span className="text-xs text-gray-500">
                    Completed
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-sm text-gray-500">
              {course.completedLessons} of {course.totalLessons} lessons completed
            </p>

            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-orange-100">
              <div
                className="h-full rounded-full bg-[#FF7600]"
                style={{ width: `${course.progress}%` }}
              />
            </div>

            {nextLesson && (
              <Link
                to={`/learning/${course.id}/${nextLesson.id}`}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#FF7600] px-4 py-3 text-sm font-semibold text-white hover:bg-[#E96A00]"
              >
                Continue Learning
                <ArrowRight size={17} />
              </Link>
            )}
          </div>

          {/* Instructor Details */}
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">
              Course Instructor
            </h2>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-[#FF7600]">
                <GraduationCap size={27} />
              </div>

              <div>
                <h3 className="font-semibold">
                  {course.instructor}
                </h3>

                <p className="text-xs text-gray-500">
                  Ayurveda Education
                </p>
              </div>
            </div>
          </div>

          {/* Course Fee and Payment */}
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-bold">
                Course Fee
              </h2>

              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-[#FF7600]">
                Paid Course
              </span>
            </div>

            <div className="mt-5">
              <p className="text-sm text-gray-500">
                Total Course Fee
              </p>

              <h3 className="mt-2 text-3xl font-bold text-[#FF7600]">
                {course.fee != null
                  ? `₹${Number(course.fee).toLocaleString("en-IN")}`
                  : "Fee not available"}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                One-time course enrollment fee
              </p>
            </div>

            <button
              type="button"
              disabled={course.fee == null}
              onClick={handlePayment}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#E96A00] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CreditCard size={19} />
              Pay Now
            </button>

            <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-gray-400">
              <LockKeyhole size={14} />
              Secure online payment
            </p>
          </div>

          {/* Certificate */}
          <div className="rounded-2xl border border-orange-100 bg-[#FFF8EF] p-6">
            <Award size={28} className="text-[#FF7600]" />

            <h3 className="mt-3 font-semibold">
              Course Certificate
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Certificate eligibility and issuance will depend on
              the course completion requirements.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-500">
              <LockKeyhole size={15} />
              Certificate not yet available
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}

export default CourseDetails;