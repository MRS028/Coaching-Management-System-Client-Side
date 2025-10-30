import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
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
import logo from "/CMSlogo2.png";
import logo2 from "../../assets/CMSlogo.png"
import Footer from "../../Pages/SharedPage/Footer";
import Loading from "../../Components/Loading/Loading";

const DashBoard = () => {
  const { logOut, user } = useAuth();
  const { singleUser, roleLoading } = useSingleUser();
  // const {teachers,refetch} = useTeachers();
  // const {teachersrole} = useTeachersRole();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  console.log(singleUser?.role)

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  if (roleLoading) {
    return <Loading/>;
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
    <div className="flex flex-col md:flex-row md:overflow-y-auto">
      <Helmet>
        <title>Dashboard || Coaching Center</title>
      </Helmet>

      {/* Sidebar */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } w-64 h-screen bg-gradient-to-b from-green-500 to-blue-200 text-white fixed top-0 left-0 shadow-lg md:block z-50`}
      >
        <div className="p-4 pt-20 md:pt-2 text-center">
        <NavLink
            to="/"
            className="md:text-2xl hidden md:flex justify-center text-xl  font-bold text-amber-500"
          >
            <img src={logo} alt="" className="md:w-40 h-18 pt-2 inline-block" />
          </NavLink>

          <h1 className="text-xl pt-2 font-bold">অধ্যয়ন কোচিং সেন্টার</h1>
          <p className="text-sm font-semibold">
            Empowering education for a brighter future.
          </p>
        </div>
        <div className="mx-4 border-b-2 border-b-black"></div>

        <ul className="menu p-4 font-semibold text-[1rem]">
          {/* Admin Routes */}
          {singleUser?.role === "admin" && (
            <>
              <ul className="">
                <li>
                  <NavLink
                    to="/dashboard/adminHome"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }
                  >
                    {" "}
                    <FaHome /> Admin Home{" "}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/addCourse"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }
                  >
                    {" "}
                    <FaBook /> Add Courses{" "}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageCourses"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }
                  >
                    {" "}
                    <FaBookOpen /> Manage Courses{" "}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageStudents"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }
                  >
                    {" "}
                    <FaUsers /> Manage Students{" "}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageTeachers"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }
                  >
                    {" "}
                    <FaUsers /> Manage Teachers{" "}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/admittedStudents"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }
                  >
                    {" "}
                    <FaAd /> New Admission{" "}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/paymentStatus"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }
                  >
                    {" "}
                    <FaMoneyBill /> payment Status{" "}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageRoutine"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }
                  >
                    {" "}
                    <FaMoneyBill /> Manage Classes{" "}
                  </NavLink>
                </li>
              </ul>
            </>
          )}

          {/* Student Routes */}
          {singleUser?.role === "student" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/studentHome"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-500 text-white"
                      : "hover:bg-blue-800 hover:text-yellow-200"
                  }
                >
                  {" "}
                  <FaHome /> Student Home{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myCourses"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-500 text-white"
                      : "hover:bg-blue-800 hover:text-yellow-200"
                  }
                >
                  {" "}
                  <FaBook /> My Courses{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myRoutine"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-500 text-white"
                      : "hover:bg-blue-800 hover:text-yellow-200"
                  }
                >
                  {" "}
                  <FaList /> My Routine{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-500 text-white"
                      : "hover:bg-blue-800 hover:text-yellow-200"
                  }
                >
                  {" "}
                  <FaMoneyBill /> Payment History{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/courses"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-500 text-white"
                      : "hover:bg-blue-800 hover:text-yellow-200"
                  }
                >
                  {" "}
                  <FaBookOpen/> All Courses{" "}
                </NavLink>
              </li>
            </>
          )}
          {/* Teacher Routes */}
          {singleUser?.role === "teacher" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/teacherHome"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-500 text-white"
                      : "hover:bg-blue-800 hover:text-yellow-200"
                  }
                >
                  {" "}
                  <FaHome /> Teacher Home{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myClasses"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-500 text-white"
                      : "hover:bg-blue-800 hover:text-yellow-200"
                  }
                >
                  {" "}
                  <FaBookOpen /> My Classes{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/studentProgress"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-500 text-white"
                      : "hover:bg-blue-800 hover:text-yellow-200"
                  }
                >
                  {" "}
                  <FaChartBar /> Student Progress{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/teacherProfile"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-500 text-white"
                      : "hover:bg-blue-800 hover:text-yellow-200"
                  }
                >
                  {" "}
                  <FaUserCircle /> Teacher Profile{" "}
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
                isActive
                  ? "bg-amber-500 text-white"
                  : "hover:bg-blue-800 hover:text-yellow-200"
              }
            >
              {" "}
              <FaHome /> Home{" "}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "bg-amber-500 text-white"
                  : "hover:bg-blue-800 hover:text-yellow-200"
              }
            >
              {" "}
              <FaEnvelope /> Contact Us{" "}
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
      <div className="bg-gradient-to-r  md:hidden from-blue-200 to-green-500   w-full sticky top-0 z-50">
        <div className="flex items-center">
          <NavLink
            to="/"
            className="md:text-2xl text-xl  font-bold text-amber-500"
          >
            <img src={logo2} alt="" className="md:w-40 h-18 pt-2 inline-block" />
          </NavLink>
        </div>
        <button
          className="text-white bg-green-500 p-3 fixed top-3 right-4 rounded-full shadow-md md:hidden z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
      </div>

      {/* Main content area */}
     
      <div className="flex-1   ml-0 md:ml-64  md:overflow-x-auto ">
        <div className="pb-5">
        <Outlet />
        </div>
       
        <Footer/>
      </div>
     

      
    </div>
  );
};

export default DashBoard;
