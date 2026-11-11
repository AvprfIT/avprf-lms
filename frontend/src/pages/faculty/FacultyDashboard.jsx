
import { useState } from "react";
import {
  BookOpen,
  Users,
  Video,
  ClipboardList,
  ArrowUpRight,
  Clock,
  CalendarDays,
  GraduationCap,
  PlayCircle,
  FileText,
  MoreVertical,
  CheckCircle,
  CircleUserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import WelcomeImageHR from "../../assets/images/welcome-image-hr.png";

const stats = [
  {
    title: "Assigned Courses",
    value: "04",
    description: "Courses assigned to you",
    icon: BookOpen,
    color: "bg-orange-100 text-[#FF7600]",
  },
  {
    title: "Total Students",
    value: "128",
    description: "Across all your courses",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Uploaded Lessons",
    value: "36",
    description: "Videos and learning lessons",
    icon: Video,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Pending Activities",
    value: "08",
    description: "Activities to review",
    icon: ClipboardList,
    color: "bg-yellow-100 text-yellow-600",
  },
];

const courses = [
  {
    id: 1,
    title: "Advanced Clinical Ayurveda",
    category: "Clinical Ayurveda",
    students: 45,
    lessons: 12,
    duration: "6 Months",
    progress: 75,
    status: "Active",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600",
  },
  {
    id: 2,
    title: "Advanced Clinical Course - Marma Therapy",
    category: "Marma Therapy",
    students: 32,
    lessons: 10,
    duration: "6 Days",
    progress: 60,
    status: "Active",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600",
  },
  {
    id: 3,
    title: "Basic Ayurveda Course",
    category: "Basic Ayurveda",
    students: 51,
    lessons: 14,
    duration: "3 Months",
    progress: 90,
    status: "Active",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600",
  },
];

const activities = [
  {
    name: "Arun Kumar",
    action: "completed a lesson",
    course: "Advanced Clinical Ayurveda",
    time: "10 minutes ago",
    icon: CheckCircle,
    color: "text-green-600 bg-green-100",
  },
  {
    name: "Priya Sharma",
    action: "enrolled in",
    course: "Marma Therapy",
    time: "1 hour ago",
    icon: GraduationCap,
    color: "text-blue-600 bg-blue-100",
  },
  {
    name: "Rahul Kumar",
    action: "submitted an assignment",
    course: "Basic Ayurveda Course",
    time: "3 hours ago",
    icon: FileText,
    color: "text-orange-600 bg-orange-100",
  },
  {
    name: "Meena Devi",
    action: "completed a module",
    course: "Advanced Clinical Ayurveda",
    time: "Yesterday",
    icon: CheckCircle,
    color: "text-green-600 bg-green-100",
  },
];

const upcomingSessions = [
  {
    title: "Introduction to Clinical Ayurveda",
    course: "Advanced Clinical Ayurveda",
    date: "Nov 12, 2026",
    time: "10:00 AM",
    type: "Online Class",
  },
  {
    title: "Marma Points - Practical Session",
    course: "Marma Therapy",
    date: "Nov 14, 2026",
    time: "11:30 AM",
    type: "Practical Session",
  },
  {
    title: "Fundamentals of Ayurveda",
    course: "Basic Ayurveda Course",
    date: "Nov 16, 2026",
    time: "02:00 PM",
    type: "Online Class",
  },
];

function FacultyDashboard() {
  const [period, setPeriod] = useState("This Week");

  return (
     <div className="space-y-8">

      {/* Welcome Banner */}
        <section className="relative overflow-hidden  mb-5">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold  mb-2"> Welcome back, Faculty! 👋</h1>
          <p className="hidden text-sm text-[#000] sm:block mb-2">
            Manage your courses, support your students and monitor their learning progress from your faculty dashboard.
          </p>
          <img src={WelcomeImageHR} alt="Welcome" className="w-50 h-auto object-cover" />
  
        </section>

    

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <h2 className="mt-2 text-3xl font-bold text-[#572000]">
                    {item.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-3 ${item.color}`}>
                  <Icon size={24} />
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-400">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Assigned Courses */}
      <section>
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-[#572000]">
              My Assigned Courses
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your assigned courses and learning content.
            </p>
          </div>

          <Link
            to="/faculty/courses"
            className="flex items-center gap-2 text-sm font-semibold text-[#FF7600] hover:underline"
          >
            View All Courses
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />

                <span className="absolute right-3 top-3 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {course.status}
                </span>
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#FF7600]">
                  {course.category}
                </p>

                <h3 className="mt-2 min-h-12 font-bold text-[#572000]">
                  {course.title}
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#FFF8EF] p-3">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Users size={16} />
                      <span className="text-xs">Students</span>
                    </div>
                    <p className="mt-1 font-bold text-[#572000]">
                      {course.students}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#FFF8EF] p-3">
                    <div className="flex items-center gap-2 text-gray-500">
                      <PlayCircle size={16} />
                      <span className="text-xs">Lessons</span>
                    </div>
                    <p className="mt-1 font-bold text-[#572000]">
                      {course.lessons}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Content Completion
                    </span>
                    <span className="text-sm font-bold text-[#572000]">
                      {course.progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-orange-100">
                    <div
                      className="h-full rounded-full bg-[#FF7600]"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <Link
                  to="/faculty/course-content"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-50 py-3 text-sm font-semibold text-[#FF7600] transition hover:bg-[#FF7600] hover:text-white"
                >
                  Manage Course
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity and Upcoming Sessions */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Recent Activities */}
        <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#572000]">
                Recent Student Activities
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Latest student learning updates
              </p>
            </div>

            <button className="rounded-lg p-2 text-gray-400 hover:bg-orange-50">
              <MoreVertical size={20} />
            </button>
          </div>

          <div className="space-y-5">
            {activities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <div key={index} className="flex gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${activity.color}`}>
                    <Icon size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-[#572000]">
                      <span className="font-semibold">
                        {activity.name}
                      </span>{" "}
                      {activity.action}
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {activity.course}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            to="/faculty/students"
            className="mt-6 block border-t border-orange-100 pt-4 text-center text-sm font-semibold text-[#FF7600] hover:underline"
          >
            View All Student Activities
          </Link>
        </div>

        {/* Upcoming Sessions */}
        <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-[#572000]">
                Upcoming Sessions
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Your scheduled classes and sessions
              </p>
            </div>

            <div className="rounded-xl bg-orange-100 p-2.5 text-[#FF7600]">
              <CalendarDays size={21} />
            </div>
          </div>

          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <div
                key={index}
                className="rounded-xl border border-orange-100 p-4 transition hover:bg-orange-50/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#572000]">
                      {session.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {session.course}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-orange-100 px-2 py-1 text-[10px] font-semibold text-[#FF7600]">
                    {session.type}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    {session.date}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {session.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold text-[#572000]">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Quickly access your faculty tools.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/faculty/course-content"
            className="flex items-center gap-3 rounded-xl bg-orange-50 p-4 text-[#572000] transition hover:bg-orange-100"
          >
            <LayersIcon />
            <span className="text-sm font-semibold">Manage Content</span>
          </Link>

          <Link
            to="/faculty/materials"
            className="flex items-center gap-3 rounded-xl bg-orange-50 p-4 text-[#572000] transition hover:bg-orange-100"
          >
            <FileText size={21} className="text-[#FF7600]" />
            <span className="text-sm font-semibold">Upload Materials</span>
          </Link>

          <Link
            to="/faculty/students"
            className="flex items-center gap-3 rounded-xl bg-orange-50 p-4 text-[#572000] transition hover:bg-orange-100"
          >
            <Users size={21} className="text-[#FF7600]" />
            <span className="text-sm font-semibold">View Students</span>
          </Link>

          <Link
            to="/faculty/student-progress"
            className="flex items-center gap-3 rounded-xl bg-orange-50 p-4 text-[#572000] transition hover:bg-orange-100"
          >
            <ArrowUpRight size={21} className="text-[#FF7600]" />
            <span className="text-sm font-semibold">Track Progress</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

function LayersIcon() {
  return <BookOpen size={21} className="text-[#FF7600]" />;
}

export default FacultyDashboard;
