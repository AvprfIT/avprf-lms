import {
  Upload,
  Image as ImageIcon,
  X,
  CirclePlus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const categories = [
  "Basic Course",
  "Advanced Course",
  "Clinical Course",
  "Certificate Course",
  "Workshop",
  "Internship",
];

// Temporary UI data. Replace this with faculty records fetched from your API.
const facultyList = [
  { id: 1, name: "Dr. Arun Kumar", specialization: "Ayurveda Physician" },
  { id: 2, name: "Dr. Priya", specialization: "Panchakarma" },
  { id: 3, name: "Dr. Rahul", specialization: "Clinical Ayurveda" },
  { id: 4, name: "Dr. Meena", specialization: "Marma Therapy" },
];

const emptyCourse = {
  course_title: "",
  slug: "",
  category: "Basic Course",
  duration: "",
  eligibility: "",
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

const toDateInput = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value.slice(0, 10);
  return "";
};

export default function CourseForm({
  initialData,
  mode = "add",
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(() => ({
    ...emptyCourse,
    ...initialData,
    course_title:
      initialData?.course_title ?? initialData?.title ?? "",
    fee_type: (
      initialData?.fee_type ??
      (initialData?.feeType === "Paid" ? "paid" : "free")
    ).toLowerCase(),
    status: (initialData?.status ?? "draft").toLowerCase(),
    fee: String(initialData?.fee ?? 0),
    start_date: toDateInput(initialData?.start_date),
    end_date: toDateInput(initialData?.end_date),
    assignedFaculty: Array.isArray(initialData?.assignedFaculty)
      ? initialData.assignedFaculty.map(Number)
      : initialData?.assignedFaculty
        ? [Number(initialData.assignedFaculty)]
        : [],
  }));

  const [imagePreview, setImagePreview] = useState(
    initialData?.image || ""
  );
  const [imageFile, setImageFile] = useState(null);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    const editorElement = editorRef.current;
    if (!editorElement) return undefined;

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

    const initialDescription = initialData?.description || "";
    if (initialDescription) {
      quill.clipboard.dangerouslyPasteHTML(initialDescription);
    }

    quill.on("text-change", () => {
      setForm((previous) => ({
        ...previous,
        description: quill.root.innerHTML,
      }));
    });

    return () => {
      quillRef.current = null;
      editorElement.innerHTML = "";
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "course_title" && !previous.slug
        ? { slug: makeSlug(value) }
        : {}),
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Please select a JPG, PNG or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview((previous) => {
      if (previous?.startsWith("blob:")) URL.revokeObjectURL(previous);
      return previewUrl;
    });
    setImageFile(file);
  };

  const removeImage = () => {
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview("");
    setImageFile(null);
    setForm((previous) => ({ ...previous, image: "" }));
  };

  const handleFeeTypeChange = (event) => {
    const feeType = event.target.value;
    setForm((previous) => ({
      ...previous,
      fee_type: feeType,
      fee: feeType === "free" ? "0" : "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const courseTitle = form.course_title.trim();
    if (!courseTitle) {
      alert("Please enter the course title.");
      return;
    }

    if (form.fee_type === "paid" && Number(form.fee) <= 0) {
      alert("Please enter a valid course fee.");
      return;
    }

    if (
      form.start_date &&
      form.end_date &&
      form.end_date < form.start_date
    ) {
      alert("End date cannot be earlier than start date.");
      return;
    }

    const description = quillRef.current
      ? quillRef.current.root.innerHTML
      : form.description;

    onSubmit?.({
      ...form,
      course_title: courseTitle,
      slug: form.slug || makeSlug(courseTitle),
      description,
      fee: form.fee_type === "free" ? "0" : String(form.fee),
      imageFile,
      assignedFaculty: form.assignedFaculty || [],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 overflow-y-auto p-5 sm:p-7"
    >
      {/* Course information */}
      <section>
        <SectionHeading title="Course Information" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="form-label">Course Title *</label>
            <input
              name="course_title"
              value={form.course_title}
              onChange={handleInputChange}
              placeholder="Enter course title"
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="form-label">Course Category</label>
            <select
              name="category"
              value={form.category || ""}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Course Duration</label>
            <input
              name="duration"
              value={form.duration || ""}
              onChange={handleInputChange}
              placeholder="Example: 30 Days"
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Eligibility</label>
            <input
              name="eligibility"
              value={form.eligibility || ""}
              onChange={handleInputChange}
              placeholder="Example: BAMS / Healthcare professionals"
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Language</label>
            <input
              name="language"
              value={form.language || ""}
              onChange={handleInputChange}
              placeholder="Example: English, Tamil"
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={form.start_date || ""}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">End Date</label>
            <input
              type="date"
              name="end_date"
              value={form.end_date || ""}
              min={form.start_date || undefined}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="md:col-span-2 mb-12">
            <label className="form-label">Course Description</label>
            <div ref={editorRef} className="bg-white" />
          </div>
        </div>
      </section>

      {/* Course image */}
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
                <X size={16} />
                Remove
              </button>
            )}

            <p className="mt-2 text-xs text-[#9B806C]">
              JPG, PNG or WEBP. Maximum size 5 MB.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty assignment */}
      <section>
        <SectionHeading title="Faculty Assignment" />

        <div>
          <label className="form-label">Assign Faculty</label>
          <select
            name="faculty_id"
            value={form.assignedFaculty?.[0] ?? ""}
            onChange={(event) => {
              const facultyId = event.target.value;
              setForm((previous) => ({
                ...previous,
                assignedFaculty: facultyId ? [Number(facultyId)] : [],
              }));
            }}
            className="form-input"
          >
            <option value="">Select Faculty</option>
            {facultyList.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {faculty.name} - {faculty.specialization}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Course status */}
      <section>
        <SectionHeading title="Course Status" />
        <select
          name="status"
          value={form.status}
          onChange={handleInputChange}
          className="form-input"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </section>

      {/* Course fee */}
      <section>
        <SectionHeading title="Course Fee" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="form-label">Course Type *</label>
            <select
              name="fee_type"
              value={form.fee_type}
              onChange={handleFeeTypeChange}
              className="form-input"
            >
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
                onChange={handleInputChange}
                placeholder="Enter course fee"
                className="form-input"
                required
              />
            </div>
          )}
        </div>
      </section>

      {/* Footer buttons */}
      <div className="flex flex-col-reverse justify-end gap-3 border-t border-[#F0E2D3] pt-5 sm:flex-row">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-[#EAD9C8] px-6 py-3 text-sm font-semibold text-[#572000] hover:bg-[#FFF8EF]"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-xl bg-[#FF7600] px-7 py-3 text-sm font-semibold text-white hover:bg-[#e96900]"
        >
          {mode === "add" ? "Create Course" : "Update Course"}
        </button>
      </div>
    </form>
  );
}

function SectionHeading({ title }) {
  return (
    <h3 className="mb-4 text-base font-bold text-[#572000]">
      {title}
    </h3>
  );
}