import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaBook,
  FaChartBar,
  FaWallet,
  FaHome,
  FaUsers,
  FaSignOutAlt,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaBookOpen,
  FaUsersCog,
  FaMoneyBill,
  FaList,
  FaAd,
} from "react-icons/fa";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole"; 
import useSingleUser from "../../Hooks/useRole";


const DashBoard = () => {
  const { logOut, user } = useAuth();
  const { singleUser, roleLoading } = useSingleUser() 
  // const {teachers,refetch} = useTeachers();
  // const {teachersrole} = useTeachersRole();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (roleLoading) {
    return <p className="text-center text-xl">Loading Dashboard...</p>;
  }

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure to Log Out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            navigate("/");
            Swal.fire("Successfully Logged Out", "Stay Blessed!", "success");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Helmet>
        <title>Dashboard || Coaching Center</title>
      </Helmet>

      {/* Sidebar */}
      <div
        className={`${menuOpen ? "block" : "hidden"} w-64 h-screen bg-gradient-to-b from-green-500 to-blue-200 text-white fixed top-0 left-0 shadow-lg md:block z-50`}
      >
        <div className="p-4 text-center">
          <h1 className="text-xl font-bold">অধ্যয়ন কোচিং সেন্টার</h1>
          <p className="text-sm font-semibold">Empowering education for a brighter future.</p>
        </div>
        <div className="mx-4 border-b-2 border-b-black"></div>

        <ul className="menu p-4 font-semibold text-[1rem]">
          {/* Admin Routes */}
          {singleUser?.role === "admin" && (
            <>
              <ul className="">
              <li>
                <NavLink to="/dashboard/adminHome" className={({ isActive }) => (isActive ? "bg-amber-500 text-white" : "hover:bg-blue-800 hover:text-yellow-200")}> <FaHome /> Admin Home </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addCourse" className={({ isActive }) => (isActive ? "bg-amber-500 text-white" : "hover:bg-blue-800 hover:text-yellow-200")}> <FaBook /> Add Courses </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageCourses" className={({ isActive }) => (isActive ? "bg-amber-500 text-white" : "hover:bg-blue-800 hover:text-yellow-200")}> <FaBookOpen /> Manage Courses </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageStudents" className={({ isActive }) => (isActive ? "bg-amber-500 text-white" : "hover:bg-blue-800 hover:text-yellow-200")}> <FaUsers /> Manage Students </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageTeachers" className={({ isActive }) => (isActive ? "bg-amber-500 text-white" : "hover:bg-blue-800 hover:text-yellow-200")}> <FaUsers /> Manage Teachers </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admission" className={({ isActive }) => (isActive ? "bg-amber-500 text-white" : "hover:bg-blue-800 hover:text-yellow-200")}> <FaAd /> New Admission </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentStatus" className={({ isActive }) => (isActive ? "bg-amber-500 text-white" : "hover:bg-blue-800 hover:text-yellow-200")}> <FaMoneyBill/> payment Status </NavLink>
              </li>
              </ul>
            </>
          )}

          {/* Student Routes */}
          {singleUser?.role === "student" && (
            <>
              <li>
                <NavLink to="/dashboard/studentHome" className={({ isActive }) => (isActive ? "bg-amber-500 text-white" : "hover:bg-blue-800 hover:text-yellow-200")}> <FaHome /> Student Home </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myCourses" className={({ isActive }) => (isActive ? "bg-amber-500 text-white" : "hover:bg-blue-800 hover:text-yellow-200")}> <FaBook /> My Courses </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myRoutine" className={({ isActive }) => (isActive ? "bg-amber-500 text-white" : "hover:bg-blue-800 hover:text-yellow-200")}> <FaList /> My Routine </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory" className={({ isActive }) => (isActive ? "bg-amber-500 text-white" : "hover:bg-blue-800 hover:text-yellow-200")}> <FaMoneyBill /> Payment History </NavLink>
              </li>
            </>
          )}
          {/* Teacher Routes */}
          {singleUser?.role === "teacher" && (
            <>
              <li>
                <NavLink to="/dashboard/teacherHome" className={({ isActive }) => (isActive ? "bg-amber-500 text-white" : "hover:bg-blue-800 hover:text-yellow-200")}> <FaHome /> Teacher Home </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myClasses" className={({ isActive }) => (isActive ? "bg-amber-500 text-white" : "hover:bg-blue-800 hover:text-yellow-200")}> <FaBookOpen /> My Classes </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/studentProgress" className={({ isActive }) => (isActive ? "bg-amber-500 text-white" : "hover:bg-blue-800 hover:text-yellow-200")}> <FaChartBar /> Student Progress </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/teacherProfile" className={({ isActive }) => (isActive ? "bg-amber-500 text-white" : "hover:bg-blue-800 hover:text-yellow-200")}> <FaUserCircle /> Teacher Profile </NavLink>
              </li>
            </>
          )}

          {/* Shared Links */}
          <div className="my-2 border-b-2 border-b-black"></div>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "bg-amber-500 text-white" : "hover:bg-blue-800 hover:text-yellow-200")}> <FaHome /> Home </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "bg-amber-500 text-white" : "hover:bg-blue-800 hover:text-yellow-200")}> <FaEnvelope /> Contact Us </NavLink>
          </li>
          <li>
            <button onClick={handleLogOut} className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition">
              <FaSignOutAlt className="mr-1 inline-block" /> LogOut
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="text-white bg-green-500 p-3 fixed top-4 right-4 rounded-full shadow-md md:hidden z-50"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
      </button>

      {/* Main content area */}
      <div className="flex-1 ml-0 md:ml-64 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;