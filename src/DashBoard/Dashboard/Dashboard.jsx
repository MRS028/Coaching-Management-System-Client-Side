import React, { useState } from "react";
import {
  FaUserCircle,
  FaBook,
  FaClipboardList,
  FaChartBar,
  FaWallet,
  FaHome,
  FaUsers,
  FaSignOutAlt,
  FaUsersCog,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaBookOpen,
} from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import useAdmin from "../../Hooks/useAdmin";
import { Helmet } from "react-helmet";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaBookAtlas } from "react-icons/fa6";

const DashBoard = () => {
  //   const [isAdmin] = useAdmin();
  const isAdmin = true;
  const [menuOpen, setMenuOpen] = useState(false);
  const { logOut, user } = useAuth();
  const navigate = useNavigate();

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
          .then(() => {})
          .catch((err) => console.log(err));
        navigate("/");
        Swal.fire({
          title: "Successfully Logged Out",
          text: "Stay Blessed, Allah will help You.",
          icon: "success",
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Helmet>
        <title>Dashboard || Coaching Center</title>
        <meta
          name="description"
          content="This is the home page of the coaching center dashboard."
        />
      </Helmet>
      {/* Sidebar */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } w-64 h-screen bg-gradient-to-b from-green-500  to-blue-200 text-white fixed top-0 left-0 shadow-lg md:block z-50`}
      >
        <div className="p-4 ">
          <h1 className="text-xl font-bold text-center mb-2">
        অধ্যয়ন কোচিং সেন্টার
          </h1>
          <p className="text-sm text-center font-semibold">
            Empowering education for a brighter future.
          </p>
        </div>
        <div className="mx-4 border-b-2 border-b-black"></div>

        <ul className="menu p-4 font-semibold text-sm">
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/adminHome"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-amber-500 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaHome className="text-base" />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/AddCourse"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaBook className="text-base" />
                  Add Courses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageCourses"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaBookOpen className="text-base" />
                  Manage Courses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageCourses"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaBook className="text-base" />
                  Admission Page
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageStudents"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaUsers className="text-base" />
                  Manage Students
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/analytics"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaUsers className="text-base" />
                  Manage Teacher
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/analytics"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaChartBar className="text-base" />
                  Analytics
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/adminProfile"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaUserCircle className="text-base" />
                  Admin Profile
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/dashboard/studentHome"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaHome className="text-base" />
                  Student Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myCourses"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaBook className="text-base" />
                  My Courses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaWallet className="text-base" />
                  Payment History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/studentProfile"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaUserCircle className="text-base" />
                  Student Profile
                </NavLink>
              </li>
            </>
          )}

          {/* Shared Links */}
          <div className="my-2 border-b-2 border-b-black"></div>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-1 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "hover:bg-blue-800 hover:text-yellow-200"
                }`
              }
            >
              <FaHome className="text-base" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex items-center gap-1 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "hover:bg-blue-800 hover:text-yellow-200"
                }`
              }
            >
              <FaEnvelope className="text-base" />
              Contact Us
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogOut}
              className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition"
            >
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
        {menuOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </button>

      {/* Main content area */}
      <div className="flex-1 ml-0 md:ml-64 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
