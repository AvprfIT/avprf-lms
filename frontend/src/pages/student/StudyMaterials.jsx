import { useMemo, useState } from "react";
import {
  Search,
  BookOpen,
  FileText,
  Video,
  Download,
  Eye,
  Filter,
  FolderOpen,
  File,
  Clock3,
  GraduationCap,
  X,
} from "lucide-react";

// Sample study material data
const materialsData = [
  {
    id: 1,
    title: "Introduction to Ayurveda",
    course: "Advanced Clinical Ayurveda",
    category: "Textbook",
    type: "PDF",
    size: "2.5 MB",
    date: "Nov 05, 2026",
    description: "Introduction and fundamental concepts of Ayurveda.",
    fileUrl: "/materials/introduction-to-ayurveda.pdf",
  },
  {
    id: 2,
    title: "Clinical Assessment Notes",
    course: "Advanced Clinical Ayurveda",
    category: "Study Notes",
    type: "PDF",
    size: "1.8 MB",
    date: "Nov 06, 2026",
    description: "Clinical assessment methods and reference notes.",
    fileUrl: "/materials/clinical-assessment-notes.pdf",
  },
  {
    id: 3,
    title: "Ayurveda Clinical Practice",
    course: "Advanced Clinical Ayurveda",
    category: "Reference",
    type: "PDF",
    size: "4.2 MB",
    date: "Nov 07, 2026",
    description: "Additional clinical practice reference material.",
    fileUrl: "/materials/ayurveda-clinical-practice.pdf",
  },
  {
    id: 4,
    title: "Marma Therapy Fundamentals",
    course: "Advanced Clinical Course - Marma Therapy",
    category: "Textbook",
    type: "PDF",
    size: "3.1 MB",
    date: "Nov 08, 2026",
    description: "Fundamentals and introduction to Marma Therapy.",
    fileUrl: "/materials/marma-therapy-fundamentals.pdf",
  },
  {
    id: 5,
    title: "Marma Therapy Practical Guide",
    course: "Advanced Clinical Course - Marma Therapy",
    category: "Study Notes",
    type: "PDF",
    size: "2.2 MB",
    date: "Nov 09, 2026",
    description: "Practical learning guide for Marma Therapy.",
    fileUrl: "/materials/marma-therapy-practical-guide.pdf",
  },
  {
    id: 6,
    title: "Basic Ayurveda Principles",
    course: "Basic Ayurveda Course",
    category: "Textbook",
    type: "PDF",
    size: "3.5 MB",
    date: "Nov 10, 2026",
    description: "Basic principles and concepts of Ayurveda.",
    fileUrl: "/materials/basic-ayurveda-principles.pdf",
  },
];

const categories = [
  "All Materials",
  "Textbook",
  "Study Notes",
  "Reference",
  "Video",
];

function StudyMaterials() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All Materials");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [previewMaterial, setPreviewMaterial] = useState(null);

  const courses = [
    "All Courses",
    ...new Set(materialsData.map((item) => item.course)),
  ];

  const filteredMaterials = useMemo(() => {
    return materialsData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Materials" ||
        item.category === selectedCategory ||
        item.type === selectedCategory;

      const matchesCourse =
        selectedCourse === "All Courses" ||
        item.course === selectedCourse;

      return matchesSearch && matchesCategory && matchesCourse;
    });
  }, [searchTerm, selectedCategory, selectedCourse]);

  const handleDownload = (material) => {
    // Replace with the actual uploaded file URL when available.
    alert("Please upload the actual PDF file and update its fileUrl.");
  };

  const getMaterialIcon = (type) => {
    if (type === "Video") return Video;
    if (type === "PDF") return FileText;
    return File;
  };

  const stats = [
    {
      title: "Total Materials",
      value: materialsData.length,
      icon: FolderOpen,
    },
    {
      title: "Textbooks",
      value: materialsData.filter((item) => item.category === "Textbook").length,
      icon: BookOpen,
    },
    {
      title: "Study Notes",
      value: materialsData.filter((item) => item.category === "Study Notes").length,
      icon: FileText,
    },
    {
      title: "Video Resources",
      value: materialsData.filter((item) => item.type === "Video").length,
      icon: Video,
    },
  ];

  return (
    <div className="space-y-6 text-[#572000]">

      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">
            Study Materials
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Access your course textbooks, notes and learning resources.
          </p>
        </div>

    
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#FF7600]">
                <Icon size={22} />
              </div>

              <p className="mt-4 text-xs text-gray-500">
                {item.title}
              </p>

              <h3 className="mt-1 text-2xl font-bold">
                {item.value}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <section className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Search */}
          <div className="relative md:col-span-2">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search materials, textbooks or notes..."
              className="w-full rounded-xl border border-orange-100 bg-[#FFF8EF] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#FF7600] focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Course Filter */}
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full rounded-xl border border-orange-100 bg-[#FFF8EF] px-4 py-3 text-sm outline-none focus:border-[#FF7600]"
          >
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Filter size={17} className="mr-1 text-gray-400" />

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                selectedCategory === category
                  ? "bg-[#FF7600] text-white"
                  : "bg-orange-50 text-[#572000] hover:bg-orange-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Materials List */}
      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold">
              Available Materials
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              {filteredMaterials.length} learning resources found
            </p>
          </div>
        </div>

        {filteredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredMaterials.map((material) => {
              const Icon = getMaterialIcon(material.type);

              return (
                <div
                  key={material.id}
                  className="group rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-[#FF7600]">
                      <Icon size={28} />
                    </div>

                    <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-[#FF7600]">
                      {material.category}
                    </span>
                  </div>

                  {/* Material Information */}
                  <div className="mt-5">
                    <h3 className="line-clamp-2 text-base font-bold leading-6">
                      {material.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                      {material.description}
                    </p>
                  </div>

                  {/* Course */}
                  <div className="mt-4 flex items-start gap-2 text-xs text-gray-500">
                    <GraduationCap
                      size={16}
                      className="shrink-0 text-[#FF7600]"
                    />
                    <span className="line-clamp-2">
                      {material.course}
                    </span>
                  </div>

                  {/* File Information */}
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <File size={14} />
                      {material.type} • {material.size}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock3 size={13} />
                      {material.date}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setPreviewMaterial(material)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-orange-200 px-3 py-3 text-sm font-semibold text-[#572000] transition hover:bg-orange-50"
                    >
                      <Eye size={17} />
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownload(material)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#FF7600] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#E96A00]"
                    >
                      <Download size={17} />
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-orange-200 bg-white px-5 py-16 text-center">
            <FolderOpen
              size={48}
              className="mx-auto text-orange-300"
            />

            <h3 className="mt-4 text-lg font-semibold">
              No Materials Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or filter options.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All Materials");
                setSelectedCourse("All Courses");
              }}
              className="mt-5 rounded-xl bg-[#FF7600] px-5 py-3 text-sm font-semibold text-white"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Preview Modal */}
      {previewMaterial && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setPreviewMaterial(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#FF7600]">
                  <FileText size={24} />
                </div>

                <div>
                  <h2 className="font-bold">
                    Material Preview
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    {previewMaterial.type} • {previewMaterial.size}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPreviewMaterial(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-orange-50"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 rounded-xl bg-[#FFF8EF] p-5">
              <h3 className="font-semibold">
                {previewMaterial.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {previewMaterial.description}
              </p>

              <p className="mt-4 text-xs text-gray-500">
                Course: {previewMaterial.course}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Uploaded: {previewMaterial.date}
              </p>
            </div>

            <p className="mt-4 text-xs leading-5 text-gray-400">
              Actual document preview will be available after the PDF file is uploaded and connected.
            </p>

            <button
              type="button"
              onClick={() => setPreviewMaterial(null)}
              className="mt-5 w-full rounded-xl bg-[#FF7600] py-3 text-sm font-semibold text-white hover:bg-[#E96A00]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyMaterials;