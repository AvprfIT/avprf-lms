
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";
import { useStudentAuth } from "../context/StudentAuthContext";

function Header({ onMenuClick }) {
  const { student } = useStudentAuth();

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-[67px] items-center justify-between border-b border-orange-100 bg-white px-4 shadow-sm md:left-72 md:px-8">

      {/* Left Section */}
      <div className="flex items-center gap-2">

        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-[#572000] hover:bg-orange-50 md:hidden"
        >
          <Menu size={25} />
        </button>

        <div>
          <h2 className="text-lg font-semibold text-[#572000]">
            AVPRF
          </h2>
          
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <button className="rounded-full p-2 text-gray-500 hover:bg-orange-50">
          <Search size={21} />
        </button>

        {/* Notification */}
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-orange-50">
          <Bell size={21} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF7600]"></span>
        </button>

        {/* Profile */}
        <div className="flex cursor-pointer items-center gap-2 rounded-xl p-2 hover:bg-orange-50">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-[#572000]">
            <UserRound size={22} />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-[#572000]">
              {student?.student_name || "Student"}
            </p>
            <p className="text-xs text-gray-500">
              {student?.email || "Ayurveda Student"}
            </p>
          </div>

          <ChevronDown size={16} className="hidden text-gray-500 sm:block" />
        </div>

      </div>
    </header>
  );
}

export default Header;
