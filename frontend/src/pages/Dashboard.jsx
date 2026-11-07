
import {
  BookOpen,
  PlayCircle,
  Award,
  Certificate,
  ArrowRight,
  GraduationCap,
  CalendarDays,
  Link,
  Download,
  Headphones,
  CircleCheck,
} from "lucide-react";

import WelcomeImageHR from "../assets/images/welcome-image-hr.png";
import CourseImage from "../assets/images/course-image.jpg";

function Dashboard() {

  const stats = [
    {
      title: "Enrolled Courses",
      value: "03",
      icon: GraduationCap,
      color: "bg-orange-100 text-orange-600",
      borderColor: "border-orange-600",
    },
    {
      title: "In Progress",
      value: "02",
      icon: PlayCircle,
      color: "bg-yellow-100 text-yellow-600",
      borderColor: "border-yellow-600",
    },
    {
      title: "Completed",
      value: "01",
      icon: CircleCheck,
      color: "bg-green-100 text-green-600",
      borderColor: "border-green-600",
    },
    {
      title: "Certificates",
      value: "01",
      icon: Certificate,
      color: "bg-orange-100 text-orange-600",
      borderColor: "border-orange-600",
    },
  ];

  const courses = [
    {
      title: "Advanced Clinical Ayurveda",
      category: "Clinical Course",
      progress: 65,
      lessons: "13 / 20 Lessons",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600",
    },
    {
      title: "Marma Therapy",
      category: "Specialized Course",
      progress: 35,
      lessons: "7 / 20 Lessons",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Welcome Banner */}
      <section className="relative overflow-hidden  mb-5">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold  mb-2"> Welcome back, Student! 👋</h1>
        <p className="hidden text-sm text-[#000] sm:block mb-2">
          Continue your Ayurveda learning journey.
          Learn, practice and grow with AVPRF.
        </p>
        <img src={WelcomeImageHR} alt="Welcome" className="w-50 h-auto object-cover" />

      </section>
      {/* Statistics */}
      <section>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`rounded-2xl border-l-[8px] ${item.borderColor} bg-white p-5 shadow-[0_4px_15px_rgba(255,118,0,0.25)] transition hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(255,118,0,0.25)] `}
              >
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl p-4 ${item.color} `}>
                    <Icon size={25} />
                  </div>
                  <div>
                    <h3 className="mt-3 text-3xl font-bold text-[#572000]">
                      {item.value}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.title}
                    </p>
                  </div>


                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* Continue Learning */}
      <section className="grid grid-cols-2 gap-6">

        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[#572000]">
            <PlayCircle className="text-[#FF7600]" /> Continue Learning
          </h2>
          <div className="flex gap-2 mt-5">
            <div className="flex-shrink-0">
              <img src={CourseImage} alt="Course" className="h-auto w-50 rounded-lg object-cover" />
            </div>
            <div>
              <h3 className="font-semibold">Advanced Clinical Course in Marma Therapy</h3>
              <p className="text-[#000] text-sm mt-2 mb-2">Module 2: Marma Points and Indications</p>
              <div className="flex"><div className="progress-bar bg-gray-300 h-2 rounded-full overflow-hidden">
                <div className="progress bg-[#FF7600] h-full"></div></div><span>65%</span></div>
              <button className="flex items-center gap-2 mt-3 bg-[#591b04] text-white py-2 px-4 rounded-lg hover:bg-[#e06a00]">
                <PlayCircle />  Continue Learning
              </button>
            </div>
            </div>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#572000]">
              <CalendarDays className="text-[#FF7600]" /> Upcoming Sessions
            </h2>
            <button className="flex  items-center gap-2 text-sm font-medium text-[#FF7600] max-sm:hidden">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <ul className="space-y-3 text-sm text-[#572000]">
            <li className="flex items-center gap-2 border-b border-orange-100 pb-2">
              <CalendarDays className="text-[#591b04]" size={18} /> Session 1: Introduction to React
            </li>
            <li className="flex items-center gap-2 border-b border-orange-100 pb-2">
              <CalendarDays className="text-[#591b04]" size={18} /> Session 2: Advanced JavaScript Concepts
            </li>
            <li className="flex items-center gap-2 border-b border-orange-100 pb-2">
              <CalendarDays className="text-[#591b04]" size={18} /> Session 3: Node.js Fundamentals
            </li>
          </ul>
        </div>


      </section>


      {/* Quick Actions */}
      <section className="grid grid-cols-2 gap-6">

        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
          <h2 className="flex gap-2 items-center text-lg font-semibold text-[#572000]">
            <Link className="text-[#FF7600]" /> Quick Links
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 justify-between gap-3 mt-5">
            <button className="flex items-center  gap-2 rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm font-medium text-[#572000] hover:bg-orange-100">
              <BookOpen className="text-[#f87705]" size={40} />
              <span className="max-sm:hidden">My Courses</span>
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 p-4 text-sm font-medium text-[#572000] hover:bg-orange-100">
              <Download className="text-[#7ba107]" size={40} />
              <span className="max-sm:hidden">Downloads</span>
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-yellow-100 bg-yellow-50 p-4 text-sm font-medium text-[#572000] hover:bg-orange-100">
              <Certificate className="text-[#e57b08]" size={40} />
              <span className="max-sm:hidden">Certificates</span>
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 p-4 text-sm font-medium text-[#572000] hover:bg-orange-100">
              <Headphones className="text-[#6e9a05]" size={40} />
              <span className="max-sm:hidden">Support</span>
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#572000]">
              <CalendarDays className="text-[#FF7600]" /> My Progress
            </h2>
            <button className="flex  items-center gap-2 text-sm font-medium text-[#FF7600] max-sm:hidden">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="">

          </div>
        </div>


      </section>



    </div>
  );
}

export default Dashboard;
