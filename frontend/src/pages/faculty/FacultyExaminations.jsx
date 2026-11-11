
import { useState } from "react";
import {
  Plus,
  Search,
  ClipboardList,
  Clock,
  Users,
  BookOpen,
  Edit,
  Trash2,
  Eye,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialExams = [
  {
    id: 1,
    title: "Advanced Clinical Ayurveda - Final Exam",
    course: "Advanced Clinical Ayurveda",
    questions: 30,
    marks: 30,
    duration: 30,
    attempts: 3,
    passMarks: 15,
    status: "Published",
    students: 25,
  },
  {
    id: 2,
    title: "Marma Therapy - Assessment",
    course: "Advanced Clinical Course - Marma Therapy",
    questions: 20,
    marks: 20,
    duration: 25,
    attempts: 2,
    passMarks: 10,
    status: "Draft",
    students: 0,
  },
  {
    id: 3,
    title: "Basic Ayurveda - Module Test",
    course: "Basic Ayurveda Course",
    questions: 15,
    marks: 15,
    duration: 20,
    attempts: 1,
    passMarks: 8,
    status: "Published",
    students: 18,
  },
];

const emptyExam = {
  title: "",
  course: "",
  questions: 10,
  marks: 10,
  duration: 30,
  attempts: 1,
  passMarks: 5,
  status: "Draft",
};

export default function FacultyExaminations() {
  const [exams, setExams] = useState(initialExams);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyExam);
  const navigate = useNavigate();


  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(search.toLowerCase()) ||
      exam.course.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || exam.status === filter;

    return matchesSearch && matchesFilter;
  });

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyExam);
    setShowModal(true);
  };

  const openEditModal = (exam) => {
    setEditingId(exam.id);
    setForm({
      title: exam.title,
      course: exam.course,
      questions: exam.questions,
      marks: exam.marks,
      duration: exam.duration,
      attempts: exam.attempts,
      passMarks: exam.passMarks,
      status: exam.status,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.course ||
      Number(form.marks) <= 0 ||
      Number(form.duration) <= 0 ||
      Number(form.passMarks) > Number(form.marks)
    ) {
      alert("Please enter valid examination details.");
      return;
    }

    if (editingId) {
      setExams((prev) =>
        prev.map((exam) =>
          exam.id === editingId
            ? {
                ...exam,
                ...form,
                questions: Number(form.questions),
                marks: Number(form.marks),
                duration: Number(form.duration),
                attempts: Number(form.attempts),
                passMarks: Number(form.passMarks),
              }
            : exam
        )
      );
    } else {
      const newExam = {
        id: Date.now(),
        ...form,
        questions: Number(form.questions),
        marks: Number(form.marks),
        duration: Number(form.duration),
        attempts: Number(form.attempts),
        passMarks: Number(form.passMarks),
        students: 0,
      };

      setExams((prev) => [newExam, ...prev]);
    }

    setShowModal(false);
    setForm(emptyExam);
    setEditingId(null);
  };

  const deleteExam = (id) => {
    if (window.confirm("Are you sure you want to delete this examination?")) {
      setExams((prev) => prev.filter((exam) => exam.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setExams((prev) =>
      prev.map((exam) =>
        exam.id === id
          ? {
              ...exam,
              status:
                exam.status === "Published" ? "Draft" : "Published",
            }
          : exam
      )
    );
  };

  return (
    <div className="space-y-6">

      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#572000]">
            Examinations
          </h1>
          <p className="text-sm text-[#8B6B55] mt-1">
            Create and manage course-wise examinations.
          </p>
        </div>

        
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: "Total Examinations",
            value: exams.length,
            icon: ClipboardList,
          },
          {
            label: "Published",
            value: exams.filter((e) => e.status === "Published").length,
            icon: BookOpen,
          },
          {
            label: "Drafts",
            value: exams.filter((e) => e.status === "Draft").length,
            icon: Edit,
          },
          {
            label: "Students Attempted",
            value: exams.reduce((sum, e) => sum + e.students, 0),
            icon: Users,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-[#F0E1D1] bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#8B6B55]">{item.label}</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#572000]">
                    {item.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-[#FFF3E5] p-3 text-[#FF7600]">
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A68B76]"
          />
          <input
            type="text"
            placeholder="Search examination or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#EAD9C8] bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[#FF7600]"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm text-[#572000] outline-none"
        >
          <option value="All">All Examinations</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e86b00]"
        >
          <Plus size={18} />
          Create Examination
        </button>
      </div>

      {/* Examination Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="rounded-2xl border border-[#F0E1D1] bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF3E5] px-3 py-1 text-xs font-medium text-[#8B2E00]">
                  <BookOpen size={13} />
                  {exam.course}
                </span>

                <h3 className="mt-3 text-lg font-bold text-[#572000]">
                  {exam.title}
                </h3>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  exam.status === "Published"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {exam.status}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl bg-[#FFF8EF] p-3">
                <ClipboardList size={17} className="text-[#FF7600]" />
                <p className="mt-2 text-lg font-bold text-[#572000]">
                  {exam.questions}
                </p>
                <p className="text-xs text-[#8B6B55]">Questions</p>
              </div>

              <div className="rounded-xl bg-[#FFF8EF] p-3">
                <BookOpen size={17} className="text-[#FF7600]" />
                <p className="mt-2 text-lg font-bold text-[#572000]">
                  {exam.marks}
                </p>
                <p className="text-xs text-[#8B6B55]">Total Marks</p>
              </div>

              <div className="rounded-xl bg-[#FFF8EF] p-3">
                <Clock size={17} className="text-[#FF7600]" />
                <p className="mt-2 text-lg font-bold text-[#572000]">
                  {exam.duration}
                </p>
                <p className="text-xs text-[#8B6B55]">Minutes</p>
              </div>

              <div className="rounded-xl bg-[#FFF8EF] p-3">
                <Users size={17} className="text-[#FF7600]" />
                <p className="mt-2 text-lg font-bold text-[#572000]">
                  {exam.students}
                </p>
                <p className="text-xs text-[#8B6B55]">Students</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#F0E1D1] pt-4">
              <div className="text-xs text-[#8B6B55] space-y-1">
                <p>
                  Allowed Attempts:{" "}
                  <strong className="text-[#572000]">
                    {exam.attempts === 99 ? "Unlimited" : exam.attempts}
                  </strong>
                </p>
                <p>
                  Pass Marks:{" "}
                  <strong className="text-[#572000]">
                    {exam.passMarks}/{exam.marks}
                  </strong>
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => openEditModal(exam)}
                  title="Edit examination"
                  className="rounded-lg border border-[#EAD9C8] p-2 text-[#572000] hover:bg-[#FFF3E5]"
                >
                  <Edit size={17} />
                </button>

                <button
                  onClick={() => toggleStatus(exam.id)}
                  className="rounded-lg border border-[#EAD9C8] px-3 py-2 text-xs font-medium text-[#572000] hover:bg-[#FFF3E5]"
                >
                  {exam.status === "Published" ? "Unpublish" : "Publish"}
                </button>

               <button
                onClick={() =>
                    navigate(`/faculty/exam-questions?examId=${exam.id}`)
                }
                className="rounded-lg bg-[#FF7600] px-3 py-2 text-xs font-semibold text-white hover:bg-[#e86b00]"
                >
                Manage Questions
                </button>

                <button
                  onClick={() => deleteExam(exam.id)}
                  title="Delete examination"
                  className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredExams.length === 0 && (
        <div className="rounded-2xl border border-[#F0E1D1] bg-white p-10 text-center">
          <ClipboardList
            size={35}
            className="mx-auto text-[#D2B69D]"
          />
          <h3 className="mt-3 font-semibold text-[#572000]">
            No examinations found
          </h3>
          <p className="mt-1 text-sm text-[#8B6B55]">
            Create a new examination for your course.
          </p>
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">

            <div className="flex items-center justify-between border-b border-[#F0E1D1] p-5">
              <div>
                <h2 className="text-xl font-bold text-[#572000]">
                  {editingId ? "Edit Examination" : "Create Examination"}
                </h2>
                <p className="mt-1 text-sm text-[#8B6B55]">
                  Enter the examination details.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-[#8B6B55] hover:bg-[#FFF3E5]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 p-5">

              <div>
                <label className="mb-2 block text-sm font-medium text-[#572000]">
                  Examination Title *
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter examination title"
                  className="w-full rounded-xl border border-[#EAD9C8] px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#572000]">
                  Select Course *
                </label>
                <select
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
                >
                  <option value="">Select Course</option>
                  <option value="Advanced Clinical Ayurveda">
                    Advanced Clinical Ayurveda
                  </option>
                  <option value="Advanced Clinical Course - Marma Therapy">
                    Advanced Clinical Course - Marma Therapy
                  </option>
                  <option value="Basic Ayurveda Course">
                    Basic Ayurveda Course
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#572000]">
                    Total Questions
                  </label>
                  <input
                    type="number"
                    name="questions"
                    min="1"
                    value={form.questions}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#EAD9C8] px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#572000]">
                    Total Marks
                  </label>
                  <input
                    type="number"
                    name="marks"
                    min="1"
                    value={form.marks}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#EAD9C8] px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#572000]">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    min="1"
                    value={form.duration}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#EAD9C8] px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#572000]">
                    Pass Marks
                  </label>
                  <input
                    type="number"
                    name="passMarks"
                    min="0"
                    value={form.passMarks}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#EAD9C8] px-4 py-3 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#572000]">
                  Allowed Attempts
                </label>
                <select
                  name="attempts"
                  value={form.attempts}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm"
                >
                  <option value="1">1 Attempt</option>
                  <option value="2">2 Attempts</option>
                  <option value="3">3 Attempts</option>
                  <option value="5">5 Attempts</option>
                  <option value="99">Unlimited Attempts</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#572000]">
                  Examination Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm"
                >
                  <option value="Draft">Save as Draft</option>
                  <option value="Published">Publish</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 border-t border-[#F0E1D1] pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-[#EAD9C8] px-5 py-3 text-sm font-medium text-[#572000]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#FF7600] px-6 py-3 text-sm font-semibold text-white hover:bg-[#e86b00]"
                >
                  {editingId ? "Update Examination" : "Create Examination"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
