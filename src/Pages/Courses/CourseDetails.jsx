import React from "react";
import { useParams } from "react-router-dom";
import useCourses from "../../Hooks/useCourses";
import LoadingSpinner from "../../Components/LoadingPage/LoadingSpinner";
import useScrolltoTop from "../../Hooks/useScrolltoTop";

const CourseDetails = () => {
  const { id } = useParams();
  useScrolltoTop();
  const [courses, loading] = useCourses();

  if (loading) {
    return <LoadingSpinner />;
  }

  // Find the course by ID
  const course = courses.find((c) => c._id === id);

  if (!course) {
    return (
      <div className="text-center py-20 text-2xl font-semibold text-red-500">
       Here is No Course ❌
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="bg-white shadow-xl rounded-2xl p-8">
          {/* Course Title */}
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            {course.title}
          </h2>

          {/* Course Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <p className="text-lg mb-3">
                <span className="font-semibold">📚 Class:</span> {course.class}
              </p>
              <p className="text-lg mb-3">
                <span className="font-semibold">📖 Subject:</span>{" "}
                {course.subjects.join(", ")}
              </p>
              <p className="text-lg mb-3">
                <span className="font-semibold">⏳ Duration:</span>{" "}
                {course.duration}
              </p>
              <p className="text-lg mb-3">
                <span className="font-semibold">💰 Fee:</span> {course.fee}
              </p>
            </div>
            <div>
              <p className="text-lg mb-3">
                <span className="font-semibold">📍 Location:</span>{" "}
                {course.location}
              </p>
              <p className="text-lg mb-3">
                <span className="font-semibold">📆 Day:</span>{" "}
                {course.days.join(", ")}
              </p>
              <p className="text-lg mb-3">
                <span className="font-semibold">⏰ Time:</span> {course.time}
              </p>
              <p className="text-lg mb-3">
                <span className="font-semibold">📞 Contact:</span>{" "}
                {course.contact}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 text-lg text-gray-600 leading-relaxed">
            <p>{course.description}</p>
          </div>

          {/* Go Back Button */}
          <div className="text-center mt-8 flex justify-center gap-4">
            {/* Go Back Button */}
            <button
              onClick={() => window.history.back()}
              className="bg-amber-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-amber-700 transition duration-300 font-semibold hover:shadow-lg"
            >
              🔙 Back 
            </button>

            {/* Buy Course Button */}
            <button
              onClick={() => alert("Course purchased!")}
              className="bg-green-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-green-700 transition duration-300 font-semibold hover:shadow-lg"
            >
              💸 Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
