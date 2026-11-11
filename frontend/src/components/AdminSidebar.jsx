
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  X,
  School,
} from "lucide-react";
import avprfFooterLogo  from "../assets/images/sidebar-image.png";
import avprfLogo  from "../assets/images/logo.png";

function AdminSidebar({ onNavigate }) {

const menuItems = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Courses",
    path: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Manage Faculty",
    path: "/admin/faculty",
    icon: GraduationCap,
  },
  
  {
    title: "Manage Students",
    path: "/admin/students",
    icon: Users,
  },
  {
    title: "Examinations",
    path: "/admin/examinations",
    icon: ClipboardList,
  },
  {
    title: "Reports",
    path: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: Settings,
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
            Admin Menu
          </p>
  
          {menuItems.map((item) => {
            const Icon = item.icon;
  
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin/dashboard"}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#FF7600] text-white shadow-md"
                      : "text-[#572000] hover:bg-orange-100"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
  
        {/* Footer */}
              <div className="shrink-0 border-t border-orange-100 p-5 text-center text-xs text-[#8B6B55]">
                <img src={avprfFooterLogo} alt="AVPRF Logo" className="mx-auto h-auto w-36 sm:w-40 md:w-48 lg:w-56 mb-2" />
                © AVPRF Research Foundation
              </div>
        
      </aside>
);
}
export default AdminSidebar;
