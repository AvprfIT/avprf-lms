
import { useState } from "react";
import {
  BookOpen,
  Users,
  Video,
  Search,
  Clock,
  ArrowUpRight,
  GraduationCap,
  Filter,
  Layers,
} from "lucide-react";
import { Link } from "react-router-dom";

import ClinicalImage from "../../assets/images/course-image.jpg";
import MarmaImage from "../../assets/images/course-image.jpg";
import AyurvedaImage from "../../assets/images/course-image.jpg";

const courseData = [
  {
    id: 1,
    title: "Advanced Clinical Ayurveda",
    category: "Clinical Ayurveda",
    description:
      "Advanced learning in clinical Ayurveda, patient assessment and treatment approaches.",
    students: 45,
    lessons: 20,
    duration: "6 Months",
    status: "Active",
    image: ClinicalImage,
    completion: 75,
  },
  {
    id: 2,
    title: "Advanced Clinical Course - Marma Therapy",
    category: "Marma Therapy",
    description:
      "Learn traditional Marma points, therapeutic techniques and practical applications.",
    students: 32,
    lessons: 15,
    duration: "6 Days",
    status: "Active",
    image: MarmaImage,
    completion: 60,
  },
  {
    id: 3,
    title: "Basic Ayurveda Course",
    category: "Basic Ayurveda",
    description:
      "Understand the fundamental principles of Ayurveda and traditional healthcare.",
    students: 51,
    lessons: 18,
    duration: "3 Months",
    status: "Active",
    image: AyurvedaImage,
    completion: 90,
  },
  {
    id: 4,
    title: "Ayurveda Foundation Course",
    category: "Ayurveda",
    description:
      "An introduction to Ayurveda concepts, lifestyle and foundational knowledge.",
    students: 28,
    lessons: 12,
    duration: "2 Months",
    status: "Completed",
    image: AyurvedaImage,
    completion: 100,
  },
];

function FacultyCourses() {
  const [courses] = useState(courseData);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const activeCourses = courses.filter(
    (course) => course.status === "Active"
  );

  const completedCourses = courses.filter(
    (course) => course.status === "Completed"
  );

  const totalStudents = courses.reduce(
    (total, course) => total + course.students,
    0
  );

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || course.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">

      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#572000]">
            My Courses
          </h1>
          <p className="mt-1 text-sm text-[#98745B]">
            View and manage the courses assigned to you.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Courses"
          value={courses.length}
          icon={BookOpen}
          color="bg-orange-100 text-[#FF7600]"
        />

        <StatCard
          title="Active Courses"
          value={activeCourses.length}
          icon={Layers}
          color="bg-green-100 text-green-600"
        />

        <StatCard
          title="Completed Courses"
          value={completedCourses.length}
          icon={GraduationCap}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Total Students"
          value={totalStudents}
          icon={Users}
          color="bg-yellow-100 text-yellow-600"
        />

      </div>

      {/* Search and Filter */}
      <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

          <div>
            <h2 className="font-bold text-[#572000]">
              Assigned Courses
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              {filteredCourses.length} courses found
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses..."
                className="w-full rounded-xl border border-orange-100 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#FF7600] sm:w-64"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full appearance-none rounded-xl border border-orange-100 py-2.5 pl-10 pr-8 text-sm text-[#572000] outline-none focus:border-[#FF7600] sm:w-44"
              >
                <option value="All">All Courses</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

          </div>
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">

        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >

            {/* Course Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />

              <span
                className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                  course.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {course.status}
              </span>
            </div>

            {/* Course Information */}
            <div className="p-5">

              <span className="text-xs font-semibold uppercase tracking-wide text-[#FF7600]">
                {course.category}
              </span>

              <h3 className="mt-2 min-h-12 text-lg font-bold text-[#572000]">
                {course.title}
              </h3>

              <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500">
                {course.description}
              </p>

              {/* Course Details */}
              <div className="mt-5 grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-[#FFF8EF] p-3">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Users size={16} />
                    <span className="text-xs">Students</span>
                  </div>

                  <p className="mt-1 text-lg font-bold text-[#572000]">
                    {course.students}
                  </p>
                </div>

                <div className="rounded-xl bg-[#FFF8EF] p-3">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Video size={16} />
                    <span className="text-xs">Lessons</span>
                  </div>

                  <p className="mt-1 text-lg font-bold text-[#572000]">
                    {course.lessons}
                  </p>
                </div>

                <div className="rounded-xl bg-[#FFF8EF] p-3 col-span-2">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock size={16} />
                    <span className="text-xs">Course Duration</span>
                  </div>

                  <p className="mt-1 text-sm font-semibold text-[#572000]">
                    {course.duration}
                  </p>
                </div>

              </div>

              {/* Content Completion */}
              <div className="mt-5">
                <div className="mb-2 flex justify-between">
                  <span className="text-xs text-gray-500">
                    Content Completion
                  </span>

                  <span className="text-sm font-bold text-[#572000]">
                    {course.completion}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-orange-100">
                  <div
                    className="h-full rounded-full bg-[#FF7600]"
                    style={{ width: `${course.completion}%` }}
                  />
                </div>
              </div>

              {/* Manage Course */}
              <Link
                to={`/faculty/course-content?courseId=${course.id}`}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF7600] py-3 text-sm font-semibold text-white transition hover:bg-[#e66a00]"
              >
                Manage Course
                <ArrowUpRight size={17} />
              </Link>

            </div>
          </div>
        ))}

      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="rounded-2xl border border-orange-100 bg-white px-5 py-16 text-center">
          <BookOpen
            size={42}
            className="mx-auto text-orange-300"
          />

          <h3 className="mt-4 font-bold text-[#572000]">
            No Courses Found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or course status filter.
          </p>
        </div>
      )}

    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="mt-2 text-3xl font-bold text-[#572000]">
            {value}
          </h2>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

export default FacultyCourses;
