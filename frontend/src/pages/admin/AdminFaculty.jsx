
import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Users,
  UserCheck,
  UserX,
  GraduationCap,
  Pencil,
  Trash2,
  Eye,
  X,
  Mail,
  Phone,
  BookOpen,
  ShieldCheck,
  CheckCircle, AlertCircle
} from "lucide-react";

import API from "../../api/axios";


const emptyFaculty = {
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "faculty",
  status: "active",
};

function AdminFaculty() {

  const [faculty, setFaculty] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");;
    API.get("/users/faculty", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setFaculty(res.data.faculty))
      .catch(err => console.log(err));

  }, []);

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyFaculty);

  const [viewFaculty, setViewFaculty] = useState(null);

  const activeCount = faculty.filter(
    (item) => item.status === "active"
  ).length;

  const inactiveCount = faculty.filter(
    (item) => item.status === "inactive"
  ).length;

  const filteredFaculty = faculty.filter((item) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(searchText) ||
      item.email.toLowerCase().includes(searchText) ||
      item.specialization.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setModalMode("add");
    setEditingId(null);
    setForm({ ...emptyFaculty });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setModalMode("edit");
    setEditingId(item.id);
    setForm({ ...item });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    }
    const emailExists = faculty.some(
      (item) =>
        item.email.toLowerCase() === form.email.trim().toLowerCase() &&
        item.id !== editingId
    );

    if (emailExists) {
      newErrors.email = "This email address is already registered.";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!form.password) {
      newErrors.password = "Password  is required";
    }
    if (!form.role) {
      newErrors.role = "role  is required";
    }
    if (!form.status) {
      newErrors.status = "status  is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (modalMode === "add") {
      try {
        const token = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
        const response = await API.post(
          "/users/faculty",
          {
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password,
            role: form.role,
            status: form.status,
            created_at: Date(),
            updated_at: Date(),
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          })
        setFaculty((previous) => [response.data.faculty, ...previous]);
        setToast({
          type: "success",
          message: "Faculty created successfully!"
        });

      } catch (error) {
        console.log(error);
        setToast({ type: "error", message: error.response?.data?.message || "Failed to create faculty." });
      }
    } else {
      setFaculty((previous) =>
        previous.map((item) =>
          item.id === editingId ? { ...item, ...form } : item
        )
      );
    }

    closeModal();
  };

  const toggleStatus = (id) => {
    setFaculty((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
            ...item,
            status:
              item.status === "Active" ? "Inactive" : "Active",
          }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this faculty record?"
    );

    if (!confirmDelete) return;

    setFaculty((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  return (

    <div className="space-y-6">

      {toast && (
        <div
          className={`fixed right-5 top-5 z-[100] flex min-w-[300px] items-center gap-3 rounded-xl border p-4 shadow-lg ${toast.type === "success"
              ? "border-green-200 bg-green-50"
              : "border-red-200 bg-red-50"
            }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="text-green-600" size={24} />
          ) : (
            <AlertCircle className="text-red-600" size={24} />
          )}

          <p
            className={`flex-1 text-sm font-semibold ${toast.type === "success"
                ? "text-green-700"
                : "text-red-700"
              }`}
          >
            {toast.message}
          </p>

          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#572000]">
            Manage Faculty
          </h1>
          <p className="mt-1 text-sm text-[#8B6B55]">
            Create and manage faculty profiles and account status.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#e96900]"
        >
          <Plus size={18} />
          Add Faculty
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Users size={21} />}
          label="Total Faculty"
          value={faculty.length}
        />

        <StatCard
          icon={<UserCheck size={21} />}
          label="Active Faculty"
          value={activeCount}
        />

        <StatCard
          icon={<UserX size={21} />}
          label="Inactive Faculty"
          value={inactiveCount}
        />

        <StatCard
          icon={<BookOpen size={21} />}
          label="Course Assignments"
          value={faculty.reduce(
            (total, item) => total + Number(item.assignedCourses || 0),
            0
          )}
        />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#F0E2D3] bg-white p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A88B76]"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search faculty by name, email or specialization..."
            className="w-full rounded-xl border border-[#EAD9C8] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#FF7600]"
          />
        </div>

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

      {/* Faculty Table */}
      <div className="overflow-hidden rounded-2xl border border-[#F0E2D3] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#F0E2D3] p-5">
          <div>
            <h2 className="font-bold text-[#572000]">
              Faculty Members
            </h2>
            <p className="mt-1 text-xs text-[#9B806C]">
              {filteredFaculty.length} faculty members found
            </p>
          </div>
        </div>

        {filteredFaculty.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={38} className="mx-auto text-[#C5A88F]" />
            <p className="mt-3 font-semibold text-[#572000]">
              No faculty members found
            </p>
            <p className="mt-1 text-sm text-[#9B806C]">
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-[#FFF8EF]">
                <tr className="text-xs uppercase tracking-wide text-[#92745D]">
                  <th className="px-5 py-4 font-semibold">Faculty</th>
                  <th className="px-5 py-4 font-semibold">Contact</th>
                  <th className="px-5 py-4 font-semibold">Courses</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F2E8DE]">
                {filteredFaculty.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FFFCF8]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF3E5] font-bold text-[#FF7600]">
                          {item.name.charAt(0)}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-[#572000]">
                            {item.name}
                          </p>
                          <p className="mt-1 flex items-center gap-2 text-xs text-[#9B806C]">
                            <Phone size={13} />
                        {item.phone || "Not provided"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="flex items-center gap-2 text-sm text-[#572000]">
                        <Mail size={14} className="text-[#A88B76]" />
                        {item.email}
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-xs text-[#9B806C]">
                        <Phone size={13} />
                        {item.phone || "Not provided"}
                      </p>
                    </td>

                   

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-[#FFF3E5] px-3 py-1.5 text-xs font-semibold text-[#8B2E00]">
                        {item.assignedCourses || 0} Courses
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <ActionButton
                          title="View faculty"
                          onClick={() => setViewFaculty(item)}
                        >
                          <Eye size={16} />
                        </ActionButton>

                        <ActionButton
                          title="Edit faculty"
                          onClick={() => openEditModal(item)}
                        >
                          <Pencil size={16} />
                        </ActionButton>

                        <ActionButton
                          title={
                            item.status === "Active"
                              ? "Deactivate faculty"
                              : "Activate faculty"
                          }
                          onClick={() => toggleStatus(item.id)}
                        >
                          {item.status === "Active" ? (
                            <UserX size={16} />
                          ) : (
                            <UserCheck size={16} />
                          )}
                        </ActionButton>

                        <ActionButton
                          title="Delete faculty"
                          onClick={() => handleDelete(item.id)}
                          danger
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

      {/* Add / Edit Faculty Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5">
          <div className="flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F0E2D3] p-5">
              <div>
                <h2 className="text-xl font-bold text-[#572000]">
                  {modalMode === "add"
                    ? "Add Faculty Member"
                    : "Edit Faculty Details"}
                </h2>
                <p className="mt-1 text-xs text-[#9B806C]">
                  Enter the faculty member's professional details.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-[#8B6B55] hover:bg-[#FFF3E5]"
              >
                <X size={21} />
              </button>
            </div>

            <form
              onSubmit={handleSave}
              className="space-y-5 overflow-y-auto p-5"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="form-label">Faculty Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className={`form-input ${errors.name ? "border-red-500" : ""
                      }`}
                  />
                  {errors.name && (<span className="mt-1 text-xs text-red-500">{errors.name}</span>)}
                </div>

                <div>
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="faculty@example.com"
                    className={`form-input ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (<span className="mt-1 text-xs text-red-500">{errors.email}</span>)}
                </div>

                <div>
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className={`form-input ${errors.phone ? "border-red-500" : ""}`}
                  />
                  {errors.phone && (<span className="mt-1 text-xs text-red-500">{errors.phone}</span>)}
                </div>

                <div>
                  <label className="form-label">Password *</label>
                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="*****"
                    className={`form-input ${errors.password ? "border-red-500" : ""}`}
                  />
                  {errors.password && (<span className="mt-1 text-xs text-red-500">{errors.password}</span>)}
                </div>

                <div>
                  <label className="form-label">Role *</label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className={`form-input ${errors.role ? "border-red-500" : ""}`}
                  >
                    <option value="admin">Admin</option>
                    <option value="faculty">Faculty</option>
                  </select>
                  {errors.role && (<span className="mt-1 text-xs text-red-500">{errors.role}</span>)}
                </div>


                <div>
                  <label className="form-label">Account Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className={`form-input ${errors.status ? "border-red-500" : ""}`}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {errors.status && (<span className="mt-1 text-xs text-red-500">{errors.status}</span>)}
                </div>
              </div>

              <div className="rounded-xl border border-[#F0E2D3] bg-[#FFF8EF] p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={20}
                    className="mt-0.5 text-[#FF7600]"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#572000]">
                      Faculty Login Account
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#8B6B55]">
                      Saving this form creates a faculty profile only.
                      Login credentials, password setup and invitation
                      emails will be implemented through the backend.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse justify-end gap-3 border-t border-[#F0E2D3] pt-5 sm:flex-row">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-[#EAD9C8] px-6 py-3 text-sm font-semibold text-[#572000] hover:bg-[#FFF8EF]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#FF7600] px-7 py-3 text-sm font-semibold text-white hover:bg-[#e96900]"
                >
                  {modalMode === "add" ? "Add Faculty" : "Update Faculty"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Faculty Modal */}
      {viewFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F0E2D3] p-5">
              <h2 className="font-bold text-[#572000]">
                Faculty Profile
              </h2>

              <button
                onClick={() => setViewFaculty(null)}
                className="rounded-lg p-2 hover:bg-[#FFF3E5]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF3E5] text-2xl font-bold text-[#FF7600]">
                  {viewFaculty.name.charAt(0)}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#572000]">
                    {viewFaculty.name}
                  </h3>
                  <p className="text-sm text-[#8B6B55]">
                    {viewFaculty.specialization || "Faculty"}
                  </p>
                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${viewFaculty.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {viewFaculty.status}
                  </span>
                </div>
              </div>

              <DetailRow
                icon={<Mail size={17} />}
                label="Email"
                value={viewFaculty.email}
              />

              <DetailRow
                icon={<Phone size={17} />}
                label="Phone"
                value={viewFaculty.phone || "-"}
              />

              <DetailRow
                icon={<GraduationCap size={17} />}
                label="Qualification"
                value={viewFaculty.qualification || "-"}
              />

              <DetailRow
                icon={<BookOpen size={17} />}
                label="Specialization"
                value={viewFaculty.specialization || "-"}
              />

              <DetailRow
                icon={<Users size={17} />}
                label="Experience"
                value={viewFaculty.experience || "-"}
              />

              <DetailRow
                icon={<BookOpen size={17} />}
                label="Assigned Courses"
                value={viewFaculty.assignedCourses || 0}
              />
            </div>
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

function ActionButton({ children, onClick, title, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`rounded-lg p-2 transition ${danger
        ? "text-red-500 hover:bg-red-50"
        : "text-[#8B6B55] hover:bg-[#FFF3E5] hover:text-[#FF7600]"
        }`}
    >
      {children}
    </button>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#F2E8DE] pb-3">
      <div className="flex items-center gap-2 text-sm text-[#92745D]">
        {icon}
        {label}
      </div>

      <p className="text-right text-sm font-medium text-[#572000]">
        {value}
      </p>
    </div>
  );
}

export default AdminFaculty;
