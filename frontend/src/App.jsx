import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import StudentLogin from "./pages/auth/StudentLogin";
import StudentRegister from "./pages/auth/StudentRegister";
import Dashboard from "./pages/student/Dashboard";
import StudentLayout from "./layouts/StudentLayout"
import MyCourses from "./pages/student/MyCourses";
import CourseDetails from "./pages/student/CourseDetails";
import Learning from "./pages/student/Learning";
import StudyMaterials from "./pages/student/StudyMaterials"
import MyProgress from "./pages/student/MyProgress";
import Payment from "./pages/student/Payments";
import MyProfile from "./pages/student/MyProfile";
import FacultyLogin from "./pages/auth/FacultyLogin";
import FacultyLayout from "./layouts/FacultyLayout";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import FacultyCourses from "./pages/faculty/FacultyCourses";
import CourseContent from "./pages/faculty/CourseContent";
import FacultyMaterials from "./pages/faculty/FacultyMaterials";
import FacultyStudents from "./pages/faculty/FacultyStudents";
import FacultyStudentProgress from "./pages/faculty/FacultyStudentProgress";
import FacultyProfile from "./pages/faculty/FacultyProfile";
import FacultyExaminations from "./pages/faculty/FacultyExaminations";
import ExamQuestions from "./pages/faculty/ExamQuestions";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminFaculty from "./pages/admin/AdminFaculty";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminExaminations from "./pages/admin/AdminExaminations";
import AdminReports from "./pages/admin/AdminReports";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-register" element={<StudentRegister />} />       
        <Route path="/faculty-login" element={<FacultyLogin />} />

        {/* Student Dashboard Layout  */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<StudentLayout />}>
            {/* Dashboard Route */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="course/:courseId" element={<CourseDetails />} />
            <Route path="learning/:courseId/:lessonId" element={<Learning />} />
            <Route path="study-materials" element={<StudyMaterials />} />
            <Route path="my-progress" element={<MyProgress />} />
            <Route path="payments" element={<Payment />} />
            <Route path="profile" element={<MyProfile />} />
          </Route>
        </Route>

        {/* Faculty Portal */}
        <Route path="/faculty" element={<FacultyLayout />}>
          <Route path="dashboard" element={<FacultyDashboard />} />
          <Route path="courses" element={<FacultyCourses />} />
          <Route path="course-content" element={<CourseContent />} />
          <Route path="materials" element={<FacultyMaterials />} />
          <Route path="students" element={<FacultyStudents />} />
          <Route path="student-progress" element={<FacultyStudentProgress />} />
          <Route path="profile" element={<FacultyProfile />} />
          <Route path="examinations" element={<FacultyExaminations />} />
          <Route path="exam-questions" element={<ExamQuestions />} />
        </Route>

        {/* Admin Portal */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="faculty" element={<AdminFaculty />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="examinations" element={<AdminExaminations />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

        <Route path="*" element={<Navigate to="/student-login" />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;