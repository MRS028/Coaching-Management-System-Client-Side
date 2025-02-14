import React from "react";
import { FaChalkboardTeacher, FaUserGraduate, FaChartBar, FaBook, FaEdit } from "react-icons/fa";

const TeacherHome = () => {
  // Fake teacher data
  const teacherData = {
    name: "Ra",
    email: "rifat@gail.com",
    photoURL: "https://i.ibb.co.com/CpxT8WH8/Me-profile.jpg",
    role: "teacher",
    school: "Others",
    version: "english",
    phone: "01525595656",
    gender: "male",
    classes: [
      { id: 1, name: "Mathematics", students: 25 },
      { id: 2, name: "Science", students: 30 },
    ],
    students: 55,
    rating: 4.7,
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Welcome, {teacherData.name} 🎓</h2>

      {/* Teacher Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg flex items-center gap-4 shadow-md">
          <FaBook className="text-3xl" />
          <div>
            <p className="text-lg font-semibold">Total Classes</p>
            <p className="text-xl font-bold">{teacherData.classes.length}</p>
          </div>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg flex items-center gap-4 shadow-md">
          <FaUserGraduate className="text-3xl" />
          <div>
            <p className="text-lg font-semibold">Total Students</p>
            <p className="text-xl font-bold">{teacherData.students}</p>
          </div>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg flex items-center gap-4 shadow-md">
          <FaChartBar className="text-3xl" />
          <div>
            <p className="text-lg font-semibold">Teacher Rating</p>
            <p className="text-xl font-bold">{teacherData.rating} ⭐</p>
          </div>
        </div>
      </div>

      {/* Manage My Classes */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaChalkboardTeacher /> My Classes
        </h3>
        {teacherData.classes.length > 0 ? (
          <ul className="space-y-3">
            {teacherData.classes.map((course) => (
              <li key={course.id} className="p-4 border-b flex justify-between items-center">
                <span className="font-semibold">{course.name}</span>
                <span className="text-gray-600">{course.students} Students</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-red-500">You have not created any classes yet.</p>
        )}
      </div>

      {/* Profile Info */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaUserGraduate /> Teacher Profile
        </h3>
        <div className="flex items-center gap-4">
          <img src={teacherData.photoURL} alt="Teacher" className="w-16 h-16 rounded-full border" />
          <div>
            <p className="font-semibold">Name: {teacherData.name}</p>
            <p className="text-gray-600">Email: {teacherData.email}</p>
            <p className="text-gray-600">Phone: {teacherData.phone}</p>
          </div>
          <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
            <FaEdit /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;