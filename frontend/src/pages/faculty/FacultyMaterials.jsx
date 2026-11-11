
import { useState } from "react";
import {
  Search,
  Plus,
  FolderOpen,
  FileText,
  Video,
  BookOpen,
  Edit,
  Trash2,
  X,
  Save,
  Download,
  Eye,
  EyeOff,
  Filter,
  Upload,
  Link as LinkIcon,
  GraduationCap,
  Layers,
} from "lucide-react";

// Sample courses and curriculum modules
const initialCourses = [
  {
    id: 1,
    title: "Advanced Clinical Ayurveda",
    modules: [
      { id: 1, title: "Introduction to Clinical Ayurveda" },
      { id: 2, title: "Clinical Assessment" },
    ],
  },
  {
    id: 2,
    title: "Advanced Clinical Course - Marma Therapy",
    modules: [
      { id: 3, title: "Introduction to Marma Therapy" },
      { id: 4, title: "Marma Point Identification" },
    ],
  },
  {
    id: 3,
    title: "Basic Ayurveda Course",
    modules: [
      { id: 5, title: "Fundamentals of Ayurveda" },
      { id: 6, title: "Tridosha Principles" },
    ],
  },
];

// Sample materials
const initialMaterials = [
  {
    id: 1,
    courseId: 1,
    moduleId: 1,
    title: "Introduction to Ayurveda - Study Notes",
    type: "PDF",
    description: "Basic introduction and principles of Ayurveda.",
    fileName: "introduction-ayurveda.pdf",
    videoUrl: "",
    content: "",
    published: true,
    date: "10 Nov 2026",
  },
  {
    id: 2,
    courseId: 1,
    moduleId: 2,
    title: "Clinical Assessment Video",
    type: "Video",
    description: "Clinical assessment demonstration.",
    fileName: "",
    videoUrl: "https://www.youtube.com/watch?v=example",
    content: "",
    published: true,
    date: "10 Nov 2026",
  },
  {
    id: 3,
    courseId: 2,
    moduleId: 3,
    title: "Marma Therapy Reference Notes",
    type: "Notes",
    description: "Reference notes for Marma Therapy.",
    fileName: "",
    videoUrl: "",
    content: "Add your Marma Therapy study notes here.",
    published: false,
    date: "09 Nov 2026",
  },
];

const emptyForm = {
  courseId: 1,
  moduleId: "",
  title: "",
  type: "PDF",
  description: "",
  file: null,
  fileName: "",
  videoUrl: "",
  content: "",
  published: true,
};

function FacultyMaterials() {
  const [courses] = useState(initialCourses);
  const [materials, setMaterials] = useState(initialMaterials);

  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

  // Get selected course
  const selectedCourseData = courses.find(
    (course) => course.id === Number(form.courseId)
  );

  const availableModules = selectedCourseData?.modules || [];

  // Filter materials
  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(search.toLowerCase()) ||
      material.description.toLowerCase().includes(search.toLowerCase());

    const matchesCourse =
      selectedCourse === "all" ||
      material.courseId === Number(selectedCourse);

    const matchesType =
      selectedType === "all" || material.type === selectedType;

    return matchesSearch && matchesCourse && matchesType;
  });

  const totalMaterials = materials.length;
  const publishedMaterials = materials.filter((item) => item.published).length;
  const unpublishedMaterials = materials.filter(
    (item) => !item.published
  ).length;

  const videoMaterials = materials.filter(
    (item) => item.type === "Video"
  ).length;

  // Open add modal
  const openAddModal = () => {
    setEditingId(null);
    setForm({ ...emptyForm, courseId: Number(selectedCourse) === Number(selectedCourse) && selectedCourse !== "all" ? Number(selectedCourse) : 1 });
    setShowModal(true);
  };

  // Open edit modal
  const openEditModal = (material) => {
    setEditingId(material.id);

    setForm({
      ...emptyForm,
      ...material,
      file: null,
    });

    setShowModal(true);
  };

  // Handle course change
  const handleCourseChange = (courseId) => {
    const course = courses.find(
      (item) => item.id === Number(courseId)
    );

    setForm((previous) => ({
      ...previous,
      courseId: Number(courseId),
      moduleId: course?.modules[0]?.id || "",
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setForm((previous) => ({
      ...previous,
      file,
      fileName: file.name,
    }));
  };

  // Save material
  const handleSave = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter material title.");
      return;
    }

    if (!form.moduleId) {
      alert("Please select a curriculum module.");
      return;
    }

    if (
      ["PDF", "Document", "Presentation"].includes(form.type) &&
      !form.file &&
      !form.fileName
    ) {
      alert("Please select a file.");
      return;
    }

    if (form.type === "Video" && !form.videoUrl.trim()) {
      alert("Please enter video URL.");
      return;
    }

    if (form.type === "Notes" && !form.content.trim()) {
      alert("Please enter study notes.");
      return;
    }

    const materialData = {
      ...form,
      id: editingId || generateId(),
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    if (editingId) {
      setMaterials((previous) =>
        previous.map((item) =>
          item.id === editingId ? materialData : item
        )
      );
    } else {
      setMaterials((previous) => [
        materialData,
        ...previous,
      ]);
    }

    setShowModal(false);
    setForm({ ...emptyForm });
  };

  // Delete material
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this material?")) {
      return;
    }

    setMaterials((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  // Publish / Unpublish
  const togglePublish = (id) => {
    setMaterials((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, published: !item.published }
          : item
      )
    );
  };

  // Course name
  const getCourseName = (courseId) => {
    return (
      courses.find((course) => course.id === courseId)?.title ||
      "Unknown Course"
    );
  };

  // Module name
  const getModuleName = (courseId, moduleId) => {
    const course = courses.find((item) => item.id === courseId);

    return (
      course?.modules.find((module) => module.id === Number(moduleId))
        ?.title || "Unknown Module"
    );
  };

  // Type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case "Video":
        return <Video size={22} />;
      case "PDF":
        return <FileText size={22} />;
      case "Document":
        return <FileText size={22} />;
      case "Presentation":
        return <BookOpen size={22} />;
      case "Notes":
        return <BookOpen size={22} />;
      default:
        return <FolderOpen size={22} />;
    }
  };

  return (
    <div className="min-h-screen">

      {/* HEADER */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#572000]">
            Study Materials
          </h1>
          <p className="mt-1 text-sm text-[#8B6B55]">
            Upload and manage learning resources for your students.
          </p>
        </div>       
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Materials"
          value={totalMaterials}
          icon={<FolderOpen size={22} />}
        />

        <SummaryCard
          title="Published"
          value={publishedMaterials}
          icon={<Eye size={22} />}
        />

        <SummaryCard
          title="Unpublished"
          value={unpublishedMaterials}
          icon={<EyeOff size={22} />}
        />

        <SummaryCard
          title="Video Resources"
          value={videoMaterials}
          icon={<Video size={22} />}
        />
      </div>

      {/* FILTERS */}
      <div className="mb-6 rounded-2xl border border-[#F0E1D1] bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Filter size={18} className="text-[#FF7600]" />
          <h2 className="font-semibold text-[#572000]">
            Search & Filter
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A68B76]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search materials..."
              className="w-full rounded-xl border border-[#EAD9C8] py-3 pl-10 pr-4 text-sm outline-none focus:border-[#FF7600]"
            />
          </div>

          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
          >
            <option value="all">All Courses</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
          >
            <option value="all">All Material Types</option>
            <option value="PDF">PDF</option>
            <option value="Document">Document</option>
            <option value="Presentation">Presentation</option>
            <option value="Video">Video</option>
            <option value="Notes">Notes</option>
          </select>
        </div>
      </div>

      {/* MATERIAL LIST */}
      <div className="rounded-2xl border border-[#F0E1D1] bg-white p-5 shadow-sm sm:p-6">

        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#572000]">
              Learning Resources
            </h2>
            <p className="mt-1 text-sm text-[#9A806C]">
              {filteredMaterials.length} material(s) found
            </p>
          </div>
           <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#E66A00]"
        >
          <Plus size={19} />
          Add Study Material
        </button>
        </div>

        {filteredMaterials.length === 0 ? (
          <div className="rounded-xl bg-[#FFF8EF] px-4 py-12 text-center">
            <FolderOpen
              size={40}
              className="mx-auto mb-3 text-[#C5A88D]"
            />
            <h3 className="font-semibold text-[#572000]">
              No materials found
            </h3>
            <p className="mt-1 text-sm text-[#9A806C]">
              Add a study material or change your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="rounded-xl border border-[#F0E1D1] p-4 transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">

                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E1] text-[#FF7600]">
                      {getTypeIcon(material.type)}
                    </div>

                    <div className="min-w-0">
                      <h3 className="break-words text-sm font-bold text-[#572000]">
                        {material.title}
                      </h3>

                      <p className="mt-1 text-xs text-[#9A806C]">
                        {material.type}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      material.published
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {material.published ? "Published" : "Draft"}
                  </span>
                </div>

                <p className="mt-4 line-clamp-2 text-sm text-[#8B6B55]">
                  {material.description || "No description added."}
                </p>

                <div className="mt-4 space-y-2 rounded-lg bg-[#FFF8EF] p-3">
                  <div className="flex items-start gap-2 text-xs text-[#8B6B55]">
                    <GraduationCap size={15} className="shrink-0 text-[#FF7600]" />
                    <span>{getCourseName(material.courseId)}</span>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-[#8B6B55]">
                    <Layers size={15} className="shrink-0 text-[#FF7600]" />
                    <span>
                      {getModuleName(material.courseId, material.moduleId)}
                    </span>
                  </div>

                  {material.fileName && (
                    <div className="flex items-start gap-2 text-xs text-[#8B6B55]">
                      <FileText size={15} className="shrink-0 text-[#FF7600]" />
                      <span className="break-all">{material.fileName}</span>
                    </div>
                  )}

                  {material.videoUrl && (
                    <div className="flex items-start gap-2 text-xs text-[#8B6B55]">
                      <LinkIcon size={15} className="shrink-0 text-[#FF7600]" />
                      <span className="break-all">Video link added</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#F0E1D1] pt-4">

                  <span className="text-xs text-[#A68B76]">
                    Added: {material.date}
                  </span>

                  <div className="flex items-center gap-2">

                    <button
                      onClick={() => togglePublish(material.id)}
                      title={material.published ? "Unpublish" : "Publish"}
                      className="rounded-lg border border-[#EAD9C8] p-2 text-[#8B6B55] hover:text-[#FF7600]"
                    >
                      {material.published ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>

                    <button
                      onClick={() => openEditModal(material)}
                      title="Edit"
                      className="rounded-lg border border-[#EAD9C8] p-2 text-[#8B6B55] hover:text-[#FF7600]"
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(material.id)}
                      title="Delete"
                      className="rounded-lg border border-red-100 p-2 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD / EDIT MATERIAL MODAL */}
      {showModal && (
        <Modal
          title={editingId ? "Edit Study Material" : "Add Study Material"}
          onClose={() => setShowModal(false)}
        >
          <form onSubmit={handleSave} className="space-y-4">

            {/* COURSE */}
            <FormField label="Select Course">
              <select
                required
                value={form.courseId}
                onChange={(e) => handleCourseChange(e.target.value)}
                className="form-input"
              >
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </FormField>

            {/* MODULE */}
            <FormField label="Select Curriculum Module">
              <select
                required
                value={form.moduleId}
                onChange={(e) =>
                  setForm({ ...form, moduleId: Number(e.target.value) })
                }
                className="form-input"
              >
                <option value="">Select Module</option>
                {availableModules.map((module) => (
                  <option key={module.id} value={module.id}>
                    {module.title}
                  </option>
                ))}
              </select>
            </FormField>

            {/* TITLE */}
            <FormField label="Material Title">
              <input
                required
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                placeholder="Enter material title"
                className="form-input"
              />
            </FormField>

            {/* TYPE */}
            <FormField label="Material Type">
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value,
                    file: null,
                    fileName: "",
                    videoUrl: "",
                    content: "",
                  })
                }
                className="form-input"
              >
                <option value="PDF">PDF</option>
                <option value="Document">Document (DOC / DOCX)</option>
                <option value="Presentation">Presentation (PPT / PPTX)</option>
                <option value="Video">Video Link</option>
                <option value="Notes">Study Notes</option>
              </select>
            </FormField>

            {/* FILE UPLOAD */}
            {["PDF", "Document", "Presentation"].includes(form.type) && (
              <div className="rounded-xl border border-[#F0E1D1] bg-[#FFF8EF] p-4">
                <FormField label="Upload File">
                  <div className="rounded-xl border-2 border-dashed border-[#EAD9C8] bg-white p-5 text-center">
                    <Upload
                      size={28}
                      className="mx-auto mb-2 text-[#FF7600]"
                    />
                    <input
                      type="file"
                      required={!form.fileName}
                      accept={
                        form.type === "PDF"
                          ? ".pdf"
                          : form.type === "Document"
                            ? ".doc,.docx"
                            : ".ppt,.pptx"
                      }
                      onChange={handleFileChange}
                      className="w-full text-sm text-[#8B6B55] file:mr-3 file:rounded-lg file:border-0 file:bg-[#FFF0E1] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#FF7600]"
                    />

                    {form.fileName && (
                      <p className="mt-3 break-all text-xs font-medium text-green-700">
                        Selected: {form.fileName}
                      </p>
                    )}
                  </div>
                </FormField>
              </div>
            )}

            {/* VIDEO LINK */}
            {form.type === "Video" && (
              <div className="rounded-xl border border-[#F0E1D1] bg-[#FFF8EF] p-4">
                <FormField label="Video URL">
                  <input
                    required
                    type="url"
                    value={form.videoUrl}
                    onChange={(e) =>
                      setForm({ ...form, videoUrl: e.target.value })
                    }
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="form-input"
                  />
                  <p className="mt-2 text-xs text-[#9A806C]">
                    Add a YouTube, Vimeo or supported video link.
                  </p>
                </FormField>
              </div>
            )}

            {/* STUDY NOTES */}
            {form.type === "Notes" && (
              <div className="rounded-xl border border-[#F0E1D1] bg-[#FFF8EF] p-4">
                <FormField label="Study Notes Content">
                  <textarea
                    required
                    rows={7}
                    value={form.content}
                    onChange={(e) =>
                      setForm({ ...form, content: e.target.value })
                    }
                    placeholder="Write your study notes here..."
                    className="form-input"
                  />
                </FormField>
              </div>
            )}

            {/* DESCRIPTION */}
            <FormField label="Description">
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Enter a short description..."
                className="form-input"
              />
            </FormField>

            {/* PUBLISH STATUS */}
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#F0E1D1] bg-[#FFF8EF] p-4">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) =>
                  setForm({ ...form, published: e.target.checked })
                }
                className="h-4 w-4 accent-[#FF7600]"
              />
              <div>
                <p className="text-sm font-semibold text-[#572000]">
                  Publish Material
                </p>
                <p className="text-xs text-[#9A806C]">
                  Published materials will be available to students.
                </p>
              </div>
            </label>

            {/* BUTTONS */}
            <div className="flex flex-col-reverse justify-end gap-3 border-t border-[#F0E1D1] pt-4 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-xl border border-[#EAD9C8] px-5 py-3 text-sm font-semibold text-[#8B6B55]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white hover:bg-[#E66A00]"
              >
                <Save size={17} />
                {editingId ? "Update Material" : "Save Material"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// SUMMARY CARD
function SummaryCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-[#F0E1D1] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#9A806C]">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-[#572000]">
            {value}
          </h3>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E1] text-[#FF7600]">
          {icon}
        </div>
      </div>
    </div>
  );
}

// FORM FIELD
function FormField({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#572000]">
        {label}
      </label>
      {children}
    </div>
  );
}

// MODAL
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-3 sm:p-5">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#F0E1D1] bg-white px-5 py-4">
          <h2 className="text-lg font-bold text-[#572000]">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#8B6B55] hover:bg-[#FFF3E5]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export default FacultyMaterials;
