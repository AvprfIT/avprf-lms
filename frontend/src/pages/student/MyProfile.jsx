
import { useEffect, useRef, useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  GraduationCap,
  Camera,
  Save,
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

import API from "../../api/axios.js";

function MyProfile() {
  const [activeTab, setActiveTab] = useState("personal");

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState("");

  // Profile data
  const [profile, setProfile] = useState({
    id: "",
    fullName: "",
    email: "",
    mobile: "",
    dateOfBirth: "",
    gender: "",
    qualification: "",
    occupation: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    status: "",
    createdAt: "",
  });

  // Loading and message states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Password data
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Convert database date into HTML date input format
  const formatDateForInput = (value) => {
    if (!value) return "";

    if (typeof value === "string") {
      return value.slice(0, 10);
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Map backend student data to frontend profile fields
  const mapStudentToProfile = (student) => ({
    id: student.id || "",
    fullName: student.student_name || "",
    email: student.email || "",
    mobile: student.phone || "",
    dateOfBirth: formatDateForInput(student.date_of_birth),
    gender: student.gender || "",
    qualification: student.qualification || "",
    occupation: student.occupation || "",
    address: student.address || "",
    city: student.city || "",
    state: student.state || "",
    pincode: student.pincode || "",
    country: student.country || "",
    status: student.status || "",
    createdAt: student.created_at || "",
  });

  // Fetch student profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("studentToken");

        if (!token) {
          setError("Please login to view your profile.");
          return;
        }

        const response = await API.get("/students/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success && response.data.student) {
          setProfile(mapStudentToProfile(response.data.student));
        } else {
          setError("Unable to load student profile.");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load student profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Clean up temporary profile image URLs
  useEffect(() => {
    return () => {
      if (profileImage && profileImage.startsWith("blob:")) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  // Handle profile input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2 MB.");
      e.target.value = "";
      return;
    }

    setProfileImage(URL.createObjectURL(file));
  };

  // Save profile to database
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("studentToken");

      if (!token) {
        setError("Please login again to update your profile.");
        return;
      }

      // Convert frontend field names to backend field names
      const profileData = {
        student_name: profile.fullName.trim(),
        phone: profile.mobile.trim(),
        date_of_birth: profile.dateOfBirth || null,
        gender: profile.gender || null,
        qualification: profile.qualification.trim(),
        occupation: profile.occupation.trim(),
        address: profile.address.trim(),
        city: profile.city.trim(),
        state: profile.state.trim(),
        pincode: profile.pincode.trim(),
        country: profile.country.trim(),
      };

      const response = await API.put(
        "/students/profile",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success && response.data.student) {
        // Update React state with the latest database response
        setProfile(mapStudentToProfile(response.data.student));

        setSuccess(
          response.data.message || "Profile updated successfully!"
        );
      } else {
        setError("Unable to update profile. Please try again.");
      }
    } catch (err) {
      console.error("Profile update error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to update profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // Change password
 
const handlePasswordSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (passwordData.newPassword.length < 8) {
    setError("New password must contain at least 8 characters.");
    return;
  }

  if (
    passwordData.newPassword !== passwordData.confirmPassword
  ) {
    setError("New password and confirm password do not match.");
    return;
  }

  try {
    setSaving(true);

    const token = localStorage.getItem("studentToken");

    if (!token) {
      setError("Please login again.");
      return;
    }

    const response = await API.put(
      "/students/change-password",
      {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      setSuccess(
        response.data.message || "Password changed successfully!"
      );

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    }
  } catch (err) {
    console.error("Change Password Error:", err);

    setError(
      err.response?.data?.message ||
      "Unable to change password. Please try again."
    );
  } finally {
    setSaving(false);
  }
};


  const inputClass =
    "w-full rounded-xl border border-orange-100 bg-white px-4 py-3 text-sm text-[#572000] outline-none transition focus:border-[#FF7600] focus:ring-2 focus:ring-orange-100";

  const labelClass =
    "mb-2 block text-sm font-medium text-[#572000]";

  // Loading screen
  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-[#572000]">
          Loading student profile...
        </p>
      </div>
    );
  }

  // Error screen
  if (error && !profile.id) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-5 text-sm text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-[#572000]">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-[#98745B]">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* Profile Header */}
      <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">

        <div className="h-18 bg-gradient-to-r from-[#FF7600] to-[#FFB15C]" />

        <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between">

          <div className="-mt-14 flex flex-col items-center gap-4 sm:flex-row">

            {/* Profile Image */}
            <div className="relative">

              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-orange-100 text-[#FF7600] shadow-md">

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Student Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={48} />
                )}

              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 rounded-full bg-[#FF7600] p-2 text-white shadow-md hover:bg-[#e66a00]"
                title="Change Profile Photo"
              >
                <Camera size={16} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

            </div>

            {/* Student Details */}
            <div className="text-center sm:pb-1 sm:text-left">

              <h2 className="text-xl font-bold text-[#572000]">
                {profile.fullName}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {profile.email}
              </p>

              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold capitalize text-green-700">
                <ShieldCheck size={14} />
                {profile.status}
              </span>

            </div>

          </div>

          {/* Student ID */}
          <div className="text-center sm:pb-1 sm:text-right">

            <p className="text-xs text-gray-500">
              Student ID
            </p>

            <p className="mt-1 font-semibold text-[#572000]">
              AVPRF-STU-{String(profile.id).padStart(3, "0")}
            </p>

          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-orange-100">

        <button
          type="button"
          onClick={() => {
            setActiveTab("personal");
            setError("");
            setSuccess("");
          }}
          className={`flex items-center gap-2 rounded-t-xl px-5 py-3 text-sm font-semibold transition ${
            activeTab === "personal"
              ? "border-b-2 border-[#FF7600] bg-orange-50 text-[#FF7600]"
              : "text-gray-500 hover:bg-orange-50"
          }`}
        >
          <UserRound size={17} />
          Personal Information
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("password");
            setError("");
            setSuccess("");
          }}
          className={`flex items-center gap-2 rounded-t-xl px-5 py-3 text-sm font-semibold transition ${
            activeTab === "password"
              ? "border-b-2 border-[#FF7600] bg-orange-50 text-[#FF7600]"
              : "text-gray-500 hover:bg-orange-50"
          }`}
        >
          <LockKeyhole size={17} />
          Change Password
        </button>

      </div>

      {/* Personal Information */}
      {activeTab === "personal" && (

        <form
          onSubmit={handleProfileSubmit}
          className="space-y-6 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:p-7"
        >

          <div>
            <h2 className="text-lg font-bold text-[#572000]">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update your personal and contact details.
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Basic Details */}
          <div>

            <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#572000]">
              <UserRound size={18} className="text-[#FF7600]" />
              Basic Details
            </h3>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Full Name */}
              <div>
                <label className={labelClass}>
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleProfileChange}
                  className={inputClass}
                  required
                  maxLength={150}
                />
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    className={`${inputClass} pl-10`}
                    readOnly
                  />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className={labelClass}>
                  Mobile Number
                </label>

                <div className="relative">
                  <Phone
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="tel"
                    name="mobile"
                    value={profile.mobile}
                    onChange={handleProfileChange}
                    className={`${inputClass} pl-10`}
                    maxLength={20}
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className={labelClass}>
                  Date of Birth
                </label>

                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profile.dateOfBirth}
                    onChange={handleProfileChange}
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className={labelClass}>
                  Gender
                </label>

                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleProfileChange}
                  className={inputClass}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">
                    Prefer not to say
                  </option>
                </select>
              </div>

              {/* Qualification */}
              <div>
                <label className={labelClass}>
                  Qualification
                </label>

                <input
                  type="text"
                  name="qualification"
                  value={profile.qualification}
                  onChange={handleProfileChange}
                  className={inputClass}
                  placeholder="Enter your qualification"
                  maxLength={150}
                />
              </div>

              {/* Occupation */}
              <div>
                <label className={labelClass}>
                  Occupation
                </label>

                <input
                  type="text"
                  name="occupation"
                  value={profile.occupation}
                  onChange={handleProfileChange}
                  className={inputClass}
                  placeholder="Enter your occupation"
                  maxLength={150}
                />
              </div>

              {/* Address */}
              <div>
                <label className={labelClass}>
                  Address
                </label>

                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleProfileChange}
                  rows={1}
                  className={inputClass}
                  placeholder="Enter your address"
                />
              </div>

              {/* City */}
              <div>
                <label className={labelClass}>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleProfileChange}
                  className={inputClass}
                  maxLength={100}
                />
              </div>

              {/* State */}
              <div>
                <label className={labelClass}>
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={profile.state}
                  onChange={handleProfileChange}
                  className={inputClass}
                  maxLength={100}
                />
              </div>

              {/* Pincode */}
              <div>
                <label className={labelClass}>
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={profile.pincode}
                  onChange={handleProfileChange}
                  className={inputClass}
                  maxLength={15}
                />
              </div>

              {/* Country */}
              <div>
                <label className={labelClass}>
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={profile.country}
                  onChange={handleProfileChange}
                  className={inputClass}
                  maxLength={100}
                />
              </div>

            </div>
          </div>

          {/* Registration Date */}
          <div className="border-t border-orange-100 pt-5">
            <p className="text-sm text-gray-500">
              Registration Date:{" "}
              <span className="font-semibold text-[#572000]">
                {profile.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString("en-IN")
                  : "-"}
              </span>
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end border-t border-orange-100 pt-5">

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-[#FF7600] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e66a00] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>
      )}

      {/* Change Password */}
       
      {activeTab === "password" && (

        <form
          onSubmit={handlePasswordSubmit}
          className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:p-7"
        >

          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#572000]">
              Change Password
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Create a new password to keep your account secure.
            </p>
          </div>

          <div className="max-w-xl space-y-5">

            {/* Current Password */}
            <div>
              <label className={labelClass}>
                Current Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className={`${inputClass} pr-12`}
                  placeholder="Enter current password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword
                    ? <EyeOff size={18} />
                    : <Eye size={18} />}
                </button>

              </div>
            </div>

            {/* New Password */}
            <div>
              <label className={labelClass}>
                New Password
              </label>

              <div className="relative">

                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={`${inputClass} pr-12`}
                  placeholder="Enter new password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showNewPassword
                    ? <EyeOff size={18} />
                    : <Eye size={18} />}
                </button>

              </div>

              <p className="mt-2 text-xs text-gray-400">
                Password must contain at least 8 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className={labelClass}>
                Confirm New Password
              </label>

              <div className="relative">

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={`${inputClass} pr-12`}
                  placeholder="Confirm new password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword
                    ? <EyeOff size={18} />
                    : <Eye size={18} />}
                </button>

              </div>
            </div>

          </div>

          {/* Update Password Button */}
          <div className="mt-6 flex justify-end border-t border-orange-100 pt-5">

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#FF7600] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e66a00]"
            >
              <LockKeyhole size={17} />
              Update Password
            </button>

          </div>

        </form>
      )}

      {/* Account Information */}
      <div className="flex flex-col gap-3 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center">

        <div className="rounded-xl bg-orange-100 p-3 text-[#FF7600]">
          <GraduationCap size={24} />
        </div>

        <div>
          <h3 className="font-semibold text-[#572000]">
            AVPRF Student Account
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Your student account provides access to enrolled courses,
            learning materials and certificates.
          </p>
        </div>

      </div>

    </div>
  );
}

export default MyProfile;
