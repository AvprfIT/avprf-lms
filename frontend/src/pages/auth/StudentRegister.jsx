
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

import API from "../../api/axios.js";

import StudentImage from "../../assets/images/auth-one-bg.jpg";
import AVPRFLogo from "../../assets/images/logo.png";

function StudentRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Terms validation
    if (!formData.terms) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    try {
      setLoading(true);

      // Call Student Registration API
      const response = await API.post("/students/register", {
        student_name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.mobile.trim(),
        password: formData.password,
      });

      setSuccess(response.data.message);

      // Clear registration form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        terms: false,
      });

      // Redirect to login after successful registration
      setTimeout(() => {
        navigate("/student-login");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-transparent text-sm text-[#572000] outline-none placeholder:text-gray-400";

  const fieldClass =
    "flex items-center gap-3 rounded-xl border border-orange-100 px-4 py-3 transition focus-within:border-[#FF7600] focus-within:ring-2 focus-within:ring-orange-100";

  return (
    <div className="flex min-h-screen bg-white">

      {/* Left Side - Student Image */}
      <div className="relative hidden w-1/2 lg:block">
        <img
          src={StudentImage}
          alt="Ayurveda Students Learning"
          className="h-screen w-full object-cover"
        />

        <div className="absolute bottom-6 left-6 rounded-lg bg-white/80 px-4 py-2 text-xs text-[#572000]">
          © 2026 AVPRF Research Foundation
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex min-h-screen w-full items-center justify-center bg-white px-5 py-8 sm:px-10 lg:w-1/2">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="mb-6 text-center lg:hidden">
            <img
              src={AVPRFLogo}
              alt="AVPRF Logo"
              className="mx-auto h-auto w-36"
            />
          </div>

          {/* Heading */}
          <div className="mb-6">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-[#FF7600]">
              <GraduationCap size={26} />
            </div>

            <h2 className="mb-2 text-2xl font-bold text-[#572000] sm:text-3xl">
              Student Registration
            </h2>

            <p className="text-sm text-gray-500">
              Create your AVPRF student account and start learning.
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#572000]">
                Full Name
              </label>

              <div className={fieldClass}>
                <UserRound size={19} className="shrink-0 text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={inputClass}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#572000]">
                Email Address
              </label>

              <div className={fieldClass}>
                <Mail size={19} className="shrink-0 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={inputClass}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#572000]">
                Mobile Number
              </label>

              <div className={fieldClass}>
                <Phone size={19} className="shrink-0 text-gray-400" />

                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className={inputClass}
                  autoComplete="tel"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#572000]">
                Password
              </label>

              <div className={fieldClass}>
                <LockKeyhole size={19} className="shrink-0 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={inputClass}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="shrink-0 text-gray-400"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#572000]">
                Confirm Password
              </label>

              <div className={fieldClass}>
                <LockKeyhole size={19} className="shrink-0 text-gray-400" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={inputClass}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="shrink-0 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mt-1 h-4 w-4 accent-[#FF7600]"
                required
              />

              <label htmlFor="terms" className="text-xs leading-5 text-gray-500">
                I agree to the{" "}
                <Link to="/terms" className="font-semibold text-[#FF7600]">
                  Terms & Conditions
                </Link>{" "}
                and Privacy Policy.
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF7600] py-3.5 font-semibold text-white shadow-md transition hover:bg-[#E56800] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Student Account"}

              {!loading && <ArrowRight size={19} />}
            </button>

          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/student-login"
              className="font-semibold text-[#FF7600] hover:underline"
            >
              Login Now
            </Link>
          </div>

          {/* Faculty Login */}
          <div className="mt-5 border-t border-orange-100 pt-5 text-center">
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

export default StudentRegister;
