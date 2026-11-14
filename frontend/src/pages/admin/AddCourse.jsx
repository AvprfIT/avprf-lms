import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import API from "../../api/axios";
import {
  Upload,
  Image as ImageIcon,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const categories = [
  "Basic Course",
  "Advanced Course",
  "Clinical Course",
  "Certificate Course",
  "Workshop",
  "Internship",
];

const emptyCourse = {
  course_title: "",
  slug: "",
  category: "",
  duration: "",
  eligibility: "",
  short_description:"",
  description: "",
  image: "",
  fee_type: "free",
  fee: "0",
  start_date: "",
  end_date: "",
  language: "",
  status: "draft",
  assignedFaculty: [],
};

const makeSlug = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function AddCourse() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ ...emptyCourse });
  const [facultyList, setFacultyList] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const imageInputRef = useRef(null);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // Load active faculty for the assignment dropdown.
  useEffect(() => {
    let isMounted = true;

    const fetchFaculty = async () => {
      try {
        const token =
          localStorage.getItem("userToken") ||
          sessionStorage.getItem("userToken");

        if (!token) {
          throw new Error("Admin login token was not found. Please log in again.");
        }

        const response = await API.get("/users/faculty", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (isMounted) {
          setFacultyList(
            Array.isArray(response.data.faculty) ? response.data.faculty.filter((faculty) => faculty.status === "active") : []
          );
        }
      } catch (error) {
        console.error("Faculty list error:", error);
        if (isMounted) {
          setToast({
            type: "error",
            message:
              error.response?.data?.message || "Unable to load faculty list.",
          });
        }
      }
    };

    fetchFaculty();

    return () => {
      isMounted = false;
    };
  }, []);

  // The cleanup also prevents duplicate toolbars in React StrictMode.
  useEffect(() => {
    const editorElement = editorRef.current;
    if (!editorElement) return undefined;

    const removeExistingToolbar = () => {
      const previous = editorElement.previousElementSibling;
      if (previous?.classList.contains("ql-toolbar")) {
        previous.remove();
      }
    };

    removeExistingToolbar();
    editorElement.innerHTML = "";

    const quill = new Quill(editorElement, {
      theme: "snow",
      placeholder: "Enter course description...",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link"],
          ["clean"],
        ],
      },
    });

    quillRef.current = quill;

    const handleTextChange = () => {
      setForm((previous) => ({
        ...previous,
        description: quill.getText().trim() ? quill.root.innerHTML : "",
      }));
    };

    quill.on("text-change", handleTextChange);

    return () => {
      quill.off("text-change", handleTextChange);
      removeExistingToolbar();
      quillRef.current = null;
      editorElement.innerHTML = "";
      editorElement.classList.remove("ql-container", "ql-snow");
    };
  }, []);

  // Automatically close toast notifications.
  useEffect(() => {
    if (!toast) return undefined;
    const timerId = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timerId);
  }, [toast]);

  const resetForm = () => {
    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setForm({ ...emptyCourse, assignedFaculty: [] });
    setImagePreview("");
    setImageFile(null)
    setErrors({});

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }

    if (quillRef.current) {
      quillRef.current.setText("");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "course_title" && !previous.slug
        ? { slug: makeSlug(value) }
        : {}),
    }));

    setErrors((previous) => ({ ...previous, [name]: "" }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setToast({ type: "error", message: "Please select a JPG, PNG or WEBP image." });
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setToast({ type: "error", message: "Image size must be less than 5 MB." });
      event.target.value = "";
      return;
    }

    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(URL.createObjectURL(file));
    setImageFile(file);
  };

  const removeImage = () => {
    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview("");
    setImageFile(null);
    setForm((previous) => ({ ...previous, image: "" }));
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleFeeTypeChange = (event) => {
    const feeType = event.target.value;
    setForm((previous) => ({
      ...previous,
      fee_type: feeType,
      fee: feeType === "free" ? "0" : "",
    }));
    setErrors((previous) => ({ ...previous, fee_type: "" }));
  };

  const handleFacultyChange = (event) => {
    const facultyId = event.target.value;
    setForm((previous) => ({
      ...previous,
      assignedFaculty: facultyId ? [Number(facultyId)] : [],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!form.course_title.trim()) newErrors.name = "Course title is required.";
    if (!form.category) newErrors.category = "Course category is required.";
    if (!form.duration.trim()) newErrors.duration = "Course duration is required.";
    if (!form.eligibility.trim()) newErrors.eligibility = "Eligibility is required.";
    if (!form.language.trim()) newErrors.language = "Language is required.";
    if (form.fee_type === "paid" && Number(form.fee) <= 0) {
      newErrors.fee_type = "Please enter a valid course fee.";
    }
    if (form.start_date && form.end_date && form.end_date < form.start_date) {
      newErrors.end_date = "End date cannot be earlier than start date.";
    }
    if (!form.assignedFaculty || form.assignedFaculty.length === 0) {
      newErrors.faculty_id = "Please select a faculty member.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (submitting) return;

    setSubmitting(true);

    try {
      const token =
        localStorage.getItem("userToken") ||
        sessionStorage.getItem("userToken");

      if (!token) {
        setToast({ type: "error", message: "Login session not found. Please log in again." });
        return;
      }

      const formData = new FormData();

      const description = quillRef.current
        ? (quillRef.current.getText().trim()
          ? quillRef.current.root.innerHTML
          : "")
        : form.description;

      formData.append("course_title", form.course_title);
      formData.append("slug", makeSlug(form.course_title));
      formData.append("category", form.category);
      formData.append("duration", form.duration);
      formData.append("eligibility", form.eligibility);
      formData.append("short_description", form.short_description);
      formData.append("description", description);
      formData.append("fee_type", form.fee_type);
      formData.append("fee", form.fee_type === "free" ? "0" : form.fee);
      formData.append("start_date", form.start_date);
      formData.append("end_date", form.end_date);
      formData.append("language", form.language.trim());
      formData.append("status", form.status);

      formData.append(
        "assignedFaculty",
        JSON.stringify(form.assignedFaculty)
      );

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await API.post("/courses", formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        })

      resetForm();
      setToast({ type: "success", message: "Course created successfully!" });

    } catch (error) {
      console.log(error);
      setToast({ type: "error", message: error.response?.data?.message || "Failed to create course." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#572000]">Add New Course</h1>
        <p className="mt-1 text-sm text-[#8B6B55]">
          Manage course information, syllabus and faculty.
        </p>
      </div>

      <div className="rounded-2xl border border-[#F0E2D3] bg-white shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto p-5 sm:p-7">
          {toast && (
            <div
              role="alert"
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
              <p className={`flex-1 text-sm font-semibold ${toast.type === "success" ? "text-green-700" : "text-red-700"}`}>
                {toast.message}
              </p>
              <button
                type="button"
                onClick={() => setToast(null)}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Close notification"
              >
                <X size={18} />
              </button>
            </div>
          )}

          <section>
            <SectionHeading title="Course Information" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="form-label">Course Title *</label>
                <input
                  name="course_title"
                  value={form.course_title}
                  onChange={handleChange}
                  placeholder="Enter course title"
                  className={`form-input ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <span className="mt-1 block text-xs text-red-500">{errors.name}</span>}
              </div>

              <div>
                <label className="form-label">Course Category *</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={`form-input ${errors.category ? "border-red-500" : ""}`}
                >
                  <option value="">Select category</option>
                  {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
                {errors.category && <span className="mt-1 block text-xs text-red-500">{errors.category}</span>}
              </div>

              <div>
                <label className="form-label">Course Duration *</label>
                <input name="duration" value={form.duration} onChange={handleChange} placeholder="Example: 30 Days" className={`form-input ${errors.duration ? "border-red-500" : ""}`} />
                {errors.duration && <span className="mt-1 block text-xs text-red-500">{errors.duration}</span>}
              </div>

              <div>
                <label className="form-label">Eligibility *</label>
                <input name="eligibility" value={form.eligibility} onChange={handleChange} placeholder="Example: BAMS / Healthcare professionals" className={`form-input ${errors.eligibility ? "border-red-500" : ""}`} />
                {errors.eligibility && <span className="mt-1 block text-xs text-red-500">{errors.eligibility}</span>}
              </div>

              <div>
                <label className="form-label">Language *</label>
                <input name="language" value={form.language} onChange={handleChange} placeholder="Example: English, Tamil" className={`form-input ${errors.language ? "border-red-500" : ""}`} />
                {errors.language && <span className="mt-1 block text-xs text-red-500">{errors.language}</span>}
              </div>

              <div>
                <label className="form-label">Start Date</label>
                <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="form-input" />
              </div>

              <div>
                <label className="form-label">End Date</label>
                <input type="date" name="end_date" value={form.end_date} min={form.start_date || undefined} onChange={handleChange} className={`form-input ${errors.end_date ? "border-red-500" : ""}`} />
                {errors.end_date && <span className="mt-1 block text-xs text-red-500">{errors.end_date}</span>}
              </div>

              <div>
                <label className="form-label">Assign Faculty</label>
                <select name="assignedFaculty[]" value={form.assignedFaculty[0] ?? ""} onChange={handleFacultyChange} className={`form-input ${errors.faculty_id ? "border-red-500" : ""}`}>
                  <option value="">Select Faculty</option>
                  {facultyList.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name}{faculty.specialization ? ` - ${faculty.specialization}` : ""}
                    </option>
                  ))}
                </select>
                {errors.faculty_id && <span className="mt-1 block text-xs text-red-500">{errors.faculty_id}</span>}
              </div>

              <div>
                <label className="form-label">Course Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="form-input">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>

              </div>

            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="form-label">Course Type *</label>
                <select name="fee_type" value={form.fee_type} onChange={handleFeeTypeChange} className="form-input">
                  <option value="free">Free Course</option>
                  <option value="paid">Paid Course</option>
                </select>
              </div>
              {form.fee_type === "paid" && (
                <div>
                  <label className="form-label">Course Fee (₹) *</label>
                  <input type="number" name="fee" min="1" step="0.01" value={form.fee} onChange={handleChange} placeholder="Enter course fee" className={`form-input ${errors.fee_type ? "border-red-500" : ""}`} required />
                  {errors.fee_type && <span className="mt-1 block text-xs text-red-500">{errors.fee_type}</span>}
                </div>
              )}
            </div>
             <div className="mt-3">
                <label className="form-label">Short Description</label>
                <textarea name="short_description" value={form.short_description} onChange={handleChange} className="form-input" rows={2}/>
              </div>
          </section>
        
          <section className="md:col-span-2 mb-4">
            <SectionHeading title="Course Description" />
            <div ref={editorRef} className="bg-white" />
          </section>
          <section>
            <SectionHeading title="Course Image" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#D9C3AF] bg-[#FFF8EF] sm:w-52">
                {imagePreview ? (
                  <img src={imagePreview} alt="Course preview" className="h-full w-full object-cover" />
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
                  <input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload} className="hidden" />
                </label>
                {imagePreview && (
                  <button type="button" onClick={removeImage} className="ml-2 inline-flex items-center gap-1 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">
                    <X size={16} /> Remove
                  </button>
                )}
                <p className="mt-2 text-xs text-[#9B806C]">JPG, PNG or WEBP. Maximum size 5 MB.</p>
                <p className="mt-1 text-xs text-amber-700">Image preview only — backend image upload is not connected yet.</p>
              </div>
            </div>
          </section>



          <div className="flex flex-col-reverse justify-end gap-3 border-t border-[#F0E2D3] pt-5 sm:flex-row">
            <button type="button" onClick={() => navigate("/admin/courses")} className="rounded-xl border border-[#EAD9C8] px-6 py-3 text-sm font-semibold text-[#572000] hover:bg-[#FFF8EF]">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="rounded-xl bg-[#FF7600] px-7 py-3 text-sm font-semibold text-white hover:bg-[#e96900] disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SectionHeading({ title }) {
  return <h3 className="mb-4 text-base font-bold text-[#572000]">{title}</h3>;
}