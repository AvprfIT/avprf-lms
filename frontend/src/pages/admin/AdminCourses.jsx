
import { useState } from "react";
import {
  Plus,
  Search,
  BookOpen,
  Pencil,
  Trash2,
  Eye,
  X,
  Upload,
  Image as ImageIcon,
  IndianRupee,
  Clock,
  Users,
  FileText,
  GraduationCap,
  ChevronDown,
  ChevronRight,
  CirclePlus,
  ClipboardList,
} from "lucide-react";

const initialCourses = [
  {
    id: 1,
    title: "Advanced Clinical Ayurveda",
    category: "Advanced Course",
    duration: "30 Days",
    feeType: "Paid",
    fee: "15000",
    status: "Published",
    students: 65,
    image: "",
    description: "Advanced clinical training in Ayurveda.",
    syllabus: [
      {
        id: 1,
        title: "Introduction to Clinical Ayurveda",
        topics: ["Clinical fundamentals", "Patient assessment"],
      },
      {
        id: 2,
        title: "Clinical Practice",
        topics: ["Diagnosis", "Treatment planning"],
      },
    ],
    assignedFaculty: [1, 2],
  },
  {
    id: 2,
    title: "Advanced Clinical Course - Marma Therapy",
    category: "Clinical Course",
    duration: "6 Days",
    feeType: "Paid",
    fee: "10000",
    status: "Published",
    students: 42,
    image: "",
    description: "Practical training in Marma Therapy.",
    syllabus: [
      {
        id: 1,
        title: "Introduction to Marma",
        topics: ["Marma fundamentals", "Marma points"],
      },
    ],
    assignedFaculty: [1, 3],
  },
  {
    id: 3,
    title: "Basic Ayurveda Course",
    category: "Basic Course",
    duration: "15 Days",
    feeType: "Free",
    fee: "0",
    status: "Draft",
    students: 0,
    image: "",
    description: "An introduction to the fundamentals of Ayurveda.",
    syllabus: [],
    assignedFaculty: [],
  },
];

const facultyList = [
  {
    id: 1,
    name: "Dr. Arun Kumar",
    specialization: "Ayurveda Physician",
  },
  {
    id: 2,
    name: "Dr. Priya",
    specialization: "Panchakarma",
  },
  {
    id: 3,
    name: "Dr. Rahul",
    specialization: "Clinical Ayurveda",
  },
  {
    id: 4,
    name: "Dr. Meena",
    specialization: "Marma Therapy",
  },
];

const categories = [
  "Basic Course",
  "Advanced Course",
  "Clinical Course",
  "Certificate Course",
  "Workshop",
  "Internship",
];

const emptyCourse = {
  title: "",
  category: "Basic Course",
  duration: "",
  feeType: "Free",
  fee: "",
  status: "Draft",
  description: "",
  image: "",
  syllabus: [],
  assignedFaculty: [],
};

function AdminCourses() {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [form, setForm] = useState(emptyCourse);

  const [editingId, setEditingId] = useState(null);
  const [viewCourse, setViewCourse] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [expandedModules, setExpandedModules] = useState({});

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || course.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const publishedCount = courses.filter(
    (course) => course.status === "Published"
  ).length;

  const draftCount = courses.filter(
    (course) => course.status === "Draft"
  ).length;

  const totalStudents = courses.reduce(
    (total, course) => total + Number(course.students || 0),
    0
  );

  const openAddModal = () => {
    setModalMode("add");
    setEditingId(null);
    setForm({
      ...emptyCourse,
      syllabus: [],
      assignedFaculty: [],
    });
    setImagePreview("");
    setShowModal(true);
  };

  const openEditModal = (course) => {
    setModalMode("edit");
    setEditingId(course.id);

    const courseForm = {
      ...emptyCourse,
      ...course,
      syllabus: course.syllabus || [],
      assignedFaculty: course.assignedFaculty || [],
    };

    setForm(courseForm);
    setImagePreview(course.image || "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setImagePreview("");
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;

      setImagePreview(imageData);

      setForm((previous) => ({
        ...previous,
        image: imageData,
      }));
    };

    reader.readAsDataURL(file);
  };

  const addSyllabusModule = () => {
    const newModule = {
      id: Date.now(),
      title: "",
      topics: [],
    };

    setForm((previous) => ({
      ...previous,
      syllabus: [...previous.syllabus, newModule],
    }));
  };

  const updateModuleTitle = (moduleId, title) => {
    setForm((previous) => ({
      ...previous,
      syllabus: previous.syllabus.map((module) =>
        module.id === moduleId ? { ...module, title } : module
      ),
    }));
  };

  const removeSyllabusModule = (moduleId) => {
    setForm((previous) => ({
      ...previous,
      syllabus: previous.syllabus.filter(
        (module) => module.id !== moduleId
      ),
    }));
  };

  const addSyllabusTopic = (moduleId) => {
    setForm((previous) => ({
      ...previous,
      syllabus: previous.syllabus.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              topics: [
                ...module.topics,
                `Topic ${module.topics.length + 1}`,
              ],
            }
          : module
      ),
    }));
  };

  const updateSyllabusTopic = (moduleId, topicIndex, value) => {
    setForm((previous) => ({
      ...previous,
      syllabus: previous.syllabus.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              topics: module.topics.map((topic, index) =>
                index === topicIndex ? value : topic
              ),
            }
          : module
      ),
    }));
  };

  const removeSyllabusTopic = (moduleId, topicIndex) => {
    setForm((previous) => ({
      ...previous,
      syllabus: previous.syllabus.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              topics: module.topics.filter(
                (_, index) => index !== topicIndex
              ),
            }
          : module
      ),
    }));
  };

  const toggleFaculty = (facultyId) => {
    setForm((previous) => {
      const alreadyAssigned = previous.assignedFaculty.includes(facultyId);

      return {
        ...previous,
        assignedFaculty: alreadyAssigned
          ? previous.assignedFaculty.filter((id) => id !== facultyId)
          : [...previous.assignedFaculty, facultyId],
      };
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter the course title.");
      return;
    }

    if (!form.duration.trim()) {
      alert("Please enter the course duration.");
      return;
    }

    if (form.feeType === "Paid" && Number(form.fee) <= 0) {
      alert("Please enter a valid course fee.");
      return;
    }

    const courseData = {
      ...form,
      fee: form.feeType === "Free" ? "0" : form.fee,
      syllabus: form.syllabus.map((module) => ({
        ...module,
        topics: module.topics.filter((topic) => topic.trim()),
      })),
    };

    if (modalMode === "add") {
      const newCourse = {
        ...courseData,
        id: Date.now(),
        students: 0,
      };

      setCourses((previous) => [newCourse, ...previous]);
    } else {
      setCourses((previous) =>
        previous.map((course) =>
          course.id === editingId
            ? { ...course, ...courseData }
            : course
        )
      );
    }

    closeModal();
  };

  const handleDelete = (courseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    setCourses((previous) =>
      previous.filter((course) => course.id !== courseId)
    );
  };

  const toggleStatus = (courseId) => {
    setCourses((previous) =>
      previous.map((course) =>
        course.id === courseId
          ? {
              ...course,
              status:
                course.status === "Published" ? "Draft" : "Published",
            }
          : course
      )
    );
  };

  const toggleModuleView = (moduleId) => {
    setExpandedModules((previous) => ({
      ...previous,
      [moduleId]: !previous[moduleId],
    }));
  };

  const getFacultyNames = (facultyIds = []) => {
    return facultyIds
      .map((id) => facultyList.find((faculty) => faculty.id === id)?.name)
      .filter(Boolean);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#572000]">
            Manage Courses
          </h1>
          <p className="mt-1 text-sm text-[#8B6B55]">
            Create courses, manage syllabus and assign faculty members.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e96900]"
        >
          <Plus size={18} />
          Add New Course
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<BookOpen size={21} />}
          label="Total Courses"
          value={courses.length}
        />

        <StatCard
          icon={<GraduationCap size={21} />}
          label="Published Courses"
          value={publishedCount}
        />

        <StatCard
          icon={<FileText size={21} />}
          label="Draft Courses"
          value={draftCount}
        />

        <StatCard
          icon={<Users size={21} />}
          label="Enrolled Students"
          value={totalStudents}
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
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#EAD9C8] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#FF7600]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
        >
          <option value="All">All Status</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      {/* Course Cards */}
      {filteredCourses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#EAD9C8] bg-white py-16 text-center">
          <BookOpen className="mx-auto text-[#C5A88F]" size={40} />
          <h3 className="mt-3 font-semibold text-[#572000]">
            No courses found
          </h3>
          <p className="mt-1 text-sm text-[#9B806C]">
            Try changing your search or add a new course.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="overflow-hidden rounded-2xl border border-[#F0E2D3] bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Course Image */}
              <div className="relative h-44 bg-[#FFF3E5]">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon size={48} className="text-[#D5B99F]" />
                  </div>
                )}

                <span
                  className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                    course.status === "Published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {course.status}
                </span>
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#FF7600]">
                    {course.category}
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-[#572000]">
                    {course.title}
                  </h3>

                  <p className="mt-1 text-sm text-[#967D69]">
                    {course.description || "No description added."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#FFF8EF] p-3">
                    <div className="flex items-center gap-2 text-xs text-[#92745D]">
                      <Clock size={15} />
                      Duration
                    </div>
                    <p className="mt-1 text-sm font-semibold text-[#572000]">
                      {course.duration}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#FFF8EF] p-3">
                    <div className="flex items-center gap-2 text-xs text-[#92745D]">
                      <IndianRupee size={15} />
                      Course Fee
                    </div>
                    <p className="mt-1 text-sm font-semibold text-[#572000]">
                      {course.feeType === "Free"
                        ? "Free"
                        : `₹${Number(course.fee).toLocaleString("en-IN")}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-[#8B6B55]">
                    <Users size={16} />
                    {course.students} Students
                  </span>

                  <span className="text-xs text-[#8B6B55]">
                    {course.syllabus?.length || 0} Modules
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 border-t border-[#F2E8DE] pt-4">
                  <button
                    onClick={() => setViewCourse(course)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#EAD9C8] px-3 py-2 text-xs font-semibold text-[#572000] hover:bg-[#FFF3E5]"
                  >
                    <Eye size={15} />
                    View
                  </button>

                  <button
                    onClick={() => openEditModal(course)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#FF7600]/30 px-3 py-2 text-xs font-semibold text-[#E96900] hover:bg-[#FFF3E5]"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    onClick={() => toggleStatus(course.id)}
                    className="rounded-lg border border-[#EAD9C8] px-3 py-2 text-xs font-semibold text-[#572000] hover:bg-[#FFF3E5]"
                    title="Change course status"
                  >
                    {course.status === "Published" ? "Unpublish" : "Publish"}
                  </button>

                  <button
                    onClick={() => handleDelete(course.id)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                    title="Delete course"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Course Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5">
          <div className="flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#F0E2D3] px-5 py-4 sm:px-7">
              <div>
                <h2 className="text-xl font-bold text-[#572000]">
                  {modalMode === "add" ? "Add New Course" : "Edit Course"}
                </h2>
                <p className="mt-1 text-xs text-[#9B806C]">
                  Manage course information, syllabus and faculty.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-[#8B6B55] hover:bg-[#FFF3E5]"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={handleSave}
              className="space-y-6 overflow-y-auto p-5 sm:p-7"
            >
              {/* Basic Information */}
              <section>
                <SectionHeading title="Course Information" />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="form-label">Course Title *</label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleInputChange}
                      placeholder="Enter course title"
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Course Category *</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Course Duration *</label>
                    <input
                      name="duration"
                      value={form.duration}
                      onChange={handleInputChange}
                      placeholder="Example: 30 Days"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="form-label">Course Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Enter course description..."
                      className="form-input resize-none"
                    />
                  </div>
                </div>
              </section>

              {/* Course Image */}
              <section>
                <SectionHeading title="Course Image" />

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#D9C3AF] bg-[#FFF8EF] sm:w-52">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Course preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-[#B49A83]">
                        <ImageIcon size={35} className="mx-auto" />
                        <p className="mt-2 text-xs">Image Preview</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#FF7600] px-4 py-2.5 text-sm font-semibold text-[#FF7600] hover:bg-[#FFF3E5]">
                      <Upload size={17} />
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>

                    <p className="mt-2 text-xs text-[#9B806C]">
                      JPG, PNG or WEBP. Maximum size 5 MB.
                    </p>
                  </div>
                </div>
              </section>

              {/* Course Fee */}
              <section>
                <SectionHeading title="Course Fee" />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="form-label">Course Type *</label>
                    <select
                      name="feeType"
                      value={form.feeType}
                      onChange={(e) => {
                        const value = e.target.value;

                        setForm((previous) => ({
                          ...previous,
                          feeType: value,
                          fee: value === "Free" ? "0" : "",
                        }));
                      }}
                      className="form-input"
                    >
                      <option value="Free">Free Course</option>
                      <option value="Paid">Paid Course</option>
                    </select>
                  </div>

                  {form.feeType === "Paid" && (
                    <div>
                      <label className="form-label">
                        Course Fee (₹) *
                      </label>
                      <input
                        type="number"
                        name="fee"
                        min="1"
                        value={form.fee}
                        onChange={handleInputChange}
                        placeholder="Enter course fee"
                        className="form-input"
                        required
                      />
                    </div>
                  )}
                </div>
              </section>

              {/* Syllabus */}
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <SectionHeading title="Course Syllabus" />

                  <button
                    type="button"
                    onClick={addSyllabusModule}
                    className="flex items-center gap-1.5 rounded-lg bg-[#FFF3E5] px-3 py-2 text-xs font-semibold text-[#E96900] hover:bg-[#FFE7CF]"
                  >
                    <Plus size={15} />
                    Add Module
                  </button>
                </div>

                {form.syllabus.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-[#EAD9C8] bg-[#FFF8EF] p-6 text-center">
                    <ClipboardList
                      size={28}
                      className="mx-auto text-[#B49A83]"
                    />
                    <p className="mt-2 text-sm text-[#92745D]">
                      No syllabus modules added yet.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {form.syllabus.map((module, moduleIndex) => (
                      <div
                        key={module.id}
                        className="rounded-xl border border-[#EAD9C8] p-4"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                          <div className="flex-1">
                            <label className="form-label">
                              Module {moduleIndex + 1}
                            </label>
                            <input
                              value={module.title}
                              onChange={(e) =>
                                updateModuleTitle(
                                  module.id,
                                  e.target.value
                                )
                              }
                              placeholder="Enter module title"
                              className="form-input"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeSyllabusModule(module.id)
                            }
                            className="self-end rounded-lg p-2 text-red-500 hover:bg-red-50 sm:self-center"
                            title="Remove module"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>

                        <div className="mt-4 space-y-2">
                          <p className="text-xs font-semibold text-[#8B6B55]">
                            Topics
                          </p>

                          {module.topics.map((topic, topicIndex) => (
                            <div
                              key={topicIndex}
                              className="flex items-center gap-2"
                            >
                              <input
                                value={topic}
                                onChange={(e) =>
                                  updateSyllabusTopic(
                                    module.id,
                                    topicIndex,
                                    e.target.value
                                  )
                                }
                                placeholder="Enter topic"
                                className="form-input"
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  removeSyllabusTopic(
                                    module.id,
                                    topicIndex
                                  )
                                }
                                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                              >
                                <X size={17} />
                              </button>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => addSyllabusTopic(module.id)}
                            className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#FF7600] hover:underline"
                          >
                            <CirclePlus size={15} />
                            Add Topic
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Faculty Assignment */}
              <section>
                <SectionHeading title="Assign Faculty" />

                <p className="mb-3 text-xs text-[#92745D]">
                  Select one or more faculty members for this course.
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {facultyList.map((faculty) => {
                    const checked = form.assignedFaculty.includes(
                      faculty.id
                    );

                    return (
                      <label
                        key={faculty.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                          checked
                            ? "border-[#FF7600] bg-[#FFF8EF]"
                            : "border-[#EAD9C8] hover:bg-[#FFF8EF]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleFaculty(faculty.id)}
                          className="h-4 w-4 accent-[#FF7600]"
                        />

                        <div>
                          <p className="text-sm font-semibold text-[#572000]">
                            {faculty.name}
                          </p>
                          <p className="text-xs text-[#92745D]">
                            {faculty.specialization}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </section>

              {/* Publish Status */}
              <section>
                <SectionHeading title="Course Status" />

                <select
                  name="status"
                  value={form.status}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </section>

              {/* Footer Buttons */}
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
                  {modalMode === "add" ? "Create Course" : "Update Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Course Modal */}
      {viewCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F0E2D3] p-5">
              <h2 className="text-xl font-bold text-[#572000]">
                Course Details
              </h2>

              <button
                onClick={() => setViewCourse(null)}
                className="rounded-lg p-2 text-[#8B6B55] hover:bg-[#FFF3E5]"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              {viewCourse.image && (
                <img
                  src={viewCourse.image}
                  alt={viewCourse.title}
                  className="h-48 w-full rounded-xl object-cover"
                />
              )}

              <div>
                <p className="text-xs font-semibold uppercase text-[#FF7600]">
                  {viewCourse.category}
                </p>
                <h3 className="mt-1 text-xl font-bold text-[#572000]">
                  {viewCourse.title}
                </h3>
                <p className="mt-2 text-sm text-[#8B6B55]">
                  {viewCourse.description || "No description available."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <DetailBox
                  label="Duration"
                  value={viewCourse.duration}
                />
                <DetailBox
                  label="Course Fee"
                  value={
                    viewCourse.feeType === "Free"
                      ? "Free"
                      : `₹${Number(viewCourse.fee).toLocaleString("en-IN")}`
                  }
                />
                <DetailBox
                  label="Students"
                  value={viewCourse.students}
                />
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-[#572000]">
                  Course Syllabus
                </h4>

                {viewCourse.syllabus?.length > 0 ? (
                  <div className="space-y-2">
                    {viewCourse.syllabus.map((module, index) => (
                      <div
                        key={module.id}
                        className="overflow-hidden rounded-xl border border-[#EAD9C8]"
                      >
                        <button
                          onClick={() => toggleModuleView(module.id)}
                          className="flex w-full items-center justify-between bg-[#FFF8EF] p-3 text-left"
                        >
                          <span className="text-sm font-semibold text-[#572000]">
                            Module {index + 1}: {module.title}
                          </span>

                          {expandedModules[module.id] ? (
                            <ChevronDown size={17} />
                          ) : (
                            <ChevronRight size={17} />
                          )}
                        </button>

                        {expandedModules[module.id] && (
                          <div className="space-y-2 p-3">
                            {module.topics?.length > 0 ? (
                              module.topics.map((topic, topicIndex) => (
                                <p
                                  key={topicIndex}
                                  className="text-sm text-[#8B6B55]"
                                >
                                  • {topic}
                                </p>
                              ))
                            ) : (
                              <p className="text-xs text-[#9B806C]">
                                No topics added.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#9B806C]">
                    No syllabus added.
                  </p>
                )}
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-[#572000]">
                  Assigned Faculty
                </h4>

                {getFacultyNames(viewCourse.assignedFaculty).length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {getFacultyNames(viewCourse.assignedFaculty).map(
                      (name) => (
                        <span
                          key={name}
                          className="rounded-full bg-[#FFF3E5] px-3 py-2 text-xs font-semibold text-[#8B2E00]"
                        >
                          {name}
                        </span>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-[#9B806C]">
                    No faculty assigned.
                  </p>
                )}
              </div>

              <div>
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    viewCourse.status === "Published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {viewCourse.status}
                </span>
              </div>
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

function SectionHeading({ title }) {
  return (
    <h3 className="mb-4 border-l-4 border-[#FF7600] pl-3 text-base font-bold text-[#572000]">
      {title}
    </h3>
  );
}

function DetailBox({ label, value }) {
  return (
    <div className="rounded-xl bg-[#FFF8EF] p-3">
      <p className="text-xs text-[#92745D]">{label}</p>
      <p className="mt-1 text-sm font-bold text-[#572000]">{value}</p>
    </div>
  );
}

export default AdminCourses;
