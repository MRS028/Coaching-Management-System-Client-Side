import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Home/Home/HomeLayout";
import Home from "../Home/HomeMain/Home";
import Courses from "../Pages/Courses/Courses";
import AuthLayOut from "../Components/Auth/AuthLayOut/AuthLayOut";
import Login from "../Components/Auth/LoginPage/Login";
import SignUp from "../Components/Auth/SignUp/SignUp";
import CourseDetails from "../Pages/Courses/CourseDetails";
import DashBoard from "../DashBoard/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AdminHome from "../DashBoard/Admin/Home/AdminHome";
import AddCourse from "../DashBoard/Admin/AddCourse/AddCourse";
import ManageCourses from "../DashBoard/Admin/ManageCourse/ManageCourses";
import ManageStudents from "../DashBoard/Admin/ManageUsers/ManageStudents";
import ManageTeachers from "../DashBoard/Admin/ManageTeachers/ManageTeachers";
import TeacherHome from "../DashBoard/Teacher/TeacherHome.jsx/Teacherhome";
import StudentHome from "../DashBoard/StudentDashboard/StudentHome";
import MyCourse from "../DashBoard/StudentDashboard/MyCourse";
import MyRoutine from "../DashBoard/StudentDashboard/MyRoutine";
import CentralRoutine from "../DashBoard/Admin/AutoRoutine/CentralRoutine";
import Contact from "../Pages/SharedPage/Contact";
import EnrollmentForm from "../Pages/CourseEnrolment/EnrollmentForm";
import PaymentStd from "../DashBoard/Admin/Payment/PaymentStd";
import Admission from "../DashBoard/Admin/Admission/Admission";
import MyClass from "../DashBoard/Teacher/Class/MyClass";
import STDProgress from "../DashBoard/Teacher/Student/STDProgress";
import TeacherProfile from "../DashBoard/Teacher/Profile/TeacherProfile";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/course/:id",
        element: <CourseDetails />,
      },
      {
        path: "enrollmentForm",
        element: <PrivateRoute><EnrollmentForm/></PrivateRoute>
      },
      {
        path: "",
        element: <AuthLayOut />,
        children: [
          {
            path: "/auth/login",
            element: <Login />,
          },
          // {
          //   path: "/auth/joinNow",
          //   element: <JoinNowToggle />,
          // },
          {
            path: "/auth/signup",
            element: <SignUp />,
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "adminHome",
        element: <AdminHome />,
      },
      {
        path: "AddCourse",
        element: <AddCourse />,
      },
      {
        path: "manageCourses",
        element: <ManageCourses/>,
      },
      {
        path: "manageStudents",
        element: <ManageStudents/>,
      },
      {
        path: "manageTeachers",
        element: <ManageTeachers/>,
      },
      {
        path: "manageRoutine",
        element: <CentralRoutine/>,
      },
      {
        path: "paymentStatus",
        element: <PaymentStd/>,
      },
      {
        path: "admission",
        element: <Admission/>,
      },
      //student dashboard
      {
        path: "studentHome",
        element: <StudentHome/>,
      },
      {
        path: "myCourses",
        element: <MyCourse/>
      },
      {
        path: "myRoutine",
        element: <MyRoutine/>
      },
      {
        path: "paymentHistory",
        element: <PaymentStd/>
      },
      

      //Teachers Dashboard
      {
        path: "teacherHome",
        element: <TeacherHome/>,
      },
      {
        path: "myClasses",
        element: <MyClass/>,
      },
      {
        path: "studentProgress",
        element: <STDProgress/>,
      },
      {
        path: "teacherProfile",
        element: <TeacherProfile/>,
      },
    ],
  },
  {
    path: "/*",
    element: <div>Error</div>,
  },
]);
export default Router;
