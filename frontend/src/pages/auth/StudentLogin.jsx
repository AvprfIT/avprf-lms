
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Mail,
    LockKeyhole,
    Eye,
    EyeOff,
    ArrowRight,
} from "lucide-react";

import API from "../../api/axios.js";

import DashboardImage from "../../assets/images/auth-one-bg.jpg";
import AVPRFLogo from "../../assets/images/logo.png";
import { useStudentAuth } from "../../context/StudentAuthContext";

function StudentLogin() {

    const { login } = useStudentAuth();

    // Form states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // UI states
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Login function
    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        if (!email.trim() || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            // Call backend login API
            const response = await API.post("/students/login", {
                email: email.trim(),
                password: password,
            });

            // Get response data
            const { token, student } = response.data;

            // Save login information
             login(token, student);

            // Navigate to dashboard
            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to login. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#FFF3E5]">

            {/* Left Section */}
            <div
                className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-cover bg-center p-12 lg:flex"
                style={{
                    backgroundImage: `url(${DashboardImage})`,
                }}
            >

                <div className="absolute bottom-6 left-6 rounded-lg bg-white/80 px-4 py-2 text-xs text-[#572000]">
                    © 2026 AVPRF Research Foundation
                </div>
            </div>

            {/* Right Section */}
            <div className="flex min-h-screen w-full items-center justify-center bg-white px-5 py-10 lg:w-1/2 lg:px-12">

                <div className="w-full max-w-md">

                    {/* Heading */}
                    <div className="mb-8">

                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-[#FF7600]">
                            <img
                                src={AVPRFLogo}
                                alt="AVPRF Logo"
                                className="h-auto w-52"
                            />
                        </div>

                        <h2 className="mb-2 text-3xl font-bold text-[#572000]">
                            Student Login
                        </h2>

                        <p className="text-sm text-gray-500">
                            Welcome back! Please login to your account.
                        </p>

                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-5">

                        {/* Email */}
                        <div>

                            <label className="mb-2 block text-sm font-semibold text-[#572000]">
                                Email Address
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-orange-100 px-4 py-3 focus-within:border-[#FF7600]">

                                <Mail size={19} className="text-gray-400" />

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="w-full bg-transparent text-sm outline-none"
                                />

                            </div>
                        </div>

                        {/* Password */}
                        <div>

                            <div className="mb-2 flex items-center justify-between">

                                <label className="text-sm font-semibold text-[#572000]">
                                    Password
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="text-xs font-semibold text-[#FF7600] hover:underline"
                                >
                                    Forgot Password?
                                </Link>

                            </div>

                            <div className="flex items-center gap-3 rounded-xl border border-orange-100 px-4 py-3 focus-within:border-[#FF7600]">

                                <LockKeyhole size={19} className="text-gray-400" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full bg-transparent text-sm outline-none"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400"
                                >
                                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                                </button>

                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center gap-2">

                            <input
                                type="checkbox"
                                id="remember"
                                className="h-4 w-4 accent-[#FF7600]"
                            />

                            <label htmlFor="remember" className="text-sm text-gray-600">
                                Remember me
                            </label>

                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF7600] py-3.5 font-semibold text-white shadow-md transition hover:bg-[#E56800] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Logging in..." : "Login to Student Portal"}

                            {!loading && <ArrowRight size={19} />}
                        </button>

                    </form>

                    {/* Registration */}
                    <div className="mt-8 text-center text-sm text-gray-500">

                        Don't have an account?{" "}

                        <Link
                            to="/student-register"
                            className="font-semibold text-[#FF7600] hover:underline"
                        >
                            Register Now
                        </Link>

                    </div>

                    {/* Faculty Login */}
                    <div className="mt-6 border-t border-orange-100 pt-6 text-center">

                        <p className="text-sm text-gray-500">
                            Are you a Faculty member?
                        </p>

                        <Link
                            to="/faculty-login"
                            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#572000] hover:text-[#FF7600]"
                        >
                            Faculty Login <ArrowRight size={16} />
                        </Link>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default StudentLogin;
