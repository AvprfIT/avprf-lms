// Local demo storage. Replace with API calls when backend is ready.
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

export const getCourses = () => {
  try {
    const saved = localStorage.getItem("avprf_admin_courses");
    return saved ? JSON.parse(saved) : initialCourses;
  } catch {
    return initialCourses;
  }
};

export const saveCourses = (courses) => {
  localStorage.setItem("avprf_admin_courses", JSON.stringify(courses));
};

export const getCourseById = (id) => getCourses().find((course) => String(course.id) === String(id));
