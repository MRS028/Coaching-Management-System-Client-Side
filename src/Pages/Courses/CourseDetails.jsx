import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCourses from "../../Hooks/useCourses";
import LoadingSpinner from "../../Components/LoadingPage/LoadingSpinner";
import useScrolltoTop from "../../Hooks/useScrolltoTop";

const CourseDetails = () => {
  const { id } = useParams();
  useScrolltoTop();
  const [courses, loading] = useCourses();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingSpinner />;
  }

  const course = courses.find((c) => c._id === id);

  if (!course || id === null) {
    return (
      <div className="text-center py-20 text-xl sm:text-2xl font-semibold text-red-500">
        Here is No Course ❌
      </div>
    );
  }

  return (
    <div className="py-10 bg-green-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <h2 className="text-2xl sm:text-4xl mb-5 font-bold text-amber-600 text-center">
          {course.title}
        </h2>

        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <div className="pb-6">
            <p className="text-base sm:text-lg leading-relaxed text-gray-800">
              <span className="font-semibold text-gray-900">প্রিয় শিক্ষার্থীরা,</span><br />
              তোমরা এখন জীবনের একটি নতুন অধ্যায়ে পদার্পণ করেছ। এই সময়ে নিয়মিত ভালো অভ্যাস তৈরি করা এবং সঠিকভাবে পড়ালেখার চর্চা করাই ভবিষ্যতের ভিত্তি গড়তে সহায়তা করে...
            </p>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-left">
            কোর্সের বিস্তারিত...
          </h3>

          <div className="border-2 rounded-xl p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
              <div>
                <InfoRow label="📚 Class:" value={course.class} />
                <InfoRow label="📖 Subject:" value={
                  course.subjects?.length
                    ? course.subjects.join(", ")
                    : "No subjects available"
                } />
                <InfoRow label="⏳ Duration:" value={course.duration} />
                <InfoRow label="💰 Fee:" value={`${course.fee} BDT/month`} />
              </div>
              <div>
                <InfoRow label="📍 Location:" value={course.location} />
                <InfoRow label="📆 Day:" value={
                  course.days?.length
                    ? course.days.join(", ")
                    : "No days available"
                } />
                <InfoRow label="⏰ Time:" value={course.time} />
                <InfoRow label="📞 Contact:" value={course.contact} />
              </div>
            </div>

            {course.description && (
              <div className="mt-6 text-sm sm:text-base text-gray-600 leading-relaxed">
                <p>{course.description}</p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-amber-500 text-white py-2 px-6 text-base font-semibold rounded-xl shadow-md transition-all hover:scale-105"
            >
              🔙 Back Home
            </button>
            <button
              onClick={() => navigate("/enrollmentForm", { state: { id } })}
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-amber-500 text-white py-2 px-6 text-base font-semibold rounded-xl shadow-md transition-all hover:scale-105"
            >
              💸 Buy Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Info row helper
const InfoRow = ({ label, value }) => (
  <p className="text-base sm:text-lg mb-3">
    <span className="font-semibold">{label}</span> {value}
  </p>
);

export default CourseDetails;
