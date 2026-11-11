
import { useState } from "react";
import {
  BookOpen,
  Clock,
  Award,
  Search,
  PlayCircle,
  GraduationCap,
  Filter,
  ArrowRight,
} from "lucide-react";

import MarmaImage from "../../assets/images/course-image.jpg";
import AyurvedaImage from "../../assets/images/course-image.jpg";
import ClinicalImage from "../../assets/images/course-image.jpg";
import { Link } from "react-router-dom";

function MyCourses() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Courses");

  const stats = [
    {
      title: "Total Courses",
      value: "03",
      icon: BookOpen,
      color: "text-[#FF7600]",
      bg: "bg-orange-100",
      border: "border-[#FF7600]",
    },
    {
      title: "In Progress",
      value: "02",
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-100",
      border: "border-blue-500",
    },
    {
      title: "Completed",
      value: "01",
      icon: Award,
      color: "text-green-600",
      bg: "bg-green-100",
      border: "border-green-500",
    },
  ];

  const courses = [
    {
      id: 1,
      title: "Advanced Clinical Ayurveda",
      category: "Clinical Ayurveda",
      instructor: "Dr. Ayurveda Faculty",
      image: ClinicalImage,
      progress: 65,
      completedLessons: 13,
      totalLessons: 20,
      status: "In Progress",
    },
    {
      id: 2,
      title: "Advanced Clinical Course - Marma Therapy",
      category: "Marma Therapy",
      instructor: "Dr. Clinical Faculty",
      image: MarmaImage,
      progress: 35,
      completedLessons: 7,
      totalLessons: 20,
      status: "In Progress",
    },
    {
      id: 3,
      title: "Basic Ayurveda Course",
      category: "Basic Ayurveda",
      instructor: "Dr. Ayurveda Faculty",
      image: AyurvedaImage,
      progress: 100,
      completedLessons: 15,
      totalLessons: 15,
      status: "Completed",
    },
  ];

  const filters = ["All Courses", "In Progress", "Completed"];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.category.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All Courses" ||
      course.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-7">

      {/* Page Heading */}
      <div className="flex flex-col justify-between  gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#572000] md:text-3xl">
            My Courses
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Explore your enrolled courses and continue learning.
          </p>
        </div>


      </div>



      {/* Search and Filters */}
      <div className="rounded-2xl bg-white p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}
          <div className="flex w-full items-center gap-3 rounded-xl border border-orange-100 px-4 py-3 lg:max-w-md">
            <Search size={20} className="shrink-0 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your courses..."
              className="w-full text-sm outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={18} className="text-gray-400" />

            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${activeFilter === filter
                    ? "bg-[#FF7600] text-white shadow-sm"
                    : "bg-orange-50 text-[#572000] hover:bg-orange-100"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Course List Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#572000]">
            Enrolled Courses
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {filteredCourses.length} courses found
          </p>
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(255,118,0,0.15)]"
          >

            {/* Course Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />

              <span
                className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${course.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-[#FF7600]"
                  }`}
              >
                {course.status}
              </span>
            </div>

            {/* Course Details */}
            <div className="space-y-4 p-5">

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#FF7600]">
                  {course.category}
                </p>

                <h3 className="min-h-12 text-lg font-bold leading-6 text-[#572000]">
                  {course.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Instructor: {course.instructor}
                </p>
              </div>

              {/* Progress */}
              <div>
                <div className="mb-2 flex justify-between text-xs">
                  <span className="font-medium text-gray-500">
                    Course Progress
                  </span>

                  <span className="font-bold text-[#572000]">
                    {course.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-orange-100">
                  <div
                    className="h-full rounded-full bg-[#FF7600] transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  {course.completedLessons} of {course.totalLessons} lessons completed
                </p>
              </div>

              {/* Button */}
              <Link
                to={`/course/${course.id}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white hover:bg-[#E96A00]"
              >
                View Course <ArrowRight size={17} />
              </Link>

            </div>
          </div>
        ))}

      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="rounded-2xl bg-white px-5 py-14 text-center shadow-sm">
          <BookOpen size={42} className="mx-auto text-orange-300" />

          <h3 className="mt-4 text-lg font-bold text-[#572000]">
            No Courses Found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Try another search or filter.
          </p>
        </div>
      )}

    </div>
  );
}

export default MyCourses;
