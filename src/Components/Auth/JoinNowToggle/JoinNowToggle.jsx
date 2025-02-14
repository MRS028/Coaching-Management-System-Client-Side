import React, { useState } from "react";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const JoinNowToggle = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate()

  // Handle when user selects student or teacher
  const handleRoleSelection = (role) => {
    setRole(role);
    if (role === "student") {
        navigate('/auth/student-signup')
    //  window.location.href = "/student-signup"; // Redirect to student signup page
    } else if (role === "teacher") {
      window.location.href = "/teacher-signup"; // Redirect to teacher signup page
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Join Now</h1>
        <p className="text-lg text-gray-600 mb-6">Are you a student or a teacher?</p>

        <div className="flex justify-center gap-8">
          {/* Student Option */}
          <div
            onClick={() => handleRoleSelection("student")}
            className="cursor-pointer p-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            <FaUserGraduate className="text-4xl mb-3 mx-auto" />
            <p className="font-semibold">Student</p>
          </div>

          {/* Teacher Option */}
          <div
            onClick={() => handleRoleSelection("teacher")}
            className="cursor-pointer p-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          >
            <FaChalkboardTeacher className="text-4xl mb-3 mx-auto" />
            <p className="font-semibold">Teacher</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinNowToggle;
