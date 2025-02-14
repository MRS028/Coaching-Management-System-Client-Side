import React from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaStar,
  FaCalendarAlt,
  FaBook,
  FaClipboardList,
  FaChartLine,
} from "react-icons/fa";

const StudentHome = () => {
  // Fake Data
  const student = {
    name: "Md Rifat Sheikh",
    email: "rifat@example.com",
    class: "10",
    school: "Southeast High School",
    gender: "Male",
    rating: 4.5,
    subjects: ["Math", "Science", "English", "History"],
    teachers: [
      { id: 1, name: "John Doe", subject: "Math" },
      { id: 2, name: "Jane Smith", subject: "Science" },
    ],
    classSchedule: [
      { id: 1, subject: "Math", time: "10:00 AM - 11:00 AM", date: "Mon, Wed, Fri" },
      { id: 2, subject: "Science", time: "11:00 AM - 12:00 PM", date: "Tue, Thu" },
    ],
    assignments: [
      { id: 1, title: "Algebra Homework", subject: "Math", dueDate: "2023-10-15", status: "Pending" },
      { id: 2, title: "Physics Lab Report", subject: "Science", dueDate: "2023-10-20", status: "Completed" },
    ],
    exams: [
      { id: 1, subject: "Math", date: "2023-10-25", time: "9:00 AM - 11:00 AM" },
      { id: 2, subject: "Science", date: "2023-10-30", time: "10:00 AM - 12:00 PM" },
    ],
    progressReport: [
      { id: 1, subject: "Math", score: 85, grade: "A" },
      { id: 2, subject: "Science", score: 78, grade: "B+" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {student.name}!</h1>
        <p className="text-gray-600">Your personalized dashboard</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Student Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-2">
          <div className="flex items-center space-x-4">
            <FaUserGraduate className="text-blue-500 text-4xl" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">{student.name}</h2>
              <p className="text-gray-600">{student.email}</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600">🏫 {student.school}</p>
            <p className="text-gray-600">📚 Class: {student.class}</p>
            <p className="text-gray-600">🧑‍🎓 Gender: {student.gender}</p>
            <div className="flex items-center space-x-2">
              <FaStar className="text-yellow-500" />
              <span className="text-gray-800 font-semibold">{student.rating}</span>
            </div>
          </div>
        </div>

        {/* Subjects Card */}
        <div className="bg-white rounded-lg shadow-lg p-2">
          <div className="flex items-center space-x-4 mb-4">
            <FaBook className="text-purple-500 text-3xl" />
            <h2 className="text-xl font-bold text-gray-800">Subjects</h2>
          </div>
          <ul className="space-y-2">
            {student.subjects.map((subject, index) => (
              <li key={index} className="text-gray-700">
                {subject}
              </li>
            ))}
          </ul>
        </div>

        {/* Teachers Card */}
        <div className="bg-white rounded-lg shadow-lg p-2">
          <div className="flex items-center space-x-4 mb-4">
            <FaChalkboardTeacher className="text-green-500 text-3xl" />
            <h2 className="text-xl font-bold text-gray-800">Teachers</h2>
          </div>
          <ul className="space-y-2">
            {student.teachers.map((teacher) => (
              <li key={teacher.id} className="text-gray-700">
                {teacher.name} - {teacher.subject}
              </li>
            ))}
          </ul>
        </div>

        {/* Class Schedule Card */}
        <div className="bg-white rounded-lg shadow-lg p-2">
          <div className="flex items-center space-x-4 mb-4">
            <FaCalendarAlt className="text-red-500 text-3xl" />
            <h2 className="text-xl font-bold text-gray-800">Class Schedule</h2>
          </div>
          <ul className="space-y-2">
            {student.classSchedule.map((schedule) => (
              <li key={schedule.id} className="text-gray-700">
                {schedule.subject} - {schedule.time} ({schedule.date})
              </li>
            ))}
          </ul>
        </div>

        {/* Assignments Card */}
        <div className="bg-white rounded-lg shadow-lg p-2">
          <div className="flex items-center space-x-4 mb-4">
            <FaClipboardList className="text-orange-500 text-3xl" />
            <h2 className="text-xl font-bold text-gray-800">Assignments</h2>
          </div>
          <ul className="space-y-2">
            {student.assignments.map((assignment) => (
              <li key={assignment.id} className="text-gray-700">
                {assignment.title} - Due: {assignment.dueDate}{" "}
                <span
                  className={`font-semibold ${
                    assignment.status === "Completed" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  ({assignment.status})
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Progress Report Card */}
        <div className="bg-white rounded-lg shadow-lg p-2">
          <div className="flex items-center space-x-4 mb-4">
            <FaChartLine className="text-purple-500 text-3xl" />
            <h2 className="text-xl font-bold text-gray-800">Progress Report</h2>
          </div>
          <ul className="space-y-2">
            {student.progressReport.map((report) => (
              <li key={report.id} className="text-gray-700">
                {report.subject} - Score: {report.score} (Grade: {report.grade})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;