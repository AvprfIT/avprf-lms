import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  FileText,
  GraduationCap,
  ListVideo,
  MessageCircle,
  PlayCircle,
  Send,
  Users,
  UserRound,
  Video,
  Check,
  Circle,
} from "lucide-react";

// =====================================
// SAMPLE COURSE DATA
// =====================================

const learningData = {
  1: {
    title: "Advanced Clinical Ayurveda",
    instructor: "AVPRF Faculty",
    modules: [
      {
        id: 1,
        title: "Introduction to Clinical Ayurveda",
        lessons: [
          {
            id: 1,
            title: "Introduction to Ayurveda",
            duration: "15 min",
            type: "video",
            description: "Understand the introduction and fundamental concepts of Ayurveda.",
            completed: true,
          },
          {
            id: 2,
            title: "Fundamentals of Clinical Practice",
            duration: "22 min",
            type: "video",
            description: "Learn the fundamentals of clinical Ayurveda practice.",
            completed: true,
          },
          {
            id: 3,
            title: "Module Study Material",
            duration: "PDF",
            type: "pdf",
            description: "Read the study material for this module.",
            completed: true,
          },
        ],
      },
      {
        id: 2,
        title: "Ayurveda Diagnosis and Assessment",
        lessons: [
          {
            id: 4,
            title: "Patient Assessment",
            duration: "25 min",
            type: "video",
            description: "Learn the basic patient assessment methods.",
            completed: true,
          },
          {
            id: 5,
            title: "Clinical Examination Methods",
            duration: "30 min",
            type: "video",
            description: "Understand clinical examination methods in Ayurveda.",
            completed: false,
          },
          {
            id: 6,
            title: "Clinical Case Studies",
            duration: "PDF",
            type: "pdf",
            description: "Study clinical case examples and reference materials.",
            completed: false,
          },
        ],
      },
      {
        id: 3,
        title: "Treatment Principles and Practice",
        lessons: [
          {
            id: 3,
            title: "Treatment Planning",
            duration: "28 min",
            type: "video",
            description: "Learn the basic principles of treatment planning.",
            completed: false,
          },
          {
            id: 8,
            title: "Practical Applications",
            duration: "35 min",
            type: "video",
            description: "Explore practical applications of Ayurveda.",
            completed: false,
          },
        ],
      },
    ],
  },

  2: {
    title: "Advanced Clinical Course - Marma Therapy",
    instructor: "AVPRF Faculty",
    modules: [
      {
        id: 1,
        title: "Introduction to Marma Therapy",
        lessons: [
          {
            id: 1,
            title: "Fundamentals of Marma",
            duration: "20 min",
            type: "video",
            description: "Introduction to Marma Therapy and its fundamental principles.",
            completed: false,
          },
          {
            id: 2,
            title: "Introduction Study Material",
            duration: "PDF",
            type: "pdf",
            description: "Study the introductory Marma Therapy material.",
            completed: false,
          },
        ],
      },
      {
        id: 2,
        title: "Clinical Applications",
        lessons: [
          {
            id: 3,
            title: "Marma Points and Practice",
            duration: "30 min",
            type: "video",
            description: "Learn about Marma points and practical applications.",
            completed: false,
          },
        ],
      },
    ],
  },
};

// =====================================
// LIVE CHAT COMPONENT
// =====================================

function LiveChatPanel() {
  const [chatType, setChatType] = useState("group");
  const [facultyId, setFacultyId] = useState("faculty-1");
  const [message, setMessage] = useState("");

  const faculty = [
    { id: "faculty-1", name: "Dr. Arun Kumar" },
    { id: "faculty-2", name: "Dr. Priya" },
  ];

  const [groupMessages, setGroupMessages] = useState([
    {
      id: 1,
      sender: "Dr. Arun Kumar",
      role: "Faculty",
      text: "Welcome to today's learning session!",
      time: "10:00 AM",
      own: false,
    },
    {
      id: 2,
      sender: "Student",
      role: "Student",
      text: "Good morning, Sir!",
      time: "10:02 AM",
      own: true,
    },
    {
      id: 3,
      sender: "Dr. Priya",
      role: "Faculty",
      text: "Please feel free to ask your questions.",
      time: "10:05 AM",
      own: false,
    },
  ]);

  const [privateMessages, setPrivateMessages] = useState({
    "faculty-1": [
      {
        id: 1,
        sender: "Dr. Arun Kumar",
        role: "Faculty",
        text: "Hello! You can ask your course-related doubts here.",
        time: "10:05 AM",
        own: false,
      },
    ],
    "faculty-2": [
      {
        id: 2,
        sender: "Dr. Priya",
        role: "Faculty",
        text: "Hello! How can I help you with your lessons?",
        time: "10:10 AM",
        own: false,
      },
    ],
  });

  const currentMessages =
    chatType === "group"
      ? groupMessages
      : privateMessages[facultyId] || [];

  const selectedFaculty = faculty.find(
    (person) => person.id === facultyId
  );

  const sendMessage = (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const newMessage = {
      id: Date.now(),
      sender: "You",
      role: "Student",
      text: trimmedMessage,
      time: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      own: true,
    };

    if (chatType === "group") {
      setGroupMessages((previous) => [
        ...previous,
        newMessage,
      ]);
    } else {
      setPrivateMessages((previous) => ({
        ...previous,
        [facultyId]: [
          ...(previous[facultyId] || []),
          newMessage,
        ],
      }));
    }

    setMessage("");
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">

      {/* Chat Header */}
      <div className="border-b border-orange-100 bg-[#FFF8EF] p-5">
        <div className="flex items-center justify-between gap-3">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#FF7600]">
              <MessageCircle size={23} />
            </div>

            <div>
              <h2 className="font-bold">Live Classroom Chat</h2>
              <p className="mt-1 text-xs text-gray-500">
                Connect with faculty and students
              </p>
            </div>
          </div>

          <span className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-[#FF7600]">
            Demo Mode
          </span>

        </div>
      </div>

      {/* Chat Tabs */}
      <div className="grid grid-cols-2 gap-2 border-b border-orange-100 p-3">

        <button
          type="button"
          onClick={() => setChatType("group")}
          className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition ${
            chatType === "group"
              ? "bg-[#FF7600] text-white"
              : "bg-orange-50 text-[#572000] hover:bg-orange-100"
          }`}
        >
          <Users size={18} />
          Group Chat
        </button>

        <button
          type="button"
          onClick={() => setChatType("private")}
          className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition ${
            chatType === "private"
              ? "bg-[#FF7600] text-white"
              : "bg-orange-50 text-[#572000] hover:bg-orange-100"
          }`}
        >
          <UserRound size={18} />
          Private Chat
        </button>

      </div>

      {/* Faculty Selection */}
      {chatType === "private" && (
        <div className="border-b border-orange-100 p-4">

          <label className="mb-2 block text-xs font-semibold text-gray-500">
            Select Faculty
          </label>

          <select
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
            className="w-full rounded-xl border border-orange-100 bg-[#FFF8EF] px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
          >
            {faculty.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>

          <p className="mt-2 flex items-center gap-2 text-xs text-green-700">
            <Circle size={8} fill="currentColor" />
            Private conversation with {selectedFaculty?.name}
          </p>

        </div>
      )}

      {/* Chat Messages */}
      <div className="flex h-[350px] flex-col gap-4 overflow-y-auto bg-[#FFFCF8] p-4">

        {currentMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.own ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.own
                  ? "rounded-br-sm bg-[#FF7600] text-white"
                  : "rounded-bl-sm border border-orange-100 bg-white text-[#572000]"
              }`}
            >

              {!msg.own && (
                <p className="mb-1 text-xs font-bold text-[#FF7600]">
                  {msg.sender} · {msg.role}
                </p>
              )}

              <p className="break-words text-sm leading-6">
                {msg.text}
              </p>

              <p
                className={`mt-2 text-right text-[10px] ${
                  msg.own ? "text-orange-100" : "text-gray-400"
                }`}
              >
                {msg.time}
              </p>

            </div>
          </div>
        ))}

      </div>

      {/* Message Input */}
      <form
        onSubmit={sendMessage}
        className="flex items-center gap-2 border-t border-orange-100 bg-white p-3"
      >

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            chatType === "group"
              ? "Message to classroom..."
              : "Message to faculty..."
          }
          className="min-w-0 flex-1 rounded-xl border border-orange-100 bg-[#FFF8EF] px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
        />

        <button
          type="submit"
          disabled={!message.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF7600] text-white transition hover:bg-[#E96A00] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send message"
        >
          <Send size={19} />
        </button>

      </form>

      <p className="bg-[#FFF8EF] px-4 py-2 text-center text-[11px] text-gray-400">
        Classroom communication · Be respectful and professional
      </p>

    </section>
  );
}

// =====================================
// LEARNING PAGE
// =====================================

function Learning() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const course = learningData[courseId];

  const [completedLessons, setCompletedLessons] = useState(() => {
    if (!course) return [];

    return course.modules
      .flatMap((module) => module.lessons)
      .filter((lesson) => lesson.completed)
      .map((lesson) => lesson.id);
  });

  const [openModule, setOpenModule] = useState(1);

  if (!course) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl bg-white p-8 text-center">
        <BookOpen size={45} className="text-[#FF7600]" />

        <h2 className="mt-4 text-xl font-bold">
          Course Not Found
        </h2>

        <Link
          to="/my-courses"
          className="mt-5 rounded-xl bg-[#FF7600] px-6 py-3 text-sm font-semibold text-white"
        >
          Back to My Courses
        </Link>
      </div>
    );
  }

  const allLessons = course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      ...lesson,
      moduleTitle: module.title,
      moduleId: module.id,
    }))
  );

  const currentLesson =
    allLessons.find(
      (lesson) => lesson.id === Number(lessonId)
    ) || allLessons[0];

  const currentIndex = allLessons.findIndex(
    (lesson) => lesson.id === currentLesson.id
  );

  const previousLesson = allLessons[currentIndex - 1];
  const nextLesson = allLessons[currentIndex + 1];

  const progress = Math.round(
    (completedLessons.length / allLessons.length) * 100
  );

  const isCompleted = completedLessons.includes(currentLesson.id);

  const toggleModule = (id) => {
    setOpenModule((previous) =>
      previous === id ? null : id
    );
  };

  const markAsCompleted = () => {
    if (!isCompleted) {
      setCompletedLessons((previous) => [
        ...previous,
        currentLesson.id,
      ]);
    }
  };

  const goToLesson = (id) => {
    navigate(`/learning/${courseId}/${id}`);
  };

  return (
    <div className="space-y-6 text-[#572000]">

      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">

        <Link
          to={`/course/${courseId}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#FF7600]"
        >
          <ArrowLeft size={17} />
          Back to Course Details
        </Link>

        {/* <span className="text-sm font-medium text-gray-500">
          {course.title}
        </span> */}

      </div>

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">
          {course.title} - Learning Classroom
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Continue your learning journey with AVPRF.
        </p>
      </div>

      {/* Progress */}
      <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold">
              Your Learning Progress
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {completedLessons.length} of {allLessons.length} lessons completed
            </p>
          </div>

          <span className="text-xl font-bold text-[#FF7600]">
            {progress}%
          </span>
        </div>

        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-orange-100">
          <div
            className="h-full rounded-full bg-[#FF7600] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

      {/* Main Learning Layout */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">

        {/* Left Content */}
        <div className="space-y-6 xl:col-span-2">

          {/* Video Player */}
          <section className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">

            {currentLesson.type === "video" ? (
              <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-[#2B1B12]">

                <div className="absolute inset-0 bg-gradient-to-br from-[#572000] via-[#3B2519] to-black" />

                <div className="relative z-10 flex flex-col items-center px-5 text-center text-white">

                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FF7600] text-white shadow-lg">
                    <PlayCircle size={42} />
                  </div>

                  <h2 className="mt-5 text-lg font-semibold md:text-xl">
                    {currentLesson.title}
                  </h2>

                  <p className="mt-2 text-sm text-orange-100">
                    Video lesson player
                  </p>

                  <span className="mt-4 rounded-full bg-white/10 px-4 py-2 text-xs text-white/80">
                    Video content will be connected here
                  </span>

                </div>
              </div>
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center bg-[#FFF8EF] p-6 text-center">

                <FileText size={65} className="text-[#FF7600]" />

                <h2 className="mt-4 text-xl font-bold">
                  {currentLesson.title}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  PDF study material will be displayed here.
                </p>

              </div>
            )}

            {/* Lesson Details */}
            <div className="p-5 md:p-6">

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#FF7600]">
                    {currentLesson.moduleTitle}
                  </span>

                  <h2 className="mt-2 text-xl font-bold">
                    {currentLesson.title}
                  </h2>
                </div>

                <span className="flex items-center gap-2 rounded-full bg-orange-50 px-3 py-2 text-xs font-medium text-[#FF7600]">
                  {currentLesson.type === "pdf" ? (
                    <FileText size={15} />
                  ) : (
                    <Video size={15} />
                  )}

                  {currentLesson.type === "pdf" ? "PDF Material" : "Video Lesson"}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">

                <span className="flex items-center gap-2">
                  <Clock3 size={15} />
                  {currentLesson.duration}
                </span>

                <span className="flex items-center gap-2">
                  <GraduationCap size={15} />
                  {course.instructor}
                </span>

              </div>

              <div className="my-5 border-t border-gray-100" />

              <h3 className="font-semibold">
                About This Lesson
              </h3>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                {currentLesson.description}
              </p>

              {/* Study Materials */}
              <div className="mt-6 rounded-xl border border-orange-100 bg-[#FFF8EF] p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#FF7600]">
                    <FileText size={22} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">
                      Lesson Study Material
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      PDF and reference materials
                    </p>
                  </div>

                </div>

                <p className="mt-3 text-xs text-gray-500">
                  Study materials will be available here once uploaded by the course administrator.
                </p>

              </div>

              {/* Completion Button */}
              <div className="mt-6">

                {isCompleted ? (
                  <span className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                    <CheckCircle2 size={18} />
                    Lesson Completed
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={markAsCompleted}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#79A91B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#689016]"
                  >
                    <Check size={18} />
                    Mark as Completed
                  </button>
                )}

              </div>

            </div>
          </section>

          {/* Previous and Next */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">

            {previousLesson ? (
              <button
                type="button"
                onClick={() => goToLesson(previousLesson.id)}
                className="inline-flex items-center gap-2 rounded-xl border border-orange-100 px-4 py-3 text-sm font-medium text-[#572000] hover:bg-orange-50"
              >
                <ArrowLeft size={17} />
                Previous Lesson
              </button>
            ) : (
              <span className="text-xs text-gray-400">
                First Lesson
              </span>
            )}

            {nextLesson ? (
              <button
                type="button"
                onClick={() => goToLesson(nextLesson.id)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white hover:bg-[#E96A00]"
              >
                Next Lesson
                <ArrowRight size={17} />
              </button>
            ) : (
              <span className="rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                Course Lessons Completed
              </span>
            )}

          </div>

        </div>

        {/* Right Sidebar */}
        <aside className="space-y-6">

          {/* Course Content */}
          <section className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">

            <div className="border-b border-orange-100 bg-[#FFF8EF] p-5">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#FF7600]">
                  <ListVideo size={23} />
                </div>

                <div>
                  <h2 className="font-bold">
                    Course Content
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    {course.modules.length} Modules • {allLessons.length} Lessons
                  </p>
                </div>
              </div>

            </div>

            <div className="max-h-[650px] overflow-y-auto p-3">

              {course.modules.map((module, index) => {

                const expanded = openModule === module.id;

                const moduleCompleted = module.lessons.filter(
                  (lesson) => completedLessons.includes(lesson.id)
                ).length;

                return (
                  <div
                    key={module.id}
                    className="mb-3 overflow-hidden rounded-xl border border-orange-100"
                  >

                    <button
                      type="button"
                      onClick={() => toggleModule(module.id)}
                      className="flex w-full items-center justify-between gap-2 bg-[#FFF8EF] p-4 text-left hover:bg-orange-50"
                    >

                      <div className="flex items-center gap-3">

                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-[#FF7600]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div>
                          <h3 className="text-sm font-semibold">
                            {module.title}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            {moduleCompleted}/{module.lessons.length} Completed
                          </p>
                        </div>

                      </div>

                      {expanded ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}

                    </button>

                    {expanded && (
                      <div className="divide-y divide-gray-100">

                        {module.lessons.map((lesson) => {

                          const active =
                            currentLesson.id === lesson.id;

                          const completed =
                            completedLessons.includes(lesson.id);

                          return (
                            <button
                              key={lesson.id}
                              type="button"
                              onClick={() => goToLesson(lesson.id)}
                              className={`flex w-full items-center gap-3 p-3 text-left transition ${
                                active
                                  ? "bg-orange-50"
                                  : "bg-white hover:bg-gray-50"
                              }`}
                            >

                              <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                  active
                                    ? "bg-[#FF7600] text-white"
                                    : "bg-orange-50 text-[#FF7600]"
                                }`}
                              >
                                {lesson.type === "pdf" ? (
                                  <FileText size={17} />
                                ) : (
                                  <PlayCircle size={17} />
                                )}
                              </span>

                              <span className="min-w-0 flex-1">

                                <span
                                  className={`block text-xs font-medium leading-5 ${
                                    active
                                      ? "text-[#FF7600]"
                                      : "text-[#572000]"
                                  }`}
                                >
                                  {lesson.title}
                                </span>

                                <span className="mt-1 block text-[11px] text-gray-400">
                                  {lesson.duration}
                                </span>

                              </span>

                              {completed && (
                                <CheckCircle2
                                  size={17}
                                  className="shrink-0 text-[#79A91B]"
                                />
                              )}

                            </button>
                          );
                        })}

                      </div>
                    )}

                  </div>
                );
              })}

            </div>

            {/* Progress Footer */}
            <div className="border-t border-orange-100 bg-[#FFF8EF] p-4">

              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-gray-500">
                  Overall Progress
                </span>

                <span className="font-bold text-[#FF7600]">
                  {progress}%
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-orange-100">
                <div
                  className="h-full rounded-full bg-[#FF7600]"
                  style={{ width: `${progress}%` }}
                />
              </div>

            </div>

          </section>

          {/* LIVE CHAT */}
          <LiveChatPanel />

        </aside>

      </div>
    </div>
  );
}

export default Learning;