
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  FileText,
  Users,
  ChartNoAxesColumnIncreasing,
  UserRound,
  GraduationCap,
  LogOut,
  ClipboardList
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import avprfFooterLogo from "../assets/images/sidebar-image.png";
import avprfLogo from "../assets/images/logo.png";
import { useUserAuth } from "../context/UserAuthContext";

function FacultySidebar({ onNavigate }) {
  const { logout } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate("/faculty-login", { replace: true }); };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/faculty/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Courses",
      path: "/faculty/courses",
      icon: BookOpen,
    },
    {
      name: "Course Content",
      path: "/faculty/course-content",
      icon: Layers,
    },
    {
      name: "Study Materials",
      path: "/faculty/materials",
      icon: FileText,
    },
    {
      name: "Examinations",
      path: "/faculty/examinations",
      icon: ClipboardList,
    },
    {
      name: "My Students",
      path: "/faculty/students",
      icon: Users,
    },
    {
      name: "Student Progress",
      path: "/faculty/student-progress",
      icon: ChartNoAxesColumnIncreasing,
    },
    {
      name: "My Profile",
      path: "/faculty/profile",
      icon: UserRound,
    },

  ];

  return (
    <aside className="flex h-full w-72 flex-col border-r border-orange-100 bg-[#FFF8EF]">

      {/* Logo */}
      <div className="flex h-18 shrink-0 items-center justify-center border-b border-orange-100">
        <img src={avprfLogo} alt="AVPRF Logo" className="h-auto w-15 sm:w-14 md:w-15 lg:w-15" />
        <div className="ml-2 text-left text-xl font-bold text-[#572000]">
          AVP Research
          <span className="block text-sm font-medium">
            Foundation
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">

        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-[#A87850]">
          Faculty Menu
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive
                  ? "bg-[#FF7600] text-white shadow-md"
                  : "text-[#572000] hover:bg-orange-100"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-xl px-4 py-3 font-medium text-red-600 transition-all hover:bg-red-50"
        >
          <LogOut size={21} />
          <span>Logout</span>
        </button>
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-orange-100 p-5 text-center text-xs text-[#8B6B55]">
        <img src={avprfFooterLogo} alt="AVPRF Logo" className="mx-auto h-auto w-36 sm:w-40 md:w-48 lg:w-56 mb-2" />
        © AVPRF Research Foundation
      </div>

    </aside>
  );
}

export default FacultySidebar;
