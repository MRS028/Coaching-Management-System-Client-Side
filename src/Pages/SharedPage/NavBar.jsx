import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaSignOutAlt, FaTimes } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut, loading } = useAuth();
  console.log(loading);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure to Log Out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50", // Green Confirm button
      cancelButtonColor: "#FF5722", // Red Cancel button
      confirmButtonText: "Yes",
      cancelButtonText: "NO",
      customClass: {
        popup: "bg-gray-800 text-white", // Dark background with white text
        title: "text-yellow-400", // Yellow title for emphasis
        content: "text-white", // White text for content
        confirmButton:
          "bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded", // Green with hover effect
        cancelButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded", // Red with hover effect
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {})
          .catch((err) => console.log(err));
        Swal.fire({
          title: "Successfully Logged Out",
          text: "Stay Blessed, Allah will help You.",
          icon: "success",
          timer: 1500,
          customClass: {
            popup: "bg-green-600 text-white", // Green background for success
            title: "text-white", // White title color
            content: "text-white", // White content text
          },
        });
      }
    });
  };

  const links = (
    <ul className="flex space-x-6">
      <li className="pt-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-amber-600 font-bold"
              : "text-gray-700 hover:text-amber-500"
          }
        >
          হোম পেইজ
        </NavLink>
      </li>
      <li className="pt-2">
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            isActive
              ? "text-amber-600 font-bold"
              : "text-gray-700 hover:text-amber-500"
          }
        >
          কোর্স সমূহ
        </NavLink>
      </li>
      <li className="pt-2">
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-amber-600 font-bold"
              : "text-gray-700 hover:text-amber-500"
          }
        >
          যোগাযোগ
        </NavLink>
      </li>
      <li>
        {user && user?.email ? (
          <>
            <div className="flex items-center space-x-2">
              <div className="relative ">
                <img
                  src={user?.photoURL || "https://i.ibb.co.com/XLq7gMH/Sample-User-Icon.png"}
                  alt="User Profile"
                  className="w-9 h-9 rounded-full border-gray-300"
                />
                <span className="overflow-hidden absolute bottom-[-15px] left-0 w-full h-auto bg-black opacity-0 hover:opacity-75 flex justify-center items-center text-white rounded-lg py-1">
                  <span className="text-xs">{user?.displayName || "Name"}</span>
                </span>
              </div>
              <button
                onClick={handleLogOut}
                className="btn border-none text-sm btn- bg-red-500 rounded-3xl px-4 py-2 text-white hover:bg-red-700"
              >
                <FaSignOutAlt size={16} /> LogOut
              </button>
            </div>
          </>
        ) : (
          <>
            <NavLink
              to="/auth/login"
              className="btn border-none text-3xl btn-lg bg-amber-500 rounded-full px-4 py-2 text-white hover:bg-amber-600"
            >
              Join Now
            </NavLink>
          </>
        )}
      </li>
    </ul>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink
              to="/"
              className="md:text-2xl text-xl  font-bold text-green-500"
            >
              অধ্যয়ন কোচিং সেন্টার,সাভার
            </NavLink>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex">{links}</div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-amber-500 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block text-amber-600 font-bold"
                    : "block text-gray-700 hover:text-amber-500"
                }
                onClick={() => setIsOpen(false)}
              >
                হোম পেইজ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  isActive
                    ? "block text-amber-600 font-bold"
                    : "block text-gray-700 hover:text-amber-500"
                }
                onClick={() => setIsOpen(false)}
              >
                কোর্স সমূহ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "block text-amber-600 font-bold"
                    : "block text-gray-700 hover:text-amber-500"
                }
                onClick={() => setIsOpen(false)}
              >
                যোগাযোগ
              </NavLink>
            </li>
            <li>
              {user && user?.email ? (
                <>
                  <div className="flex items-center space-x-2">
                    {/* <span className="text-sm font-semibold">
                      {user?.displayName || "Name"}
                    </span> */}
                    <button
                      onClick={handleLogOut}
                      className="btn border-none text-2xl btn-lg bg-red-500 rounded-3xl px-4 py-2 text-white hover:bg-red-700"
                    >
                      <FaSignOutAlt size={16} className="mt-1" /> LogOut
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <NavLink
                    to="/auth/login"
                    className="block btn bg-amber-500 rounded-full px-4 py-2 text-white hover:bg-amber-600 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Join Now
                  </NavLink>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
