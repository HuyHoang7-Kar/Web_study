import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Menu from "./components/normal_users/Menu";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/Forgotpassword";
import HomeTab from "./components/normal_users/Tabs/HomeTab";
import Home1 from "./components/normal_users/Tabs/Home/Home1";
import Home2 from "./components/normal_users/Tabs/Home/Home2";
import Home3 from "./components/normal_users/Tabs/Home/Home3";
import IntroTab from "./components/normal_users/Tabs/IntroTab";
import CoursesTab from "./components/normal_users/Tabs/CoursesTab";
import TeachersTab from "./components/normal_users/Tabs/TeachersTab";
import Register from "./components/auth/Register";
import MediaCoverageTab from "./components/normal_users/Tabs/MediaCoverageTab";
import ParentsCornerTab from "./components/normal_users/Tabs/ParentsCornerTab";
import RegistrationTab from "./components/normal_users/Tabs/RegistrationTab";
import ContactTab from "./components/normal_users/Tabs/ContactTab";

import StudentMenu from "./components/student/StudentMenu";
import StudentHomeTab from "./components/student/Tabs/StudentHomeTab";
import StudentHome1 from "./components/student/Tabs/StudentHome/StudentHome1Tab";
import StudentHome2 from "./components/student/Tabs/StudentHome/StudentHome2Tab";
import StudentHome3 from "./components/student/Tabs/StudentHome/StudentHome3Tab";
import StudentIntroTab from "./components/student/Tabs/StudentIntroTab";
import StudentCoursesTab from "./components/student/Tabs/StudentCoursesTab";
import StudentDocsTab from "./components/student/Tabs/StudentDocsTab";
import StudentForumTab from "./components/student/Tabs/StudentForumTab";
import StudentSupportTab from "./components/student/Tabs/StudentSupportTab";
import StudentContactTab from "./components/student/Tabs/StudentContactTab";
import StudentHomeworkTab from "./components/student/Tabs/StudentHomeworkTab";
// Thêm import cho StudentSettingAccount
import StudentSettingAccount from "./components/student/Tabs/StudentSettingAccount";

import TeacherMenu from "./components/teacher/TeacherMenu";
import TeacherHomeTab from "./components/teacher/Tabs/TeacherHomeTab";
import TeacherHome1 from "./components/teacher/Tabs/TeacherHome/TeacherHome1Tab";
import TeacherHome2 from "./components/teacher/Tabs/TeacherHome/TeacherHome2Tab";
import TeacherHome3 from "./components/teacher/Tabs/TeacherHome/TeacherHome3Tab";
import TeacherIntroTab from "./components/teacher/Tabs/TeacherIntroTab";
import TeacherCoursesTab from "./components/teacher/Tabs/TeacherCoursesTab";
import TeacherDocsTab from "./components/teacher/Tabs/TeacherDocsTab";
import TeacherForumTab from "./components/teacher/Tabs/TeacherForumTab";
import TeacherSupportTab from "./components/teacher/Tabs/TeacherSupportTab";
import TeacherHomeworkTab from "./components/teacher/Tabs/TeacherHomeworkTab";
import TeacherContactTab from "./components/teacher/Tabs/TeacherContactTab";

// Layout cho từng nhóm người dùng
function NormalUserLayout({ children }) {
  return (
    <>
      <Menu />
      {children}
    </>
  );
}

function StudentLayout({ children }) {
  return (
    <>
      <StudentMenu />
      {children}
    </>
  );
}

function TeacherLayout({ children }) {
  return (
    <>
      <TeacherMenu />
      {children}
    </>
  );
}

// Handler cho đăng nhập và quên mật khẩu
function LoginHandler({ setUserRole }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isPasswordReset = localStorage.getItem("passwordReset") === "true";
    if (isPasswordReset) {
      localStorage.removeItem("passwordReset");
      navigate("/", { replace: true }); // Ngăn người dùng quay lại ForgotPassword
    }
  }, [navigate]);

  const handleLoginSuccess = (role) => {
    console.log("DEBUG: Role nhận từ API:", role);
    if (!role) return;

    setUserRole(role);
    localStorage.setItem("userRole", role);

    // Điều hướng dựa trên vai trò
    switch (role) {
      case "student":
        navigate("/student", { replace: true });
        break;
      case "teacher":
        navigate("/teacher", { replace: true });
        break;
      case "admin":
        navigate("/admin", { replace: true });
        break;
      default:
        navigate("/", { replace: true });
        break;
    }
  };

  return <Login onLoginSuccess={handleLoginSuccess} />;
}

function ForgotPasswordHandler() {
  const handlePasswordResetSuccess = () => {
    localStorage.setItem("passwordReset", "true");
    window.history.replaceState(null, "", "/login");
  };

  return <ForgotPassword onResetSuccess={handlePasswordResetSuccess} />;
}

function App() {
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null
  );

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Normal Users Routes */}
        <Route
          path="/"
          element={
            <NormalUserLayout>
              <HomeTab />
            </NormalUserLayout>
          }
        />
        <Route
          path="/home1"
          element={
            <NormalUserLayout>
              <Home1 />
            </NormalUserLayout>
          }
        />
        <Route
          path="/home2"
          element={
            <NormalUserLayout>
              <Home2 />
            </NormalUserLayout>
          }
        />
        <Route
          path="/home3"
          element={
            <NormalUserLayout>
              <Home3 />
            </NormalUserLayout>
          }
        />
        <Route
          path="/intro"
          element={
            <NormalUserLayout>
              <IntroTab />
            </NormalUserLayout>
          }
        />
        <Route
          path="/courses"
          element={
            <NormalUserLayout>
              <CoursesTab />
            </NormalUserLayout>
          }
        />
        <Route
          path="/teachers"
          element={
            <NormalUserLayout>
              <TeachersTab />
            </NormalUserLayout>
          }
        />
        <Route
          path="/media_coverage"
          element={
            <NormalUserLayout>
              <MediaCoverageTab />
            </NormalUserLayout>
          }
        />
        <Route
          path="/parents_corner"
          element={
            <NormalUserLayout>
              <ParentsCornerTab />
            </NormalUserLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <NormalUserLayout>
              <ContactTab />
            </NormalUserLayout>
          }
        />
        <Route
          path="/registration"
          element={
            <NormalUserLayout>
              <RegistrationTab />
            </NormalUserLayout>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <StudentLayout>
              <StudentHomeTab />
            </StudentLayout>
          }
        />
        <Route
          path="/studenthome1"
          element={
            <StudentLayout>
              <StudentHome1 />
            </StudentLayout>
          }
        />
        <Route
          path="/studenthome2"
          element={
            <StudentLayout>
              <StudentHome2 />
            </StudentLayout>
          }
        />
        <Route
          path="/studenthome3"
          element={
            <StudentLayout>
              <StudentHome3 />
            </StudentLayout>
          }
        />
        <Route
          path="/studentintro"
          element={
            <StudentLayout>
              <StudentIntroTab />
            </StudentLayout>
          }
        />
        <Route
          path="/studentcourses"
          element={
            <StudentLayout>
              <StudentCoursesTab />
            </StudentLayout>
          }
        />
        <Route
          path="/studentdocs"
          element={
            <StudentLayout>
              <StudentDocsTab />
            </StudentLayout>
          }
        />
        <Route
          path="/studentforum"
          element={
            <StudentLayout>
              <StudentForumTab />
            </StudentLayout>
          }
        />
        <Route
          path="/studentsupport"
          element={
            <StudentLayout>
              <StudentSupportTab />
            </StudentLayout>
          }
        />
        <Route
          path="/studentcontact"
          element={
            <StudentLayout>
              <StudentContactTab />
            </StudentLayout>
          }
        />
        <Route
          path="/studenthomework"
          element={
            <StudentLayout>
              <StudentHomeworkTab />
            </StudentLayout>
          }
        />
        {/* Student Setting Account Route */}
        <Route
          path="/studentsettings"
          element={
            <StudentLayout>
              <StudentSettingAccount />
            </StudentLayout>
          }
        />

        {/* Teacher Routes */}
        <Route
          path="/teacher"
          element={
            <TeacherLayout>
              <TeacherHomeTab />
            </TeacherLayout>
          }
        />
        <Route
          path="/teacherhome1"
          element={
            <TeacherLayout>
              <TeacherHome1 />
            </TeacherLayout>
          }
        />
        <Route
          path="/teacherhome2"
          element={
            <TeacherLayout>
              <TeacherHome2 />
            </TeacherLayout>
          }
        />
        <Route
          path="/teacherhome3"
          element={
            <TeacherLayout>
              <TeacherHome3 />
            </TeacherLayout>
          }
        />
        <Route
          path="/teacherintro"
          element={
            <TeacherLayout>
              <TeacherIntroTab />
            </TeacherLayout>
          }
        />
        <Route
          path="/teachercourses"
          element={
            <TeacherLayout>
              <TeacherCoursesTab />
            </TeacherLayout>
          }
        />
        <Route
          path="/teacherdocs"
          element={
            <TeacherLayout>
              <TeacherDocsTab />
            </TeacherLayout>
          }
        />
        <Route
          path="/teacherforum"
          element={
            <TeacherLayout>
              <TeacherForumTab />
            </TeacherLayout>
          }
        />
        <Route
          path="/teachersupport"
          element={
            <TeacherLayout>
              <TeacherSupportTab />
            </TeacherLayout>
          }
        />
        <Route
          path="/teachercontact"
          element={
            <TeacherLayout>
              <TeacherContactTab />
            </TeacherLayout>
          }
        />
        <Route
          path="/teacherhomework"
          element={
            <TeacherLayout>
              <TeacherHomeworkTab />
            </TeacherLayout>
          }
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={<LoginHandler setUserRole={setUserRole} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPasswordHandler />} />

        {/* Các route dành riêng cho vai trò, nếu muốn kiểm tra lại trạng thái đăng nhập */}
        <Route
          path="/studentmenu"
          element={
            userRole === "student" ? (
              <StudentMenu />
            ) : (
              <LoginHandler setUserRole={setUserRole} />
            )
          }
        />
        <Route
          path="/teachermenu"
          element={
            userRole === "teacher" ? (
              <TeacherMenu />
            ) : (
              <LoginHandler setUserRole={setUserRole} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
