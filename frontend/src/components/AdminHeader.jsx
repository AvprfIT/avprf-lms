
import { useState } from "react";
import { Menu, Bell, Search, ChevronDown, UserCircle } from "lucide-react";

export default function AdminHeader({ onMenuClick }) {
  const [showProfile, setShowProfile] = useState(false);

  return (
        <header className="fixed left-0 right-0 top-0 z-30 flex h-[76px] items-center justify-between border-b border-orange-100 bg-white px-4 shadow-sm md:left-72 md:px-8">


      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-[#572000] hover:bg-[#FFF3E5] lg:hidden"
        >
          <Menu size={23} />
        </button>

        <div className="hidden items-center gap-2 rounded-xl bg-[#FFF8EF] px-4 py-2.5 md:flex">
          <Search size={18} className="text-[#A68B76]" />
          <input
            type="text"
            placeholder="Search..."
            className="w-48 bg-transparent text-sm text-[#572000] outline-none placeholder:text-[#A68B76]"
          />
        </div>

        <h2 className="text-lg font-semibold text-[#572000] md:hidden">
          Admin Portal
        </h2>
      </div>

      <div className="flex items-center gap-3">

        <button className="relative rounded-xl p-2.5 text-[#795D48] hover:bg-[#FFF3E5]">
          <Bell size={21} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF7600]" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 rounded-xl p-2 hover:bg-[#FFF3E5]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFEEDB] text-[#FF7600]">
              <UserCircle size={23} />
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-[#572000]">
                Administrator
              </p>
              <p className="text-xs text-[#8B6B55]">
                Super Admin
              </p>
            </div>

            <ChevronDown size={16} className="text-[#8B6B55]" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-14 w-48 rounded-xl border border-[#F0E1D1] bg-white p-2 shadow-lg">
              <button
                onClick={() => {
                  window.location.href = "/faculty-login";
                }}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
