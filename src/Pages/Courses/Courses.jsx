import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBook, FaClock, FaMapMarkerAlt } from "react-icons/fa"; // Import icons
import useScrolltoTop from "../../Hooks/useScrolltoTop";
import useCourses from "../../Hooks/useCourses";
import LoadingSpinner from "../../Components/LoadingPage/LoadingSpinner";

const Courses = () => {
  useScrolltoTop();
  const [courses, loading] = useCourses();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  if (loading) {
    return <LoadingSpinner />;
  }

  // Handle the class selection change
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  // Handle the search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter courses based on selected class and search term
  const filteredCourses = courses.filter((course) => {
    const isClassMatch = selectedClass
      ? course.class.toLowerCase().includes(selectedClass.toLowerCase()) // Make class check case-insensitive
      : true;
    const isSearchMatch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    return isClassMatch && isSearchMatch;
  });

  return (
    <div className="py-8 bg-gradient-to-b from-green-200 to-green-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-6xl font-semibold text-gray-800 mb-12">Our Courses</h2>

        {/* Search and Class filter */}
        <div className="mb-6 flex justify-center items-center">
          <div className="flex space-x-4">
            {/* Search Input */}
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by title..."
              className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            
            {/* Class Selection */}
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Classes</option>
              {/* Generate class options from 3 to 12 and custom classes */}
              {["৩", "৪", "৫", "৬", "৭", "৮", "৯", "১০", "১১", "১২", "9-12"].map((classItem) => (
                <option key={classItem} value={classItem}>
                  Class {classItem}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white card-body p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform border border-gray-100 h-full flex flex-col"
            >
              {/* Icon Section */}
              <div className="card items-center justify-center">
                <div className="text-green-600">
                  <img src={course.image || "https://udvash.com/media/Images/UDVASH/program/2025/SSC25FMTofon.png"} className="rounded-t-xl" alt="" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl text-left text-gray-900 font-bold mb-4">{course.title}</h3>

              {/* Course Details */}
              <div className="text-left text-xl space-y-2 mb-6 flex-grow">
                <p className="text-gray-700 flex items-center">
                  <FaBook className="mr-2 text-amber-600" />
                  <span className="font-semibold mr-1">Class:</span> {course.class}
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaBook className="mr-2 text-amber-600" />
                  <span className="font-semibold mr-1">Version:</span> {course.version}
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
                  <FaMapMarkerAlt className="mr-2 text-amber-600" />
                  <span className="font-semibold mr-1">Location:</span> {course.location}
                </p>
              </div>

              {/* Button Section */}
              <div className="flex justify-between">
                <button className="text-white btn bg-gradient-to-r from-green-500 to-amber-500 font-semibold py-2 px-4 bg-green-500 rounded-2xl">Offline</button>
                <Link
                  to={`/course/${course._id}`}
                  className="btn bg-gradient-to-r from-green-500 to-amber-500 text-white py-2 px-4 font-semibold rounded-2xl shadow-md"
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
