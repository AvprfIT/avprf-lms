
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import DashboardImage from "../assets/images/dashboard-welcome-image.png";
import { X } from "lucide-react";

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="min-h-screen bg-[#FFF3E5]">

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Mobile Close Button */}
                <button
                    onClick={closeSidebar}
                    className="absolute right-3 top-3 z-10 rounded-lg bg-white p-2 text-[#572000] shadow md:hidden"
                    aria-label="Close menu"
                >
                    <X size={20} />
                </button>

                <AdminSidebar onNavigate={closeSidebar} />
            </aside>

            {/* Header */}
            <AdminHeader
                onMenuClick={() => setSidebarOpen(true)}
            />

            {/* Main Content */}
            <main className="min-h-screen pt-[76px] md:ml-72">
                {/* <div>
                    <img src={DashboardImage} alt="Dashboard" className=" absolute right-0 top-15 h-37 w-auto object-cover hidden lg:block" />
                </div> */}
                <div className="p-4 md:p-8">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}

export default AdminLayout;

