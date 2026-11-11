
import { useState } from "react";
import {
  Plus,
  Search,
  ClipboardList,
  Edit,
  Trash2,
  Eye,
  X,
  CheckCircle,
  BookOpen,
  ChevronDown,
} from "lucide-react";

const initialExams = [
  {
    id: 1,
    title: "Advanced Clinical Ayurveda - Final Exam",
    course: "Advanced Clinical Ayurveda",
  },
  {
    id: 2,
    title: "Marma Therapy - Assessment",
    course: "Advanced Clinical Course - Marma Therapy",
  },
  {
    id: 3,
    title: "Basic Ayurveda - Module Test",
    course: "Basic Ayurveda Course",
  },
];

const sampleQuestions = [
  {
    id: 1,
    examId: 1,
    question: "Which dosha is primarily associated with movement in Ayurveda?",
    options: ["Vata", "Pitta", "Kapha", "Rakta"],
    correctAnswer: 0,
    marks: 1,
    explanation: "Vata is associated with movement and physiological activities.",
  },
  {
    id: 2,
    examId: 1,
    question: "Which of the following is known as the digestive fire?",
    options: ["Ojas", "Agni", "Dhatu", "Mala"],
    correctAnswer: 1,
    marks: 1,
    explanation: "Agni represents the digestive and metabolic fire.",
  },
  {
    id: 3,
    examId: 1,
    question: "How many primary doshas are described in Ayurveda?",
    options: ["Two", "Three", "Four", "Five"],
    correctAnswer: 1,
    marks: 1,
    explanation: "The three doshas are Vata, Pitta and Kapha.",
  },
];

const emptyQuestion = {
  question: "",
  options: ["", "", "", ""],
  correctAnswer: 0,
  marks: 1,
  explanation: "",
};

export default function ExamQuestions() {
  const [exams] = useState(initialExams);
  const [selectedExam, setSelectedExam] = useState("1");
  const [questions, setQuestions] = useState(sampleQuestions);
  const [form, setForm] = useState(emptyQuestion);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [previewQuestion, setPreviewQuestion] = useState(null);
  const [search, setSearch] = useState("");

  const currentQuestions = questions.filter(
    (q) => String(q.examId) === selectedExam
  );

  const filteredQuestions = currentQuestions.filter((q) =>
    q.question.toLowerCase().includes(search.toLowerCase())
  );

  const selectedExamData = exams.find(
    (exam) => String(exam.id) === selectedExam
  );

  const totalMarks = currentQuestions.reduce(
    (sum, q) => sum + Number(q.marks),
    0
  );

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyQuestion);
    setShowModal(true);
  };

  const openEditModal = (question) => {
    setEditingId(question.id);
    setForm({
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      marks: question.marks,
      explanation: question.explanation || "",
    });
    setShowModal(true);
  };

  const updateOption = (index, value) => {
    setForm((prev) => ({
      ...prev,
      options: prev.options.map((option, i) =>
        i === index ? value : option
      ),
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!form.question.trim()) {
      alert("Please enter the question.");
      return;
    }

    if (form.options.some((option) => !option.trim())) {
      alert("Please fill all four options.");
      return;
    }

    if (Number(form.marks) <= 0) {
      alert("Marks must be greater than zero.");
      return;
    }

    if (editingId) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === editingId
            ? {
                ...q,
                ...form,
                marks: Number(form.marks),
                correctAnswer: Number(form.correctAnswer),
              }
            : q
        )
      );
    } else {
      const newQuestion = {
        id: Date.now(),
        examId: Number(selectedExam),
        ...form,
        marks: Number(form.marks),
        correctAnswer: Number(form.correctAnswer),
      };

      setQuestions((prev) => [...prev, newQuestion]);
    }

    setShowModal(false);
    setEditingId(null);
    setForm(emptyQuestion);
  };

  const deleteQuestion = (id) => {
    if (window.confirm("Delete this question?")) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  return (
    <div className="space-y-6">

      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#572000]">
            Question Management
          </h1>
          <p className="mt-1 text-sm text-[#8B6B55]">
            Add and manage questions for your examinations.
          </p>
        </div>

        
      </div>

      {/* Select Examination */}
      <div className="rounded-2xl border border-[#F0E1D1] bg-white p-5">
        <label className="mb-2 block text-sm font-semibold text-[#572000]">
          Select Examination
        </label>

        <select
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          className="w-full rounded-xl border border-[#EAD9C8] bg-white px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
        >
          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.title}
            </option>
          ))}
        </select>

        {selectedExamData && (
          <div className="mt-3 flex items-center gap-2 text-sm text-[#8B6B55]">
            <BookOpen size={16} className="text-[#FF7600]" />
            {selectedExamData.course}
          </div>
        )}
        
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[#F0E1D1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#8B6B55]">Total Questions</p>
              <h2 className="mt-2 text-2xl font-bold text-[#572000]">
                {currentQuestions.length}
              </h2>
            </div>
            <ClipboardList className="text-[#FF7600]" size={25} />
          </div>
        </div>

        <div className="rounded-2xl border border-[#F0E1D1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#8B6B55]">Total Marks</p>
              <h2 className="mt-2 text-2xl font-bold text-[#572000]">
                {totalMarks}
              </h2>
            </div>
            <CheckCircle className="text-[#79A91B]" size={25} />
          </div>
        </div>

        <div className="rounded-2xl border border-[#F0E1D1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#8B6B55]">Question Type</p>
              <h2 className="mt-2 text-lg font-bold text-[#572000]">
                Multiple Choice
              </h2>
            </div>
            <BookOpen className="text-[#FF7600]" size={25} />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A68B76]"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions..."
          className="w-full rounded-xl border border-[#EAD9C8] bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[#FF7600]"
        />
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {filteredQuestions.map((question, index) => (
          <div
            key={question.id}
            className="rounded-2xl border border-[#F0E1D1] bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-[#FFF3E5] px-3 py-1 text-xs font-semibold text-[#8B2E00]">
                    Question {index + 1}
                  </span>

                  <span className="rounded-lg bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    {question.marks} Mark(s)
                  </span>
                </div>

                <h3 className="mt-3 font-semibold text-[#572000]">
                  {question.question}
                </h3>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`rounded-xl border p-3 text-sm ${
                        optionIndex === question.correctAnswer
                          ? "border-green-300 bg-green-50 text-green-800"
                          : "border-[#F0E1D1] bg-[#FFF8EF] text-[#795D48]"
                      }`}
                    >
                      <span className="mr-2 font-semibold">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>
                      {option}

                      {optionIndex === question.correctAnswer && (
                        <CheckCircle
                          size={15}
                          className="ml-2 inline text-green-600"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewQuestion(question)}
                  title="Preview"
                  className="rounded-lg border border-[#EAD9C8] p-2 text-[#572000] hover:bg-[#FFF3E5]"
                >
                  <Eye size={17} />
                </button>

                <button
                  onClick={() => openEditModal(question)}
                  title="Edit"
                  className="rounded-lg border border-[#EAD9C8] p-2 text-[#572000] hover:bg-[#FFF3E5]"
                >
                  <Edit size={17} />
                </button>

                <button
                  onClick={() => deleteQuestion(question.id)}
                  title="Delete"
                  className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredQuestions.length === 0 && (
          <div className="rounded-2xl border border-[#F0E1D1] bg-white p-10 text-center">
            <ClipboardList size={35} className="mx-auto text-[#D2B69D]" />
            <h3 className="mt-3 font-semibold text-[#572000]">
              No questions added
            </h3>
            <p className="mt-1 text-sm text-[#8B6B55]">
              Click Add Question to create your first question.
            </p>
          </div>
        )}
      </div>

      {/* Add / Edit Question Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">

            <div className="flex items-center justify-between border-b border-[#F0E1D1] p-5">
              <div>
                <h2 className="text-xl font-bold text-[#572000]">
                  {editingId ? "Edit Question" : "Add New Question"}
                </h2>
                <p className="mt-1 text-sm text-[#8B6B55]">
                  Enter the question and answer options.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-[#8B6B55] hover:bg-[#FFF3E5]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 p-5">

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#572000]">
                  Question *
                </label>
                <textarea
                  rows={3}
                  value={form.question}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      question: e.target.value,
                    }))
                  }
                  required
                  placeholder="Enter your question..."
                  className="w-full rounded-xl border border-[#EAD9C8] px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
                />
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-semibold text-[#572000]">
                    Answer Options *
                  </label>
                  <span className="text-xs text-[#8B6B55]">
                    Select the correct answer
                  </span>
                </div>

                <div className="space-y-3">
                  {form.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={Number(form.correctAnswer) === index}
                        onChange={() =>
                          setForm((prev) => ({
                            ...prev,
                            correctAnswer: index,
                          }))
                        }
                        className="h-4 w-4 accent-[#FF7600]"
                      />

                      <span className="w-6 text-sm font-semibold text-[#8B6B55]">
                        {String.fromCharCode(65 + index)}.
                      </span>

                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          updateOption(index, e.target.value)
                        }
                        required
                        placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
                        className="min-w-0 flex-1 rounded-xl border border-[#EAD9C8] px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#572000]">
                  Marks *
                </label>
                <input
                  type="number"
                  min="1"
                  value={form.marks}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      marks: e.target.value,
                    }))
                  }
                  required
                  className="w-full rounded-xl border border-[#EAD9C8] px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#572000]">
                  Explanation (Optional)
                </label>
                <textarea
                  rows={2}
                  value={form.explanation}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      explanation: e.target.value,
                    }))
                  }
                  placeholder="Explain why this answer is correct..."
                  className="w-full rounded-xl border border-[#EAD9C8] px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
                />
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
                  {editingId ? "Update Question" : "Save Question"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#572000]">
                Question Preview
              </h2>
              <button
                onClick={() => setPreviewQuestion(null)}
                className="rounded-lg p-2 hover:bg-[#FFF3E5]"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-5 font-semibold text-[#572000]">
              {previewQuestion.question}
            </p>

            <div className="mt-4 space-y-2">
              {previewQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-[#EAD9C8] p-3 text-sm"
                >
                  {String.fromCharCode(65 + index)}. {option}
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-[#8B6B55]">
              Marks: {previewQuestion.marks}
            </p>

            <button
              onClick={() => setPreviewQuestion(null)}
              className="mt-5 w-full rounded-xl bg-[#FF7600] py-3 text-sm font-semibold text-white"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
