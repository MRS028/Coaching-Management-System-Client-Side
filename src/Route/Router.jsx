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
import AdmissionForm from "../DashBoard/Admin/Admission/AdmissionForm";
import AdmissionPayment from "../DashBoard/Admin/Admission/AdmissionPayment";
import AdmissionSuccess from "../DashBoard/Admin/Admission/AdmissionSuccess";
import EnrollmentPayment from "../Pages/CourseEnrolment/EnrollmentPayment";
import EnrollmentSuccess from "../Pages/CourseEnrolment/EnrollmentSuccess";
import ErrorPage from "../Pages/SharedPage/ErrorPage";
import AdmissionConfirmation from "../DashBoard/Admin/Admission/AdmissionConfirmation";
import AdmittedtStudent from "../DashBoard/Admin/AdmittedStudent/AdmittedtStudent";

// Import new admission pages

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
        path: "/admission",
        element: <AdmissionForm />, // Updated to new AdmissionForm
      },
      {
        path: "/admission/confirm",
        element: <AdmissionConfirmation />, // Updated to new AdmissionConfirmation
      },
      {
        path: "/admission/payment",
        element: <AdmissionPayment />, // New payment page
      },
      {
        path: "/admission/success",
        element: <AdmissionSuccess />, // New success page
      },
      {
        path: "/course/:id",
        element: <CourseDetails />,
      },
      {
        path: "enrollmentForm",
        element: <PrivateRoute><EnrollmentForm/></PrivateRoute>
      },
      // {
      //   path: "confirm",
      //   element: <PrivateRoute><EnrollmentForm/></PrivateRoute>
      // },
      {
    path: "/enrollment/payment",
    element: <PrivateRoute><EnrollmentPayment/></PrivateRoute>
},
{
    path: "/enrollment/success",
    element: <PrivateRoute><EnrollmentSuccess/></PrivateRoute>
},
      {
        path: "",
        element: <AuthLayOut />,
        children: [
          {
            path: "/auth/login",
            element: <Login />,
          },
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
        path: "admittedStudents",
        element: <AdmittedtStudent/>, // Keep the admin admission page
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
    path: "*",
    element: <ErrorPage />,
  },
]);
export default Router;