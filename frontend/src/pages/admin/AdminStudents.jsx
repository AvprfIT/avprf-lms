
import { useMemo, useState } from "react";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  GraduationCap,
  BookOpen,
  Eye,
  Pencil,
  Trash2,
  X,
  Mail,
  Phone,
  CalendarDays,
  IndianRupee,
  Filter,
} from "lucide-react";

const initialStudents = [
  {
    id: 1,
    name: "Arun Raj",
    email: "arunraj@gmail.com",
    phone: "9876543210",
    gender: "Male",
    joinedDate: "2026-10-12",
    status: "Active",
    enrolledCourses: [
      { id: 1, title: "Advanced Clinical Ayurveda", progress: 65, fee: 15000 },
      { id: 2, title: "Marma Therapy", progress: 30, fee: 10000 },
    ],
    totalPaid: 25000,
  },
  {
    id: 2,
    name: "Priya S",
    email: "priya@gmail.com",
    phone: "9876543211",
    gender: "Female",
    joinedDate: "2026-10-15",
    status: "Active",
    enrolledCourses: [
      { id: 2, title: "Marma Therapy", progress: 80, fee: 10000 },
    ],
    totalPaid: 10000,
  },
  {
    id: 3,
    name: "Rahul Kumar",
    email: "rahul@gmail.com",
    phone: "9876543212",
    gender: "Male",
    joinedDate: "2026-10-20",
    status: "Inactive",
    enrolledCourses: [
      { id: 3, title: "Basic Ayurveda Course", progress: 20, fee: 0 },
    ],
    totalPaid: 0,
  },
  {
    id: 4,
    name: "Meena Devi",
    email: "meena@gmail.com",
    phone: "9876543213",
    gender: "Female",
    joinedDate: "2026-11-01",
    status: "Active",
    enrolledCourses: [
      { id: 1, title: "Advanced Clinical Ayurveda", progress: 45, fee: 15000 },
    ],
    totalPaid: 15000,
  },
  {
    id: 5,
    name: "Karthik M",
    email: "karthik@gmail.com",
    phone: "9876543214",
    gender: "Male",
    joinedDate: "2026-11-04",
    status: "Active",
    enrolledCourses: [],
    totalPaid: 0,
  },
];

const courseOptions = [
  "Advanced Clinical Ayurveda",
  "Marma Therapy",
  "Basic Ayurveda Course",
];

function AdminStudents() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");

  const [viewStudent, setViewStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
  });

  const activeCount = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactiveCount = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  const enrolledCount = students.filter(
    (student) => student.enrolledCourses.length > 0
  ).length;

  const totalStudents = students.length;

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        student.name.toLowerCase().includes(searchText) ||
        student.email.toLowerCase().includes(searchText) ||
        student.phone.includes(searchText);

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;

      const matchesCourse =
        courseFilter === "All" ||
        student.enrolledCourses.some(
          (course) => course.title === courseFilter
        );

      return matchesSearch && matchesStatus && matchesCourse;
    });
  }, [students, search, statusFilter, courseFilter]);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  const toggleStatus = (id) => {
    setStudents((previous) =>
      previous.map((student) =>
        student.id === id
          ? {
              ...student,
              status:
                student.status === "Active" ? "Inactive" : "Active",
            }
          : student
      )
    );

    setViewStudent((previous) =>
      previous?.id === id
        ? {
            ...previous,
            status:
              previous.status === "Active" ? "Inactive" : "Active",
          }
        : previous
    );
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student record?"
    );

    if (!confirmed) return;

    setStudents((previous) =>
      previous.filter((student) => student.id !== id)
    );

    setViewStudent(null);
  };

  const openEditModal = (student) => {
    setEditStudent(student);
    setForm({
      name: student.name,
      email: student.email,
      phone: student.phone,
      status: student.status,
    });
  };

  const closeEditModal = () => {
    setEditStudent(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUpdateStudent = (e) => {
    e.preventDefault();

    const emailExists = students.some(
      (student) =>
        student.email.toLowerCase() === form.email.trim().toLowerCase() &&
        student.id !== editStudent.id
    );

    if (emailExists) {
      alert("Another student already uses this email address.");
      return;
    }

    setStudents((previous) =>
      previous.map((student) =>
        student.id === editStudent.id
          ? { ...student, ...form }
          : student
      )
    );

    setViewStudent((previous) =>
      previous?.id === editStudent.id
        ? { ...previous, ...form }
        : previous
    );

    closeEditModal();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#572000]">
          Manage Students
        </h1>
        <p className="mt-1 text-sm text-[#8B6B55]">
          View student registrations, enrolled courses and account status.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Users size={21} />}
          label="Total Students"
          value={totalStudents}
        />

        <StatCard
          icon={<UserCheck size={21} />}
          label="Active Students"
          value={activeCount}
        />

        <StatCard
          icon={<UserX size={21} />}
          label="Inactive Students"
          value={inactiveCount}
        />

        <StatCard
          icon={<GraduationCap size={21} />}
          label="Enrolled Students"
          value={enrolledCount}
        />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-[#F0E2D3] bg-white p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#572000]">
          <Filter size={17} className="text-[#FF7600]" />
          Search and Filter Students
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A88B76]"
            />
            <input
              type="text"
              placeholder="Search name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#EAD9C8] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#FF7600]"
            />
          </div>

          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
          >
            <option value="All">All Courses</option>
            {courseOptions.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-hidden rounded-2xl border border-[#F0E2D3] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#F0E2D3] p-5">
          <div>
            <h2 className="font-bold text-[#572000]">
              Student Records
            </h2>
            <p className="mt-1 text-xs text-[#9B806C]">
              Showing {filteredStudents.length} of {students.length} students
            </p>
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={38} className="mx-auto text-[#C5A88F]" />
            <p className="mt-3 font-semibold text-[#572000]">
              No students found
            </p>
            <p className="mt-1 text-sm text-[#9B806C]">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-[#FFF8EF]">
                <tr className="text-xs uppercase tracking-wide text-[#92745D]">
                  <th className="px-5 py-4 font-semibold">Student</th>
                  <th className="px-5 py-4 font-semibold">Contact</th>
                  <th className="px-5 py-4 font-semibold">Enrolled Courses</th>
                  <th className="px-5 py-4 font-semibold">Registered</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F2E8DE]">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-[#FFFCF8]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={student.name} />
                        <div>
                          <p className="text-sm font-semibold text-[#572000]">
                            {student.name}
                          </p>
                          <p className="mt-1 text-xs text-[#9B806C]">
                            Student ID: STU{student.id.toString().padStart(4, "0")}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="flex items-center gap-2 text-sm text-[#572000]">
                        <Mail size={14} className="text-[#A88B76]" />
                        {student.email}
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-xs text-[#9B806C]">
                        <Phone size={13} />
                        {student.phone}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-[#FFF3E5] px-3 py-1.5 text-xs font-semibold text-[#8B2E00]">
                        {student.enrolledCourses.length} Courses
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-[#8B6B55]">
                      {formatDate(student.joinedDate)}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={student.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <ActionButton
                          title="View student"
                          onClick={() => setViewStudent(student)}
                        >
                          <Eye size={16} />
                        </ActionButton>

                        <ActionButton
                          title="Edit student"
                          onClick={() => openEditModal(student)}
                        >
                          <Pencil size={16} />
                        </ActionButton>

                        <ActionButton
                          title={
                            student.status === "Active"
                              ? "Deactivate student"
                              : "Activate student"
                          }
                          onClick={() => toggleStatus(student.id)}
                        >
                          {student.status === "Active" ? (
                            <UserX size={16} />
                          ) : (
                            <UserCheck size={16} />
                          )}
                        </ActionButton>

                        <ActionButton
                          title="Delete student"
                          danger
                          onClick={() => handleDelete(student.id)}
                        >
                          <Trash2 size={16} />
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student Profile Modal */}
      {viewStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F0E2D3] p-5">
              <h2 className="text-lg font-bold text-[#572000]">
                Student Profile
              </h2>

              <button
                onClick={() => setViewStudent(null)}
                className="rounded-lg p-2 text-[#8B6B55] hover:bg-[#FFF3E5]"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Avatar name={viewStudent.name} large />

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#572000]">
                    {viewStudent.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#8B6B55]">
                    Student ID: STU{viewStudent.id.toString().padStart(4, "0")}
                  </p>
                  <div className="mt-2">
                    <StatusBadge status={viewStudent.status} />
                  </div>
                </div>

                <button
                  onClick={() => openEditModal(viewStudent)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#FF7600]/30 px-4 py-2.5 text-sm font-semibold text-[#E96900] hover:bg-[#FFF3E5]"
                >
                  <Pencil size={15} />
                  Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <DetailBox
                  icon={<Mail size={16} />}
                  label="Email Address"
                  value={viewStudent.email}
                />

                <DetailBox
                  icon={<Phone size={16} />}
                  label="Phone Number"
                  value={viewStudent.phone}
                />

                <DetailBox
                  icon={<CalendarDays size={16} />}
                  label="Registration Date"
                  value={formatDate(viewStudent.joinedDate)}
                />

                <DetailBox
                  icon={<GraduationCap size={16} />}
                  label="Gender"
                  value={viewStudent.gender || "-"}
                />
              </div>

              {/* Enrolled Courses */}
              <section>
                <h4 className="mb-3 flex items-center gap-2 font-bold text-[#572000]">
                  <BookOpen size={18} className="text-[#FF7600]" />
                  Enrolled Courses
                </h4>

                {viewStudent.enrolledCourses.length === 0 ? (
                  <div className="rounded-xl bg-[#FFF8EF] p-5 text-center text-sm text-[#92745D]">
                    This student has not enrolled in any courses.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {viewStudent.enrolledCourses.map((course) => (
                      <div
                        key={course.id}
                        className="rounded-xl border border-[#EAD9C8] p-4"
                      >
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                          <div>
                            <p className="text-sm font-semibold text-[#572000]">
                              {course.title}
                            </p>
                            <p className="mt-1 text-xs text-[#92745D]">
                              Course Fee: {formatCurrency(course.fee)}
                            </p>
                          </div>

                          <span className="text-sm font-bold text-[#FF7600]">
                            {course.progress}% Complete
                          </span>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#F2E8DE]">
                          <div
                            className="h-full rounded-full bg-[#FF7600]"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(0, Number(course.progress) || 0)
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Payment Summary */}
              <div className="flex items-center justify-between rounded-xl bg-[#FFF8EF] p-4">
                <div>
                  <p className="text-sm text-[#92745D]">
                    Total Payment Recorded
                  </p>
                  <p className="mt-1 text-xl font-bold text-[#572000]">
                    {formatCurrency(viewStudent.totalPaid)}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#FF7600]">
                  <IndianRupee size={22} />
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-3 border-t border-[#F0E2D3] pt-4">
                <button
                  onClick={() => toggleStatus(viewStudent.id)}
                  className="rounded-xl border border-[#EAD9C8] px-4 py-2.5 text-sm font-semibold text-[#572000] hover:bg-[#FFF3E5]"
                >
                  {viewStudent.status === "Active"
                    ? "Deactivate Account"
                    : "Activate Account"}
                </button>

                <button
                  onClick={() => setViewStudent(null)}
                  className="rounded-xl bg-[#FF7600] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#e96900]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editStudent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-3">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F0E2D3] p-5">
              <h2 className="text-lg font-bold text-[#572000]">
                Edit Student
              </h2>

              <button
                onClick={closeEditModal}
                className="rounded-lg p-2 hover:bg-[#FFF3E5]"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleUpdateStudent} className="space-y-4 p-5">
              <div>
                <label className="form-label">Student Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">Phone Number</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleFormChange}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Account Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleFormChange}
                  className="form-input"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex flex-col-reverse justify-end gap-3 border-t border-[#F0E2D3] pt-5 sm:flex-row">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-xl border border-[#EAD9C8] px-5 py-3 text-sm font-semibold text-[#572000]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#FF7600] px-6 py-3 text-sm font-semibold text-white hover:bg-[#e96900]"
                >
                  Update Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* Reusable Components */

function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#F0E2D3] bg-white p-5 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF3E5] text-[#FF7600]">
        {icon}
      </div>

      <div>
        <p className="text-sm text-[#92745D]">{label}</p>
        <h3 className="mt-1 text-2xl font-bold text-[#572000]">
          {value}
        </h3>
      </div>
    </div>
  );
}

function Avatar({ name, large = false }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#FFF3E5] font-bold text-[#FF7600] ${
        large ? "h-16 w-16 text-2xl" : "h-10 w-10 text-sm"
      }`}
    >
      {name?.charAt(0)?.toUpperCase() || "S"}
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold ${
        status === "Active"
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

function ActionButton({ children, onClick, title, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`rounded-lg p-2 transition ${
        danger
          ? "text-red-500 hover:bg-red-50"
          : "text-[#8B6B55] hover:bg-[#FFF3E5] hover:text-[#FF7600]"
      }`}
    >
      {children}
    </button>
  );
}

function DetailBox({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-[#FFF8EF] p-3">
      <div className="flex items-center gap-2 text-xs text-[#92745D]">
        {icon}
        {label}
      </div>
      <p className="mt-2 break-words text-sm font-semibold text-[#572000]">
        {value}
      </p>
    </div>
  );
}

export default AdminStudents;
