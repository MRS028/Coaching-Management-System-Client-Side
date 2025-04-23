import React, { useEffect, useState } from "react";
import { FaBook, FaClipboardList, FaChartLine, FaCalendarAlt } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useStudents from "../../Hooks/StudentRelated/useStudents";


const StudentDashboard = () => {
  const { user } = useAuth();
  const [students, loading] = useStudents();
  const [studentInfo, setStudentInfo] = useState(null);
  console.log(user)
  useEffect(() => {
    if (students.length > 0 && user?.email) {
      const matchedStudent = students.find(stu => stu.email === user.email);
      setStudentInfo(matchedStudent || null);
    }
  }, [students, user]);

  console.log(studentInfo)


  // **Fake Data**
  const stats = [
    { id: 1, icon: <FaBook className="text-blue-500 text-4xl mr-4" />, label: "Ongoing Classes", value: "5" },
    { id: 2, icon: <FaClipboardList className="text-green-500 text-4xl mr-4" />, label: "Pending Assignments", value: "3" },
    { id: 3, icon: <FaChartLine className="text-purple-500 text-4xl mr-4" />, label: "Overall Progress", value: "85%" },
  ];

  const schedule = [
    { id: 1, subject: "Math Class", time: "10:00 AM" },
    { id: 2, subject: "Physics Lab", time: "12:30 PM" },
    { id: 3, subject: "Assignment Due", time: "5:00 PM" },
  ];

  const announcements = [
    "📌 Midterm exams start next week.",
    "📌 New course materials uploaded.",
    "📌 Group study session on Friday.",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-white shadow-md p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Student!</h1>
        <p className="text-gray-600">Your personalized dashboard</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white shadow-lg rounded-lg p-6 flex items-center">
            {stat.icon}
            <div>
              <h2 className="text-xl font-semibold">{stat.value}</h2>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Schedule & Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Upcoming Schedule */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaCalendarAlt className="text-indigo-500 mr-2" /> Upcoming Schedule
          </h2>
          <ul className="space-y-3">
            {schedule.map((item) => (
              <li key={item.id} className="bg-gray-200 p-3 rounded-lg">
                {item.subject} - {item.time}
              </li>
            ))}
          </ul>
        </div>

        {/* Announcements */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📢 Announcements</h2>
          <ul className="space-y-2">
            {announcements.map((announcement, index) => (
              <li key={index} className="text-gray-600">{announcement}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
