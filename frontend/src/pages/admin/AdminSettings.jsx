
import { useState } from "react";
import {
  Settings,
  Building2,
  BookOpen,
  Award,
  ClipboardList,
  Users,
  CreditCard,
  Bell,
  Save,
  Globe,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const settingsTabs = [
  { id: "general", label: "General Settings", icon: Building2 },
  { id: "courses", label: "Courses & Certificates", icon: BookOpen },
  { id: "examinations", label: "Examination Settings", icon: ClipboardList },
  { id: "students", label: "Student Registration", icon: Users },
  { id: "payments", label: "Payment Settings", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
];

function SectionHeading({ title, description }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-[#572000]">{title}</h3>
      <p className="mt-1 text-sm text-[#987B65]">{description}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#F1E6DA] py-4 last:border-0">
      <div>
        <p className="text-sm font-medium text-[#572000]">{label}</p>
        {description && (
          <p className="mt-1 text-xs text-[#987B65]">{description}</p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-[#FF7600]" : "bg-[#D9C9B9]"
        }`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const [general, setGeneral] = useState({
    organization: "AVP Research Foundation",
    website: "https://avpresearch.org",
    email: "info@avpresearch.org",
    phone: "+91 98406 16100",
    address: "Coimbatore, Tamil Nadu, India",
    timezone: "Asia/Kolkata",
  });

  const [courses, setCourses] = useState({
    allowFreeCourses: true,
    allowPaidCourses: true,
    certificateEnabled: true,
    certificateName: "Course Completion Certificate",
    minimumAttendance: 75,
    autoCertificate: false,
  });

  const [exams, setExams] = useState({
    allowRetakes: true,
    defaultAttempts: "3",
    showResultImmediately: true,
    showCorrectAnswers: false,
    shuffleQuestions: true,
    passingPercentage: 50,
  });

  const [students, setStudents] = useState({
    selfRegistration: true,
    emailVerification: true,
    adminApproval: false,
    welcomeEmail: true,
    allowProfileEdit: true,
  });

  const [payments, setPayments] = useState({
    gateway: "razorpay",
    currency: "INR",
    razorpayKeyId: "",
    paymentEnabled: false,
    testMode: true,
  });

  const [notifications, setNotifications] = useState({
    newRegistration: true,
    courseEnrolment: true,
    paymentSuccess: true,
    examSubmission: true,
    certificateIssued: true,
    emailNotifications: true,
  });

  const update = (setter, key, value) => {
    setter((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    // Demo only: settings are held in React state.
    // Connect this to your backend API to save settings permanently.
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass = "form-input";
  const selectClass = "form-input";

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Settings size={22} className="text-[#FF7600]" />
            <h1 className="text-2xl font-bold text-[#572000]">
              LMS Settings
            </h1>
          </div>
          <p className="mt-1 text-sm text-[#987B65]">
            Manage your LMS configuration and preferences.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#E96800]"
        >
          <Save size={17} />
          Save Settings
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle2 size={18} />
          Settings updated in this demo session.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
        {/* Settings Sidebar */}
        <div className="h-fit rounded-2xl border border-[#F0E3D5] bg-white p-3 shadow-sm">
          <p className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-[#A48A76]">
            Configuration
          </p>

          <div className="space-y-1">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                    active
                      ? "bg-[#FFF0E2] text-[#FF7600]"
                      : "text-[#795C47] hover:bg-[#FFF8EF]"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="rounded-2xl border border-[#F0E3D5] bg-white p-5 shadow-sm sm:p-7">

          {/* GENERAL SETTINGS */}
          {activeTab === "general" && (
            <>
              <SectionHeading
                title="General Settings"
                description="Configure your organization and LMS information."
              />

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Organization Name">
                  <input
                    className={inputClass}
                    value={general.organization}
                    onChange={(e) =>
                      update(setGeneral, "organization", e.target.value)
                    }
                  />
                </Field>

                <Field label="Website URL">
                  <input
                    className={inputClass}
                    value={general.website}
                    onChange={(e) =>
                      update(setGeneral, "website", e.target.value)
                    }
                  />
                </Field>

                <Field label="Contact Email">
                  <input
                    type="email"
                    className={inputClass}
                    value={general.email}
                    onChange={(e) =>
                      update(setGeneral, "email", e.target.value)
                    }
                  />
                </Field>

                <Field label="Contact Phone">
                  <input
                    className={inputClass}
                    value={general.phone}
                    onChange={(e) =>
                      update(setGeneral, "phone", e.target.value)
                    }
                  />
                </Field>

                <Field label="Organization Address">
                  <input
                    className={inputClass}
                    value={general.address}
                    onChange={(e) =>
                      update(setGeneral, "address", e.target.value)
                    }
                  />
                </Field>

                <Field label="Timezone">
                  <select
                    className={selectClass}
                    value={general.timezone}
                    onChange={(e) =>
                      update(setGeneral, "timezone", e.target.value)
                    }
                  >
                    <option value="Asia/Kolkata">India (IST)</option>
                    <option value="UTC">UTC</option>
                    <option value="Asia/Dubai">Dubai</option>
                  </select>
                </Field>
              </div>
            </>
          )}

          {/* COURSES & CERTIFICATES */}
          {activeTab === "courses" && (
            <>
              <SectionHeading
                title="Courses & Certificates"
                description="Manage course availability and certificate rules."
              />

              <Toggle
                label="Enable Free Courses"
                description="Allow students to enrol in free courses."
                checked={courses.allowFreeCourses}
                onChange={(v) => update(setCourses, "allowFreeCourses", v)}
              />

              <Toggle
                label="Enable Paid Courses"
                description="Allow students to purchase paid courses."
                checked={courses.allowPaidCourses}
                onChange={(v) => update(setCourses, "allowPaidCourses", v)}
              />

              <Toggle
                label="Enable Course Certificates"
                description="Allow eligible students to receive certificates."
                checked={courses.certificateEnabled}
                onChange={(v) => update(setCourses, "certificateEnabled", v)}
              />

              <Toggle
                label="Automatic Certificate Issuing"
                description="Automatically issue certificates after eligibility checks."
                checked={courses.autoCertificate}
                onChange={(v) => update(setCourses, "autoCertificate", v)}
              />

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Certificate Title">
                  <input
                    className={inputClass}
                    value={courses.certificateName}
                    onChange={(e) =>
                      update(setCourses, "certificateName", e.target.value)
                    }
                  />
                </Field>

                <Field label="Minimum Attendance (%)">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className={inputClass}
                    value={courses.minimumAttendance}
                    onChange={(e) =>
                      update(setCourses, "minimumAttendance", e.target.value)
                    }
                  />
                </Field>
              </div>
            </>
          )}

          {/* EXAMINATION SETTINGS */}
          {activeTab === "examinations" && (
            <>
              <SectionHeading
                title="Examination Settings"
                description="Configure examination attempts, results and question behaviour."
              />

              <Toggle
                label="Allow Multiple Attempts"
                description="Allow students to retake examinations."
                checked={exams.allowRetakes}
                onChange={(v) => update(setExams, "allowRetakes", v)}
              />

              <Toggle
                label="Show Results Immediately"
                description="Display results after students submit their exams."
                checked={exams.showResultImmediately}
                onChange={(v) =>
                  update(setExams, "showResultImmediately", v)
                }
              />

              <Toggle
                label="Show Correct Answers"
                description="Display correct answers after submission."
                checked={exams.showCorrectAnswers}
                onChange={(v) => update(setExams, "showCorrectAnswers", v)}
              />

              <Toggle
                label="Shuffle Questions"
                description="Randomize question order for each attempt."
                checked={exams.shuffleQuestions}
                onChange={(v) => update(setExams, "shuffleQuestions", v)}
              />

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Default Allowed Attempts">
                  <select
                    className={selectClass}
                    value={exams.defaultAttempts}
                    onChange={(e) =>
                      update(setExams, "defaultAttempts", e.target.value)
                    }
                  >
                    <option value="1">1 Attempt</option>
                    <option value="2">2 Attempts</option>
                    <option value="3">3 Attempts</option>
                    <option value="5">5 Attempts</option>
                    <option value="unlimited">Unlimited</option>
                  </select>
                </Field>

                <Field label="Default Passing Percentage">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className={inputClass}
                    value={exams.passingPercentage}
                    onChange={(e) =>
                      update(setExams, "passingPercentage", e.target.value)
                    }
                  />
                </Field>
              </div>

              <p className="mt-4 rounded-xl bg-[#FFF8EF] p-4 text-xs leading-5 text-[#8B6B55]">
                Faculty can override the default attempt limit and passing
                percentage for individual examinations.
              </p>
            </>
          )}

          {/* STUDENT REGISTRATION */}
          {activeTab === "students" && (
            <>
              <SectionHeading
                title="Student Registration"
                description="Manage student registration and account permissions."
              />

              <Toggle
                label="Allow Student Self Registration"
                description="Students can create their own LMS accounts."
                checked={students.selfRegistration}
                onChange={(v) => update(setStudents, "selfRegistration", v)}
              />

              <Toggle
                label="Email Verification"
                description="Require email verification during registration."
                checked={students.emailVerification}
                onChange={(v) => update(setStudents, "emailVerification", v)}
              />

              <Toggle
                label="Admin Approval Required"
                description="New student accounts require admin approval."
                checked={students.adminApproval}
                onChange={(v) => update(setStudents, "adminApproval", v)}
              />

              <Toggle
                label="Welcome Email"
                description="Send a welcome email after registration."
                checked={students.welcomeEmail}
                onChange={(v) => update(setStudents, "welcomeEmail", v)}
              />

              <Toggle
                label="Allow Profile Editing"
                description="Students can update their profile information."
                checked={students.allowProfileEdit}
                onChange={(v) => update(setStudents, "allowProfileEdit", v)}
              />
            </>
          )}

          {/* PAYMENT SETTINGS */}
          {activeTab === "payments" && (
            <>
              <SectionHeading
                title="Payment Settings"
                description="Configure payment gateway preferences for paid courses."
              />

              <div className="mb-6 rounded-xl border border-[#F3D9B8] bg-[#FFF8EF] p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 text-[#FF7600]" size={22} />
                  <div>
                    <p className="text-sm font-semibold text-[#572000]">
                      Secure Payment Configuration
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#8B6B55]">
                      Razorpay Secret Key must only be stored on your backend
                      server. Never place it in React code or browser storage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Payment Gateway">
                  <select
                    className={selectClass}
                    value={payments.gateway}
                    onChange={(e) =>
                      update(setPayments, "gateway", e.target.value)
                    }
                  >
                    <option value="razorpay">Razorpay</option>
                    <option value="none">No Payment Gateway</option>
                  </select>
                </Field>

                <Field label="Currency">
                  <select
                    className={selectClass}
                    value={payments.currency}
                    onChange={(e) =>
                      update(setPayments, "currency", e.target.value)
                    }
                  >
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="USD">USD - US Dollar</option>
                  </select>
                </Field>

                <Field label="Razorpay Key ID">
                  <input
                    className={inputClass}
                    placeholder="Enter Razorpay Key ID"
                    value={payments.razorpayKeyId}
                    onChange={(e) =>
                      update(setPayments, "razorpayKeyId", e.target.value)
                    }
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Toggle
                  label="Enable Online Payments"
                  description="Allow students to pay for paid courses online."
                  checked={payments.paymentEnabled}
                  onChange={(v) => update(setPayments, "paymentEnabled", v)}
                />

                <Toggle
                  label="Test Mode"
                  description="Use Razorpay test credentials during development."
                  checked={payments.testMode}
                  onChange={(v) => update(setPayments, "testMode", v)}
                />
              </div>

              <p className="mt-4 text-xs text-[#987B65]">
                Payment activation will require backend Razorpay integration
                and server-side payment verification.
              </p>
            </>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <>
              <SectionHeading
                title="Email & Notifications"
                description="Choose which LMS activities should trigger notifications."
              />

              <Toggle
                label="Email Notifications"
                description="Enable email notifications from the LMS."
                checked={notifications.emailNotifications}
                onChange={(v) =>
                  update(setNotifications, "emailNotifications", v)
                }
              />

              <Toggle
                label="New Student Registration"
                description="Notify Admin when a new student registers."
                checked={notifications.newRegistration}
                onChange={(v) =>
                  update(setNotifications, "newRegistration", v)
                }
              />

              <Toggle
                label="Course Enrolment"
                description="Notify when a student enrols in a course."
                checked={notifications.courseEnrolment}
                onChange={(v) =>
                  update(setNotifications, "courseEnrolment", v)
                }
              />

              <Toggle
                label="Payment Success"
                description="Notify after successful course payment."
                checked={notifications.paymentSuccess}
                onChange={(v) =>
                  update(setNotifications, "paymentSuccess", v)
                }
              />

              <Toggle
                label="Examination Submission"
                description="Notify faculty when a student submits an exam."
                checked={notifications.examSubmission}
                onChange={(v) =>
                  update(setNotifications, "examSubmission", v)
                }
              />

              <Toggle
                label="Certificate Issued"
                description="Notify students when certificates are issued."
                checked={notifications.certificateIssued}
                onChange={(v) =>
                  update(setNotifications, "certificateIssued", v)
                }
              />
            </>
          )}

          {/* Bottom Save Button */}
          <div className="mt-8 flex justify-end border-t border-[#F1E6DA] pt-6">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-[#FF7600] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E96800]"
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
