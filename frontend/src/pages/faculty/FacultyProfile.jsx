
import { useRef, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  BriefcaseBusiness,
  BookOpen,
  Camera,
  Edit,
  Save,
  X,
  Lock,
  Eye,
  EyeOff,
  Award,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

const initialProfile = {
  name: "Dr. Arun Kumar",
  facultyId: "FAC001",
  email: "arun@avpresearch.org",
  phone: "+91 98765 43210",
  gender: "Male",
  qualification: "BAMS, MD (Ayurveda)",
  specialization: "Kayachikitsa",
  experience: "12",
  designation: "Senior Faculty",
  institution: "AVP Research Foundation",
  location: "Coimbatore, Tamil Nadu",
  bio: "Experienced Ayurveda professional with an interest in clinical practice, teaching and research. Focused on sharing practical Ayurvedic knowledge with students.",
};

function FacultyProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    setProfileImage(URL.createObjectURL(file));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    alert("Profile updated successfully! (Demo only)");

    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setProfile(initialProfile);
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert("Please fill all password fields.");
      return;
    }

    if (passwords.new.length < 8) {
      alert("New password must contain at least 8 characters.");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      alert("New password and confirm password do not match.");
      return;
    }

    alert("Password updated successfully! (Demo only)");

    setPasswords({
      current: "",
      new: "",
      confirm: "",
    });

    setShowPasswordForm(false);
  };

  const togglePassword = (field) => {
    setPasswordVisible((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  return (
    <div className="min-h-screen bg-[#FFF8EF] p-4 sm:p-6 lg:p-8">

      {/* PAGE HEADER */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#572000]">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-[#8B6B55]">
            Manage your personal information and professional details.
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white hover:bg-[#E66A00]"
          >
            <Edit size={17} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancelEdit}
              className="flex items-center gap-2 rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm font-semibold text-[#8B6B55]"
            >
              <X size={17} />
              Cancel
            </button>

            <button
              form="faculty-profile-form"
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white hover:bg-[#E66A00]"
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* PROFILE HEADER CARD */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-[#F0E1D1] bg-white shadow-sm">

        <div className="h-32 bg-gradient-to-r from-[#FFE4C9] via-[#FFF0DF] to-[#FFE7CF]" />

        <div className="px-5 pb-6 sm:px-7">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">

              {/* PROFILE PHOTO */}
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-[#FFE7CF] text-3xl font-bold text-[#FF7600] shadow-sm">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Faculty profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    profile.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()
                  )}
                </div>

                {isEditing && (
                  <>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#FF7600] text-white shadow-md hover:bg-[#E66A00]"
                    >
                      <Camera size={17} />
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>

              {/* NAME */}
              <div className="pb-1">
                <h2 className="text-xl font-bold text-[#572000]">
                  {profile.name}
                </h2>

                <p className="mt-1 text-sm text-[#8B6B55]">
                  {profile.designation}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#FFF0E1] px-3 py-1 text-xs font-semibold text-[#B95400]">
                    Faculty ID: {profile.facultyId}
                  </span>

                  <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    <CheckCircle2 size={13} />
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="pb-1">
              <p className="text-xs text-[#9A806C]">
                Institution
              </p>
              <p className="mt-1 text-sm font-semibold text-[#572000]">
                {profile.institution}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PROFILE FORM */}
      <form
        id="faculty-profile-form"
        onSubmit={handleSaveProfile}
        className="space-y-6"
      >

        {/* PERSONAL INFORMATION */}
        <ProfileSection
          title="Personal Information"
          description="Your basic personal and contact details."
          icon={<User size={20} />}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <FormField label="Full Name" icon={<User size={16} />}>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </FormField>

            <FormField label="Faculty ID" icon={<Award size={16} />}>
              <input
                value={profile.facultyId}
                disabled
                className="profile-input bg-[#FFF8EF]"
              />
            </FormField>

            <FormField label="Email Address" icon={<Mail size={16} />}>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </FormField>

            <FormField label="Phone Number" icon={<Phone size={16} />}>
              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </FormField>

            <FormField label="Gender" icon={<User size={16} />}>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </FormField>

            <FormField label="Location" icon={<MapPin size={16} />}>
              <input
                name="location"
                value={profile.location}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </FormField>

          </div>
        </ProfileSection>

        {/* PROFESSIONAL INFORMATION */}
        <ProfileSection
          title="Professional Information"
          description="Your educational qualifications and teaching experience."
          icon={<GraduationCap size={20} />}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <FormField
              label="Highest Qualification"
              icon={<GraduationCap size={16} />}
            >
              <input
                name="qualification"
                value={profile.qualification}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
                placeholder="e.g. BAMS, MD"
              />
            </FormField>

            <FormField
              label="Specialisation"
              icon={<BookOpen size={16} />}
            >
              <input
                name="specialization"
                value={profile.specialization}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
                placeholder="e.g. Kayachikitsa"
              />
            </FormField>

            <FormField
              label="Years of Experience"
              icon={<BriefcaseBusiness size={16} />}
            >
              <input
                type="number"
                min="0"
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </FormField>

            <FormField
              label="Designation"
              icon={<Award size={16} />}
            >
              <input
                name="designation"
                value={profile.designation}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </FormField>

            <FormField
              label="Institution"
              icon={<GraduationCap size={16} />}
            >
              <input
                name="institution"
                value={profile.institution}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </FormField>

          </div>

          <div className="mt-5">
            <FormField label="Professional Biography">
              <textarea
                rows={5}
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input resize-none"
                placeholder="Write about your professional experience..."
              />
            </FormField>
          </div>
        </ProfileSection>

      </form>

      {/* ACCOUNT SECURITY */}
      <div className="mt-6 rounded-2xl border border-[#F0E1D1] bg-white p-5 shadow-sm sm:p-6">

        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Lock size={20} className="text-[#FF7600]" />
              <h2 className="text-lg font-bold text-[#572000]">
                Account Security
              </h2>
            </div>

            <p className="mt-1 text-sm text-[#9A806C]">
              Manage your account password.
            </p>
          </div>

          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="rounded-xl border border-[#EAD9C8] px-4 py-2.5 text-sm font-semibold text-[#FF7600] hover:bg-[#FFF8EF]"
          >
            {showPasswordForm ? "Cancel" : "Change Password"}
          </button>
        </div>

        {showPasswordForm && (
          <form
            onSubmit={handlePasswordChange}
            className="space-y-4 border-t border-[#F0E1D1] pt-5"
          >

            <PasswordField
              label="Current Password"
              value={passwords.current}
              onChange={(value) =>
                setPasswords({ ...passwords, current: value })
              }
              visible={passwordVisible.current}
              onToggle={() => togglePassword("current")}
            />

            <PasswordField
              label="New Password"
              value={passwords.new}
              onChange={(value) =>
                setPasswords({ ...passwords, new: value })
              }
              visible={passwordVisible.new}
              onToggle={() => togglePassword("new")}
            />

            <PasswordField
              label="Confirm New Password"
              value={passwords.confirm}
              onChange={(value) =>
                setPasswords({ ...passwords, confirm: value })
              }
              visible={passwordVisible.confirm}
              onToggle={() => togglePassword("confirm")}
            />

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white hover:bg-[#E66A00]"
            >
              <Lock size={16} />
              Update Password
            </button>

          </form>
        )}
      </div>

      {/* ACCOUNT INFORMATION */}
      <div className="mt-6 rounded-2xl border border-[#F0E1D1] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <CalendarDays size={19} className="text-[#FF7600]" />
          <h3 className="font-semibold text-[#572000]">
            Account Information
          </h3>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-[#9A806C]">Account Role</p>
            <p className="mt-1 text-sm font-semibold text-[#572000]">
              Faculty
            </p>
          </div>

          <div>
            <p className="text-xs text-[#9A806C]">Account Status</p>
            <p className="mt-1 text-sm font-semibold text-green-700">
              Active
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

// PROFILE SECTION
function ProfileSection({ title, description, icon, children }) {
  return (
    <div className="rounded-2xl border border-[#F0E1D1] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-start gap-3 border-b border-[#F1E7DD] pb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E1] text-[#FF7600]">
          {icon}
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#572000]">
            {title}
          </h2>
          <p className="mt-1 text-sm text-[#9A806C]">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}

// FORM FIELD
function FormField({ label, icon, children }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#572000]">
        {icon && <span className="text-[#FF7600]">{icon}</span>}
        {label}
      </label>

      {children}
    </div>
  );
}

// PASSWORD FIELD
function PasswordField({ label, value, onChange, visible, onToggle }) {
  return (
    <FormField label={label}>
      <div className="relative">
        <input
          required
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="profile-input pr-12"
          placeholder={`Enter ${label.toLowerCase()}`}
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A806C]"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </FormField>
  );
}

export default FacultyProfile;
