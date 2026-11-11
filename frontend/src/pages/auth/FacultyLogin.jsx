
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Eye,
    EyeOff,
    Mail,
    LockKeyhole,
    GraduationCap,
    BookOpen,
    Users,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";
import FacutyLoginBanner from "../../assets/images/FacutyLoginDoctor.jpg";


function FacultyLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            alert("Please enter your email and password.");
            return;
        }

        // Backend faculty authentication will be connected later.
        window.location.href = "/faculty/dashboard";
    

        // alert("Faculty login API integration will be added next.");
    };

    return (
        <div className="flex min-h-screen bg-[#fef9f5]">
            {/* Left Section */}
            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden  bg-cover bg-center p-12 lg:flex" style={{
                backgroundImage: `url(${FacutyLoginBanner})`,
            }}>



                <div className="absolute bottom-6 left-6 rounded-lg bg-white/80 px-4 py-2 text-xs text-[#572000]">
                    © 2026 AVPRF Research Foundation
                </div>
            </div>
            {/* Right Section - Login Form */}
            <div className="flex min-h-screen w-full items-center justify-center bg-white px-5 py-10 lg:w-1/2 lg:px-12">
                <div className="w-full max-w-md">

                    {/* Mobile Logo */}
                    <div className="mb-10 text-center lg:hidden">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF7600] text-white shadow-lg">
                            <GraduationCap size={35} />
                        </div>

                        <h1 className="mt-3 text-2xl font-bold text-[#572000]">
                            AVPRF
                        </h1>
                        <p className="text-sm text-[#98745B]">
                            Research Foundation
                        </p>
                    </div>

                    <div className="mb-8">
                        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-[#FF7600]">
                            <ShieldCheck size={15} />
                            Faculty Access
                        </span>

                        <h2 className="mt-5 text-3xl font-bold text-[#572000]">
                            Welcome Back!
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-[#98745B]">
                            Sign in to access your faculty dashboard and manage
                            your academic activities.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#572000]">
                                Email Address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B18B6B]"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your faculty email"
                                    autoComplete="username"
                                    required
                                    className="w-full rounded-xl border border-orange-100 bg-white py-3.5 pl-12 pr-4 text-sm text-[#572000] outline-none transition placeholder:text-gray-400 focus:border-[#FF7600] focus:ring-2 focus:ring-orange-100"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#572000]">
                                Password
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B18B6B]"
                                />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    className="w-full rounded-xl border border-orange-100 bg-white py-3.5 pl-12 pr-12 text-sm text-[#572000] outline-none transition placeholder:text-gray-400 focus:border-[#FF7600] focus:ring-2 focus:ring-orange-100"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF7600]"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between gap-3">
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="h-4 w-4 accent-[#FF7600]"
                                />
                                Remember me
                            </label>

                            <Link
                                to="/faculty-forgot-password"
                                className="text-sm font-semibold text-[#FF7600] hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF7600] py-3.5 text-sm font-bold text-white shadow-md shadow-orange-200 transition hover:bg-[#e66a00]"
                        >
                            Faculty Sign In
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    {/* Account Information */}
                    <div className="mt-7 rounded-xl border border-orange-100 bg-white p-4">
                        <div className="flex items-start gap-3">
                            <ShieldCheck
                                size={20}
                                className="mt-0.5 shrink-0 text-green-600"
                            />
                            <div>
                                <h3 className="text-sm font-semibold text-[#572000]">
                                    Authorised Faculty Access
                                </h3>
                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Faculty accounts are created or approved by the
                                    LMS administrator. Contact the administrator if
                                    you need login access.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Student Login Link */}
                    <div className="mt-7 text-center">
                        <p className="text-sm text-gray-500">
                            Are you a student?{" "}
                            <Link
                                to="/student-login"
                                className="font-semibold text-[#FF7600] hover:underline"
                            >
                                Student Login
                            </Link>
                        </p>
                    </div>

                    <p className="mt-8 text-center text-xs text-gray-400">
                        © {new Date().getFullYear()} AVPRF Research Foundation
                    </p>
                </div>
            </div>
        </div>
    );
}

export default FacultyLogin;
