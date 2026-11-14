import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import API from "../../api/axios";
import DOMPurify from "dompurify";
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
  short_description: "",
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

// MySQL DATE values may arrive as ISO timestamps; convert them to YYYY-MM-DD.
const toDateInput = (value) => {
  if (!value) return "";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

const getToken = () =>
  localStorage.getItem("userToken") || sessionStorage.getItem("userToken");

export default function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({ ...emptyCourse });
  const [facultyList, setFacultyList] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const imageInputRef = useRef(null);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // Initialize Quill once. Remove its toolbar when React StrictMode cleans up.
  useEffect(() => {
  if (loading || !editorRef.current) return;

  const editorElement = editorRef.current;

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

  // Load existing course description
  const savedDescription = editorElement.dataset.description;

  if (savedDescription) {
    quill.clipboard.dangerouslyPasteHTML(
      DOMPurify.sanitize(savedDescription)
    );
  }

  const handleTextChange = () => {
    setForm((previous) => ({
      ...previous,
      description: quill.getText().trim()
        ? quill.root.innerHTML
        : "",
    }));
  };

  quill.on("text-change", handleTextChange);

  return () => {
    quill.off("text-change", handleTextChange);

    const toolbar = editorElement.previousElementSibling;

    if (toolbar?.classList.contains("ql-toolbar")) {
      toolbar.remove();
    }

    quillRef.current = null;
    editorElement.innerHTML = "";
    editorElement.classList.remove("ql-container", "ql-snow");
  };
}, [loading]);

  // Load faculty and the selected course.
  useEffect(() => {
    let isMounted = true;

    const loadPageData = async () => {
      try {
        const token = getToken();
        if (!token) throw new Error("Login session not found. Please log in again.");
        if (!id) throw new Error("Course ID is missing from the page URL.");

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const [facultyResponse, courseResponse] = await Promise.all([
          API.get("/users/faculty", config),
          API.get(`/courses/${id}`, config),
        ]);

        if (!isMounted) return;

        setFacultyList(
          Array.isArray(facultyResponse.data.faculty)
            ? facultyResponse.data.faculty.filter((faculty) => faculty.status === "active")
            : []
        );

        const course = courseResponse.data.course;
        if (!course) throw new Error("Course details were not returned by the server.");

        const loadedForm = {
          course_title: course.course_title || "",
          slug: course.slug || "",
          category: course.category || "",
          duration: course.duration || "",
          eligibility: course.eligibility || "",
          short_description: course.short_description || "",
          description: course.description || "",
          image: course.image || "",
          fee_type: course.fee_type || "free",
          fee: String(course.fee ?? 0),
          start_date: toDateInput(course.start_date),
          end_date: toDateInput(course.end_date),
          language: course.language || "",
          status: course.status || "draft",
          assignedFaculty: Array.isArray(course.assignedFaculty)
            ? course.assignedFaculty.map(Number)
            : [],
        };

        setForm(loadedForm);
        setImagePreview(loadedForm.image);

        // Quill is initialized by the effect above before the API response arrives.
        if (quillRef.current && loadedForm.description) {
          quillRef.current.clipboard.dangerouslyPasteHTML(loadedForm.description);
        }
      } catch (error) {
        console.error("Load course error:", error);
        if (isMounted) {
          setToast({
            type: "error",
            message: error.response?.data?.message || error.message || "Unable to load course.",
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPageData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!toast) return undefined;
    const timerId = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timerId);
  }, [toast]);

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

    if (imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    setImagePreview(URL.createObjectURL(file));
    setImageFile(file);
  };

  const removeImage = () => {
    if (imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    setImagePreview("");
    setImageFile(null);
    setForm((previous) => ({ ...previous, image: "" }));
    if (imageInputRef.current) imageInputRef.current.value = "";
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
    setErrors((previous) => ({ ...previous, faculty_id: "" }));
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
    if (!form.assignedFaculty.length) {
      newErrors.faculty_id = "Please select a faculty member.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;
    if (submitting) return;

    setSubmitting(true);

    try {
      const token = getToken();
      if (!token) throw new Error("Login session not found. Please log in again.");

      const formData = new FormData();
      const description = quillRef.current
        ? (quillRef.current.getText().trim() ? quillRef.current.root.innerHTML : "")
        : form.description;

      formData.append("course_title", form.course_title.trim());
      formData.append("slug", makeSlug(form.slug || form.course_title));
      formData.append("category", form.category);
      formData.append("duration", form.duration);
      formData.append("eligibility", form.eligibility);
      formData.append("short_description", form.short_description);
      formData.append("description", description);
      formData.append("fee_type", form.fee_type);
      formData.append("fee", form.fee_type === "free" ? "0" : String(form.fee));
      formData.append("start_date", form.start_date);
      formData.append("end_date", form.end_date);
      formData.append("language", form.language.trim());
      formData.append("status", form.status);
      formData.append("assignedFaculty", JSON.stringify(form.assignedFaculty));

      // New file replaces the old image; otherwise preserve the existing URL.
      if (imageFile) {
        formData.append("image", imageFile);
      } else {
        formData.append("image", form.image || "");
      }

      await API.put(`/courses/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setToast({ type: "success", message: "Course updated successfully!" });
     
    } catch (error) {
      console.error("Update course error:", error);
      setToast({
        type: "error",
        message: error.response?.data?.message || error.message || "Failed to update course.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#572000]">Edit Course</h1>
        <p className="mt-1 text-sm text-[#8B6B55]">
          Update course information, description, image and faculty.
        </p>
      </div>

      <div className="rounded-2xl border border-[#F0E2D3] bg-white shadow-sm">
        {loading ? (
          <div className="p-7 text-sm text-[#8B6B55]">Loading course details...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto p-5 sm:p-7">
            {toast && (
              <div
                role="alert"
                className={`fixed right-5 top-5 z-[100] flex min-w-[300px] items-center gap-3 rounded-xl border p-4 shadow-lg ${
                  toast.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                }`}
              >
                {toast.type === "success" ? (
                  <CheckCircle className="text-green-600" size={24} />
                ) : (
                  <AlertCircle className="text-red-600" size={24} />
                )}
                <p className="flex-1 text-sm font-semibold text-red-700">{toast.message}</p>
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
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && <span className="mt-1 block text-xs text-red-500">{errors.category}</span>}
                </div>

                <div>
                  <label className="form-label">Course Duration *</label>
                  <input
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="Example: 30 Days"
                    className={`form-input ${errors.duration ? "border-red-500" : ""}`}
                  />
                  {errors.duration && <span className="mt-1 block text-xs text-red-500">{errors.duration}</span>}
                </div>

                <div>
                  <label className="form-label">Eligibility *</label>
                  <input
                    name="eligibility"
                    value={form.eligibility}
                    onChange={handleChange}
                    placeholder="Example: BAMS / Healthcare professionals"
                    className={`form-input ${errors.eligibility ? "border-red-500" : ""}`}
                  />
                  {errors.eligibility && <span className="mt-1 block text-xs text-red-500">{errors.eligibility}</span>}
                </div>

                <div>
                  <label className="form-label">Language *</label>
                  <input
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    placeholder="Example: English, Tamil"
                    className={`form-input ${errors.language ? "border-red-500" : ""}`}
                  />
                  {errors.language && <span className="mt-1 block text-xs text-red-500">{errors.language}</span>}
                </div>

                <div>
                  <label className="form-label">Start Date</label>
                  <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="form-input" />
                </div>

                <div>
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    value={form.end_date}
                    min={form.start_date || undefined}
                    onChange={handleChange}
                    className={`form-input ${errors.end_date ? "border-red-500" : ""}`}
                  />
                  {errors.end_date && <span className="mt-1 block text-xs text-red-500">{errors.end_date}</span>}
                </div>

                <div>
                  <label className="form-label">Assign Faculty *</label>
                  <select
                    name="assignedFaculty"
                    value={form.assignedFaculty[0] ?? ""}
                    onChange={handleFacultyChange}
                    className={`form-input ${errors.faculty_id ? "border-red-500" : ""}`}
                  >
                    <option value="">Select Faculty</option>
                    {facultyList.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
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
                    <input
                      type="number"
                      name="fee"
                      min="1"
                      step="0.01"
                      value={form.fee}
                      onChange={handleChange}
                      placeholder="Enter course fee"
                      className={`form-input ${errors.fee_type ? "border-red-500" : ""}`}
                      required
                    />
                    {errors.fee_type && <span className="mt-1 block text-xs text-red-500">{errors.fee_type}</span>}
                  </div>
                )}
              </div>
              <div className="mt-3">
                <label className="form-label">Short Description</label>
                 <textarea
                    type="text"
                    name="short_description"
                    value={form.short_description}
                    onChange={handleChange}
                    className="form-input"
                    rows={2}
                  />
              </div>
            </section>

           <section className="mb-4">
              <SectionHeading title="Course Description" />

              <div
                ref={editorRef}
                data-description={form.description || ""}
                className="bg-white"
              />
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
                    Replace Image
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="ml-2 inline-flex items-center gap-1 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      <X size={16} /> Remove
                    </button>
                  )}
                  <p className="mt-2 text-xs text-[#9B806C]">JPG, PNG or WEBP. Maximum size 5 MB.</p>
                </div>
              </div>
            </section>

            <div className="flex flex-col-reverse justify-end gap-3 border-t border-[#F0E2D3] pt-5 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/admin/courses")}
                className="rounded-xl border border-[#EAD9C8] px-6 py-3 text-sm font-semibold text-[#572000] hover:bg-[#FFF8EF]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-[#FF7600] px-7 py-3 text-sm font-semibold text-white hover:bg-[#e96900] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Updating..." : "Update Course"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function SectionHeading({ title }) {
  return <h3 className="mb-4 text-base font-bold text-[#572000]">{title}</h3>;
}