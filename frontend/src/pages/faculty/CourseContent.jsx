
import { useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  ChevronDown,
  ChevronUp,
  Video,
  FileText,
  ClipboardList,
  Clock,
  Edit,
  Trash2,
  X,
  Save,
  Layers,
  Calendar,
  HelpCircle,
  GraduationCap,
  FilePlus,
  Link as LinkIcon,
} from "lucide-react";

const lessonTypes = [
  { value: "Video", label: "Video Lesson", icon: Video },
  { value: "PDF", label: "PDF / Document", icon: FileText },
  { value: "Text", label: "Text Lesson", icon: BookOpen },
  { value: "Live Session", label: "Live Session", icon: Calendar },
  { value: "Quiz", label: "Quiz / Assessment", icon: HelpCircle },
  { value: "Assignment", label: "Assignment", icon: ClipboardList },
];

const initialCourses = [
  {
    id: 1,
    title: "Advanced Clinical Ayurveda",
    modules: [
      {
        id: 1,
        title: "Introduction to Clinical Ayurveda",
        description: "Fundamentals of clinical Ayurveda practice.",
        lessons: [
          {
            id: 1,
            title: "Introduction to Ayurveda",
            type: "Video",
            duration: "25 min",
            preview: true,
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
          },
          {
            id: 2,
            title: "Basic Principles",
            type: "PDF",
            duration: "15 min",
            preview: false,
            fileName: "basic-principles.pdf",
          },
        ],
      },
      {
        id: 2,
        title: "Clinical Assessment",
        description: "Patient assessment and diagnosis.",
        lessons: [
          {
            id: 3,
            title: "Patient Examination",
            type: "Video",
            duration: "30 min",
            preview: false,
            videoUrl: "",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Advanced Clinical Course - Marma Therapy",
    modules: [
      {
        id: 3,
        title: "Introduction to Marma Therapy",
        description: "Introduction and fundamentals.",
        lessons: [
          {
            id: 4,
            title: "Understanding Marma Points",
            type: "Video",
            duration: "20 min",
            preview: true,
            videoUrl: "",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Basic Ayurveda Course",
    modules: [
      {
        id: 4,
        title: "Fundamentals of Ayurveda",
        description: "Basic concepts and principles.",
        lessons: [
          {
            id: 5,
            title: "Introduction to Ayurveda",
            type: "Text",
            duration: "10 min",
            preview: true,
            content: "Enter your lesson content here.",
          },
        ],
      },
    ],
  },
];

const emptyModule = {
  title: "",
  description: "",
};

const emptyLesson = {
  title: "",
  type: "Video",
  duration: "",
  preview: false,
  videoUrl: "",
  file: null,
  fileName: "",
  content: "",
  meetingUrl: "",
  sessionDateTime: "",
  quizInstructions: "",
  questions: "",
  assignmentInstructions: "",
  assignmentFile: null,
  deadline: "",
};

function CourseContent() {
  const [courses, setCourses] = useState(initialCourses);
  const [selectedCourseId, setSelectedCourseId] = useState(1);

  const [expandedModules, setExpandedModules] = useState([1]);
  const [search, setSearch] = useState("");

  const [showModuleModal, setShowModuleModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);

  const [editingModuleId, setEditingModuleId] = useState(null);
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [selectedModuleId, setSelectedModuleId] = useState(null);

  const [moduleForm, setModuleForm] = useState(emptyModule);
  const [lessonForm, setLessonForm] = useState(emptyLesson);

  const selectedCourse = courses.find(
    (course) => course.id === Number(selectedCourseId)
  );

  const modules = selectedCourse?.modules || [];

  const totalLessons = modules.reduce(
    (total, module) => total + module.lessons.length,
    0
  );

  const totalVideos = modules.reduce(
    (total, module) =>
      total +
      module.lessons.filter((lesson) => lesson.type === "Video").length,
    0
  );

  const totalMaterials = modules.reduce(
    (total, module) =>
      total +
      module.lessons.filter((lesson) =>
        ["PDF", "Text"].includes(lesson.type)
      ).length,
    0
  );

  const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

  // MODULE FUNCTIONS

  const openAddModule = () => {
    setEditingModuleId(null);
    setModuleForm({ ...emptyModule });
    setShowModuleModal(true);
  };

  const openEditModule = (module) => {
    setEditingModuleId(module.id);
    setModuleForm({
      title: module.title,
      description: module.description || "",
    });
    setShowModuleModal(true);
  };

  const saveModule = (e) => {
    e.preventDefault();

    if (!moduleForm.title.trim()) {
      alert("Please enter module title.");
      return;
    }

    let savedModuleId;

    setCourses((previous) =>
      previous.map((course) => {
        if (course.id !== Number(selectedCourseId)) return course;

        if (editingModuleId) {
          savedModuleId = editingModuleId;

          return {
            ...course,
            modules: course.modules.map((module) =>
              module.id === editingModuleId
                ? { ...module, ...moduleForm }
                : module
            ),
          };
        }

        savedModuleId = generateId();

        return {
          ...course,
          modules: [
            ...course.modules,
            {
              id: savedModuleId,
              ...moduleForm,
              lessons: [],
            },
          ],
        };
      })
    );

    if (savedModuleId) {
      setExpandedModules((previous) =>
        previous.includes(savedModuleId)
          ? previous
          : [...previous, savedModuleId]
      );
    }

    setShowModuleModal(false);
  };

  const deleteModule = (moduleId) => {
    if (!window.confirm("Delete this curriculum module and all its lessons?")) {
      return;
    }

    setCourses((previous) =>
      previous.map((course) =>
        course.id === Number(selectedCourseId)
          ? {
              ...course,
              modules: course.modules.filter(
                (module) => module.id !== moduleId
              ),
            }
          : course
      )
    );

    setExpandedModules((previous) =>
      previous.filter((id) => id !== moduleId)
    );
  };

  // LESSON FUNCTIONS

  const openAddLesson = (moduleId) => {
    setSelectedModuleId(moduleId);
    setEditingLessonId(null);
    setLessonForm({ ...emptyLesson });
    setShowLessonModal(true);
  };

  const openEditLesson = (moduleId, lesson) => {
    setSelectedModuleId(moduleId);
    setEditingLessonId(lesson.id);
    setLessonForm({ ...emptyLesson, ...lesson });
    setShowLessonModal(true);
  };

  const saveLesson = (e) => {
    e.preventDefault();

    if (!lessonForm.title.trim()) {
      alert("Please enter lesson title.");
      return;
    }

    if (lessonForm.type === "Video" && !lessonForm.videoUrl.trim()) {
      alert("Please enter the video URL.");
      return;
    }

    if (
      lessonForm.type === "PDF" &&
      !lessonForm.file &&
      !lessonForm.fileName
    ) {
      alert("Please select a document.");
      return;
    }

    if (lessonForm.type === "Text" && !lessonForm.content.trim()) {
      alert("Please enter lesson content.");
      return;
    }

    if (
      lessonForm.type === "Live Session" &&
      !lessonForm.meetingUrl.trim()
    ) {
      alert("Please enter the meeting URL.");
      return;
    }

    const lessonData = {
      ...lessonForm,
      id: editingLessonId || generateId(),
    };

    setCourses((previous) =>
      previous.map((course) =>
        course.id === Number(selectedCourseId)
          ? {
              ...course,
              modules: course.modules.map((module) =>
                module.id === selectedModuleId
                  ? {
                      ...module,
                      lessons: editingLessonId
                        ? module.lessons.map((lesson) =>
                            lesson.id === editingLessonId
                              ? lessonData
                              : lesson
                          )
                        : [...module.lessons, lessonData],
                    }
                  : module
              ),
            }
          : course
      )
    );

    setExpandedModules((previous) =>
      previous.includes(selectedModuleId)
        ? previous
        : [...previous, selectedModuleId]
    );

    setShowLessonModal(false);
    setLessonForm({ ...emptyLesson });
  };

  const deleteLesson = (moduleId, lessonId) => {
    if (!window.confirm("Delete this lesson?")) return;

    setCourses((previous) =>
      previous.map((course) =>
        course.id === Number(selectedCourseId)
          ? {
              ...course,
              modules: course.modules.map((module) =>
                module.id === moduleId
                  ? {
                      ...module,
                      lessons: module.lessons.filter(
                        (lesson) => lesson.id !== lessonId
                      ),
                    }
                  : module
              ),
            }
          : course
      )
    );
  };

  const toggleModule = (moduleId) => {
    setExpandedModules((previous) =>
      previous.includes(moduleId)
        ? previous.filter((id) => id !== moduleId)
        : [...previous, moduleId]
    );
  };

  const handleTypeChange = (type) => {
    setLessonForm((previous) => ({
      ...emptyLesson,
      title: previous.title,
      duration: previous.duration,
      preview: previous.preview,
      type,
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLessonForm((previous) => ({
      ...previous,
      [field]: file,
      ...(field === "file" ? { fileName: file.name } : {}),
    }));
  };

  const filteredModules = modules.filter((module) =>
    module.title.toLowerCase().includes(search.toLowerCase())
  );

  const getLessonIcon = (type) => {
    const item = lessonTypes.find((lesson) => lesson.value === type);
    const Icon = item?.icon || FileText;
    return <Icon size={18} />;
  };

  return (
    <div className="min-h-screen ">

      {/* PAGE HEADER */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-[#572000]">
          Course Content Management
        </h1>
        <p className="mt-1 text-sm text-[#8B6B55]">
          Create curriculum modules and manage lessons for your courses.
        </p>
      </div>

      {/* COURSE SELECTOR */}
      <div className="mb-6 rounded-2xl border border-[#F0E1D1] bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <GraduationCap size={20} className="text-[#FF7600]" />
          <label className="text-sm font-semibold text-[#572000]">
            Select Course
          </label>
        </div>

        <select
          value={selectedCourseId}
          onChange={(e) => {
            setSelectedCourseId(Number(e.target.value));
            setExpandedModules([]);
            setSearch("");
          }}
          className="w-full rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
        >
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* SUMMARY */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Curriculum Modules"
          value={modules.length}
          icon={<Layers size={21} />}
        />
        <SummaryCard
          title="Total Lessons"
          value={totalLessons}
          icon={<BookOpen size={21} />}
        />
        <SummaryCard
          title="Video Lessons"
          value={totalVideos}
          icon={<Video size={21} />}
        />
        <SummaryCard
          title="Study Materials"
          value={totalMaterials}
          icon={<FileText size={21} />}
        />
      </div>

      {/* CURRICULUM SECTION */}
      <div className="overflow-hidden rounded-2xl border border-[#F0E1D1] bg-white shadow-sm">

        {/* MODULE SEARCH */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#F0E1D1] p-5 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-bold text-[#572000]">
              Curriculum Modules
            </h3>
            <p className="mt-1 text-xs text-[#9A806C]">
              {modules.length} module(s) · {totalLessons} lesson(s)
            </p>
          </div>
        
          <div className="relative">
            
            {/* PROMINENT ADD CURRICULUM BUTTON */}
            <button
              type="button"
              onClick={openAddModule}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#FF7600] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#E66A00]"
            >
              <Plus size={20} />
              Add Curriculum Module
            </button>
          </div>
        </div>

        {/* MODULE LIST */}
        <div className="space-y-4 p-4 sm:p-6">
          {filteredModules.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-[#EAD9C8] bg-[#FFF8EF] px-5 py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFE7CF] text-[#FF7600]">
                <Layers size={30} />
              </div>

              <h3 className="text-lg font-bold text-[#572000]">
                No Curriculum Modules Yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-[#9A806C]">
                Start building your course curriculum by adding your first module.
                You can add video lessons, PDFs, text lessons, quizzes and assignments.
              </p>

              <button
                type="button"
                onClick={openAddModule}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#FF7600] px-6 py-3 text-sm font-semibold text-white hover:bg-[#E66A00]"
              >
                <Plus size={18} />
                Create First Module
              </button>
            </div>
          ) : (
            filteredModules.map((module, index) => {
              const expanded = expandedModules.includes(module.id);

              return (
                <div
                  key={module.id}
                  className="overflow-hidden rounded-xl border border-[#EEDCCB]"
                >
                  {/* MODULE CARD HEADER */}
                  <div className="flex flex-col justify-between gap-3 bg-[#FFF8EF] p-4 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={() => toggleModule(module.id)}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFE7CF] text-[#FF7600]">
                        <Layers size={21} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#FF7600]">
                          Module {index + 1}
                        </p>
                        <h3 className="mt-1 truncate text-sm font-bold text-[#572000]">
                          {module.title}
                        </h3>
                        <p className="mt-1 text-xs text-[#9A806C]">
                          {module.lessons.length} Lessons
                        </p>
                      </div>

                      {expanded ? (
                        <ChevronUp size={20} className="shrink-0 text-[#8B6B55]" />
                      ) : (
                        <ChevronDown size={20} className="shrink-0 text-[#8B6B55]" />
                      )}
                    </button>

                    <div className="flex items-center gap-2 pl-14 sm:pl-0">
                      <button
                        type="button"
                        onClick={() => openAddLesson(module.id)}
                        className="flex items-center gap-1.5 rounded-lg bg-[#FF7600] px-3 py-2.5 text-xs font-semibold text-white hover:bg-[#E66A00]"
                      >
                        <Plus size={15} />
                        Add Lesson
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditModule(module)}
                        className="rounded-lg border border-[#EAD9C8] bg-white p-2.5 text-[#8B6B55] hover:text-[#FF7600]"
                        title="Edit Module"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteModule(module.id)}
                        className="rounded-lg border border-red-100 bg-white p-2.5 text-red-500 hover:bg-red-50"
                        title="Delete Module"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* MODULE DESCRIPTION */}
                  {expanded && (
                    <div className="space-y-3 p-4">
                      {module.description && (
                        <p className="border-b border-[#F1E7DD] pb-3 text-sm text-[#9A806C]">
                          {module.description}
                        </p>
                      )}

                      {module.lessons.length === 0 ? (
                        <div className="rounded-xl bg-[#FFF8EF] p-6 text-center">
                          <FilePlus className="mx-auto mb-2 text-[#C5A88D]" size={28} />
                          <p className="text-sm font-medium text-[#8B6B55]">
                            No lessons in this module.
                          </p>
                          <button
                            type="button"
                            onClick={() => openAddLesson(module.id)}
                            className="mt-3 text-sm font-semibold text-[#FF7600]"
                          >
                            + Add your first lesson
                          </button>
                        </div>
                      ) : (
                        module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className="flex flex-col justify-between gap-3 rounded-xl border border-[#F1E7DD] p-3 sm:flex-row sm:items-center"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF3E5] text-[#FF7600]">
                                {getLessonIcon(lesson.type)}
                              </div>

                              <div className="min-w-0">
                                <p className="text-xs text-[#A68B76]">
                                  Lesson {lessonIndex + 1}
                                </p>

                                <p className="truncate text-sm font-semibold text-[#572000]">
                                  {lesson.title}
                                </p>

                                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#9A806C]">
                                  <span>{lesson.type}</span>

                                  {lesson.duration && (
                                    <>
                                      <span>•</span>
                                      <span className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {lesson.duration}
                                      </span>
                                    </>
                                  )}

                                  {lesson.preview && (
                                    <span className="rounded-full bg-green-50 px-2 py-0.5 text-green-700">
                                      Free Preview
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 pl-12 sm:pl-0">
                              <button
                                type="button"
                                onClick={() => openEditLesson(module.id, lesson)}
                                className="rounded-lg border border-[#EAD9C8] p-2 text-[#8B6B55] hover:text-[#FF7600]"
                                title="Edit Lesson"
                              >
                                <Edit size={15} />
                              </button>

                              <button
                                type="button"
                                onClick={() => deleteLesson(module.id, lesson.id)}
                                className="rounded-lg border border-red-100 p-2 text-red-500 hover:bg-red-50"
                                title="Delete Lesson"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* ADD ANOTHER MODULE */}
          {modules.length > 0 && (
            <button
              type="button"
              onClick={openAddModule}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#EAD9C8] py-4 text-sm font-semibold text-[#FF7600] transition hover:border-[#FF7600] hover:bg-[#FFF8EF]"
            >
              <Plus size={19} />
              Add Another Curriculum Module
            </button>
          )}
        </div>
      </div>

      {/* ADD / EDIT MODULE MODAL */}
      {showModuleModal && (
        <Modal
          title={editingModuleId ? "Edit Curriculum Module" : "Add Curriculum Module"}
          onClose={() => setShowModuleModal(false)}
        >
          <form onSubmit={saveModule} className="space-y-4">
            <FormField label="Module Title">
              <input
                required
                value={moduleForm.title}
                onChange={(e) =>
                  setModuleForm({ ...moduleForm, title: e.target.value })
                }
                placeholder="e.g. Introduction to Ayurveda"
                className="form-input"
              />
            </FormField>

            <FormField label="Module Description">
              <textarea
                rows={4}
                value={moduleForm.description}
                onChange={(e) =>
                  setModuleForm({ ...moduleForm, description: e.target.value })
                }
                placeholder="Enter module description..."
                className="form-input"
              />
            </FormField>

            <ModalActions
              onCancel={() => setShowModuleModal(false)}
              submitLabel={editingModuleId ? "Update Module" : "Create Module"}
            />
          </form>
        </Modal>
      )}

      {/* ADD / EDIT LESSON MODAL */}
      {showLessonModal && (
        <Modal
          title={editingLessonId ? "Edit Lesson" : "Add New Lesson"}
          onClose={() => setShowLessonModal(false)}
          wide
        >
          <form onSubmit={saveLesson} className="space-y-4">
            <FormField label="Lesson Title">
              <input
                required
                value={lessonForm.title}
                onChange={(e) =>
                  setLessonForm({ ...lessonForm, title: e.target.value })
                }
                placeholder="Enter lesson title"
                className="form-input"
              />
            </FormField>

            <FormField label="Lesson Type">
              <select
                value={lessonForm.type}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="form-input"
              >
                {lessonTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </FormField>

            {/* VIDEO */}
            {lessonForm.type === "Video" && (
              <DynamicSection title="Video Details" icon={<Video size={19} />}>
                <FormField label="Video URL">
                  <input
                    type="url"
                    required
                    value={lessonForm.videoUrl}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, videoUrl: e.target.value })
                    }
                    placeholder="https://www.youtube.com/embed/VIDEO_ID"
                    className="form-input"
                  />
                  <p className="mt-1 text-xs text-[#9A806C]">
                    Paste a supported YouTube, Vimeo or video hosting URL.
                  </p>
                </FormField>
              </DynamicSection>
            )}

            {/* PDF */}
            {lessonForm.type === "PDF" && (
              <DynamicSection title="Document Details" icon={<FileText size={19} />}>
                <FormField label="Upload PDF / Document">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    onChange={(e) => handleFileChange(e, "file")}
                    className="form-input"
                  />
                  {lessonForm.fileName && (
                    <p className="mt-2 text-xs text-green-700">
                      Selected: {lessonForm.fileName}
                    </p>
                  )}
                </FormField>
              </DynamicSection>
            )}

            {/* TEXT */}
            {lessonForm.type === "Text" && (
              <DynamicSection title="Lesson Content" icon={<BookOpen size={19} />}>
                <FormField label="Content">
                  <textarea
                    required
                    rows={7}
                    value={lessonForm.content}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, content: e.target.value })
                    }
                    placeholder="Enter your lesson content..."
                    className="form-input"
                  />
                </FormField>
              </DynamicSection>
            )}

            {/* LIVE SESSION */}
            {lessonForm.type === "Live Session" && (
              <DynamicSection title="Live Session Details" icon={<Calendar size={19} />}>
                <FormField label="Meeting URL">
                  <input
                    type="url"
                    required
                    value={lessonForm.meetingUrl}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, meetingUrl: e.target.value })
                    }
                    placeholder="https://meet.google.com/..."
                    className="form-input"
                  />
                </FormField>

                <FormField label="Session Date and Time">
                  <input
                    type="datetime-local"
                    value={lessonForm.sessionDateTime}
                    onChange={(e) =>
                      setLessonForm({
                        ...lessonForm,
                        sessionDateTime: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </FormField>
              </DynamicSection>
            )}

            {/* QUIZ */}
            {lessonForm.type === "Quiz" && (
              <DynamicSection title="Quiz / Assessment Details" icon={<HelpCircle size={19} />}>
                <FormField label="Quiz Instructions">
                  <textarea
                    rows={3}
                    value={lessonForm.quizInstructions}
                    onChange={(e) =>
                      setLessonForm({
                        ...lessonForm,
                        quizInstructions: e.target.value,
                      })
                    }
                    placeholder="Enter quiz instructions..."
                    className="form-input"
                  />
                </FormField>

                <FormField label="Questions">
                  <textarea
                    rows={5}
                    value={lessonForm.questions}
                    onChange={(e) =>
                      setLessonForm({
                        ...lessonForm,
                        questions: e.target.value,
                      })
                    }
                    placeholder="Enter quiz questions..."
                    className="form-input"
                  />
                  <p className="mt-1 text-xs text-[#9A806C]">
                    A separate quiz builder can later manage options and correct answers.
                  </p>
                </FormField>
              </DynamicSection>
            )}

            {/* ASSIGNMENT */}
            {lessonForm.type === "Assignment" && (
              <DynamicSection title="Assignment Details" icon={<ClipboardList size={19} />}>
                <FormField label="Assignment Instructions">
                  <textarea
                    rows={4}
                    value={lessonForm.assignmentInstructions}
                    onChange={(e) =>
                      setLessonForm({
                        ...lessonForm,
                        assignmentInstructions: e.target.value,
                      })
                    }
                    placeholder="Enter assignment instructions..."
                    className="form-input"
                  />
                </FormField>

                <FormField label="Attachment (Optional)">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "assignmentFile")}
                    className="form-input"
                  />
                  {lessonForm.assignmentFile && (
                    <p className="mt-2 text-xs text-green-700">
                      Selected: {lessonForm.assignmentFile.name}
                    </p>
                  )}
                </FormField>

                <FormField label="Submission Deadline">
                  <input
                    type="datetime-local"
                    value={lessonForm.deadline}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, deadline: e.target.value })
                    }
                    className="form-input"
                  />
                </FormField>
              </DynamicSection>
            )}

            {/* COMMON FIELDS */}
            <FormField label="Duration (Optional)">
              <input
                value={lessonForm.duration}
                onChange={(e) =>
                  setLessonForm({ ...lessonForm, duration: e.target.value })
                }
                placeholder="e.g. 25 min"
                className="form-input"
              />
            </FormField>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#F0E1D1] bg-[#FFF8EF] p-4">
              <input
                type="checkbox"
                checked={lessonForm.preview}
                onChange={(e) =>
                  setLessonForm({ ...lessonForm, preview: e.target.checked })
                }
                className="h-4 w-4 accent-[#FF7600]"
              />
              <div>
                <p className="text-sm font-semibold text-[#572000]">
                  Free Preview
                </p>
                <p className="text-xs text-[#9A806C]">
                  Allow students to access this lesson before purchasing the course.
                </p>
              </div>
            </label>

            <ModalActions
              onCancel={() => setShowLessonModal(false)}
              submitLabel={editingLessonId ? "Update Lesson" : "Save Lesson"}
            />
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

// DYNAMIC LESSON SECTION
function DynamicSection({ title, icon, children }) {
  return (
    <div className="space-y-4 rounded-xl border border-[#F0E1D1] bg-[#FFF8EF] p-4">
      <div className="flex items-center gap-2 font-semibold text-[#572000]">
        <span className="text-[#FF7600]">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

// MODAL
function Modal({ title, children, onClose, wide = false }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-3 sm:p-5">
      <div
        className={`max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white shadow-xl ${
          wide ? "max-w-2xl" : "max-w-lg"
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#F0E1D1] bg-white px-5 py-4">
          <h2 className="text-lg font-bold text-[#572000]">{title}</h2>
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

// MODAL ACTIONS
function ModalActions({ onCancel, submitLabel }) {
  return (
    <div className="flex flex-col-reverse justify-end gap-3 border-t border-[#F0E1D1] pt-4 sm:flex-row">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-xl border border-[#EAD9C8] px-5 py-2.5 text-sm font-semibold text-[#8B6B55] hover:bg-[#FFF8EF]"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-[#FF7600] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E66A00]"
      >
        <Save size={16} />
        {submitLabel}
      </button>
    </div>
  );
}

// LESSON ICON
function getLessonIcon(type) {
  const item = lessonTypes.find((lesson) => lesson.value === type);
  const Icon = item?.icon || FileText;
  return <Icon size={18} />;
}

export default CourseContent;
