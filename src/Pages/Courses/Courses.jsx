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
    <div className="py-8 bg-gradient-to-b from-green-200 to-green-200 relative">
      {/* <img src="https://udvash.com/media/Images/UDVASH/Common/courseBefore.png" className="absolute" alt="" /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-6xl font-semibold text-gray-800 mb-12">Our Courses</h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white card-body p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform  border border-gray-100 h-full flex flex-col"
            >
              {/* Icon Section */}
              <div className="card items-center justify-center">
                <div className=" text-green-600">
                  <img src={course.image || "https://udvash.com/media/Images/UDVASH/program/2025/SSC25FMTofon.png"} className="rounded-t-xl" alt="" /></div>
              </div>

              {/* Title */}
              <h3 className="text-xl text-left text-gray-900 font-bold mb-4">{course.title}</h3>

              {/* Course Details */}
              <div className="text-left text-xl space-y-2 mb-6 flex-grow">
                <p className="text-gray-700 flex items-center">
                  <FaBook className="mr-2 text-amber-600" />
                  <span className="font-semibold mr-1">Class:</span> {course?.class}
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaBook className="mr-2 text-amber-600" />
                  <span className="font-semibold mr-1">Version:</span> {course?.version}
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaBook className="mr-2 text-amber-600" />
                  <span className="font-semibold mr-1">Subject:</span> {course.subjects.length > 0 ? `${course.subjects[0]}, ${course.subjects[1]}${course.subjects.length > 2 ? '...' : ''}` : ''}

                </p>
                <p className="text-gray-700 flex items-center">
                  <FaClock className="mr-2 text-amber-600" />
                  <span className="font-semibold mr-1">Duration:</span> {course.duration}
                </p>
                {/* <p className="text-gray-700 flex items-center">
                  <FaMoneyBillAlt className="mr-2 text-amber-600" />
                  <span className="font-semibold mr-1">Fee:</span> {course.fee}
                </p> */}
                {/* <p className="text-gray-700 flex items-center">
                  <FaPhoneAlt className="mr-2 text-amber-600" />
                  <span className="font-semibold mr-1">Contact:</span> {course.contact}
                </p> */}
                <p className="text-gray-700 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-amber-600" />
                  <span className="font-semibold mr-1">Location:</span> {course.location}
                </p>
              </div>

              {/* Button Section */}
              <div className=" flex justify-between">
              <button className="text-white btn bg-gradient-to-r from-green-500 to-amber-500 font-semibold py-2 px-4 bg-green-500 rounded-2xl">Offline</button>
                <Link
                  to={`/course/${course._id}`}
                  className="btn bg-gradient-to-r from-green-500 to-amber-500  text-white py-2 px-4 font-semibold rounded-2xl shadow-md"
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
