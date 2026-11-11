
import {
  Menu,
  Bell,
  ChevronDown,
  UserRound,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function FacultyHeader({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (confirmed) {
      navigate("/faculty-login");
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-[76px] items-center justify-between border-b border-orange-100 bg-white px-4 shadow-sm md:left-72 md:px-8">

      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-[#572000] hover:bg-orange-50 md:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <div>
          <h2 className="text-lg font-bold text-[#572000]">
            Faculty Portal
          </h2>
          <p className="hidden text-xs text-gray-500 sm:block">
            Welcome to your faculty workspace
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* Notification */}
        <button
          className="relative rounded-full p-2 text-[#572000] hover:bg-orange-50"
          title="Notifications"
        >
          <Bell size={21} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#FF7600]" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-[#FF7600]">
            <UserRound size={22} />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[#572000]">
              Faculty Name
            </p>
            <p className="text-xs text-gray-500">
              Faculty Member
            </p>
          </div>

         
        </div>
      </div>
    </header>
  );
}

export default FacultyHeader;
