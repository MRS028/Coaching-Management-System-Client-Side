import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaClock, FaMoneyBillAlt, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa"; // Import icons
import useScrolltoTop from "../../Hooks/useScrolltoTop";
import useCourses from "../../Hooks/useCourses";
import LoadingSpinner from "../../Components/LoadingPage/LoadingSpinner";

const Courses = () => {
  useScrolltoTop();
  const [courses, loading] = useCourses();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-12">Our Courses</h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white card-body p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-100 h-full flex flex-col"
            >
              {/* Icon Section */}
              <div className="flex items-center justify-center mb-6">
                <div className="text-5xl text-green-600">{course.icon}</div>
              </div>

              {/* Title */}
              <h3 className="text-xl text-gray-900 font-bold mb-4">{course.title}</h3>

              {/* Course Details */}
              <div className="text-left space-y-2 mb-6 flex-grow">
                <p className="text-gray-700 flex items-center">
                  <FaBook className="mr-2 text-amber-600" />
                  <span className="font-semibold mr-1">Class:</span> {course?.class}
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaBook className="mr-2 text-amber-600" />
                  <span className="font-semibold mr-1">Subject:</span> {course.subjects.length > 0 ? `${course.subjects[0]}, ${course.subjects[1]}${course.subjects.length > 2 ? '...' : ''}` : ''}

                </p>
                <p className="text-gray-700 flex items-center">
                  <FaClock className="mr-2 text-amber-600" />
                  <span className="font-semibold mr-1">Duration:</span> {course.duration}
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaMoneyBillAlt className="mr-2 text-amber-600" />
                  <span className="font-semibold mr-1">Fee:</span> {course.fee}
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaPhoneAlt className="mr-2 text-amber-600" />
                  <span className="font-semibold mr-1">Contact:</span> {course.contact}
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-amber-600" />
                  <span className="font-semibold mr-1">Location:</span> {course.location}
                </p>
              </div>

              {/* Button Section */}
              <div className="text-center mt-auto">
                <Link
                  to={`/course/${course._id}`}
                  className="inline-block bg-amber-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-amber-700 transition duration-300 font-semibold hover:shadow-lg"
                >
                  See more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
