import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCourses from "../../Hooks/useCourses";
import LoadingSpinner from "../../Components/LoadingPage/LoadingSpinner";
import useScrolltoTop from "../../Hooks/useScrolltoTop";

const CourseDetails = () => {
  const { id } = useParams();
  useScrolltoTop();
  const [courses, loading] = useCourses();
  const navigate = useNavigate()

  if (loading) {
    return <LoadingSpinner />;
  }

  // Find the course by ID
  const course = courses.find((c) => c._id === id);

  if (!course || id === null) {
    return (
      <div className="text-center py-20 text-2xl font-semibold text-red-500">
        Here is No Course ❌
      </div>
    );
  }

  return (
    <div className="py-12 bg-green-200">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <h2 className="text-4xl mb-5 p-2 font-bold text-amber-600 text-center">
          {course.title}
        </h2>
        {/* <h2 className="text-4xl font-semibold text-center lg:text-6xl">Course Details</h2> */}

        <div className="bg-white shadow-xl rounded-2xl p-8">
          <div className="flex justify-center pb-4">
            <p className="">
              <span className="font-semibold">
                প্রিয় শিক্ষার্থীরা, <br />
              </span>
              তোমরা এখন জীবনের একটি নতুন অধ্যায়ে পদার্পণ করেছ। এই সময়ে নিয়মিত
              ভালো অভ্যাস তৈরি করা এবং সঠিকভাবে পড়ালেখার চর্চা করাই ভবিষ্যতের
              ভিত্তি গড়তে সহায়তা করে। শিক্ষা জীবনের শুরুতেই যদি সৃজনশীল ও
              ভাবনাপূর্ণভাবে পাঠ্যবইয়ের সঙ্গে মিশে যাওয়া যায়, তাহলে তা শুধু ভালো
              ফলাফলের জন্য নয় বরং তোমাদের স্বপ্ন ও লক্ষ্যপূরণের পথকে আরও সহজ করে
              তোলে। এই সময় বুঝে এবং গভীরভাবে বই পড়ার অভ্যাস গড়ে তোলাটাই
              গুরুত্বপূর্ণ। তোমাদের পাঠ্যবইগুলোর মধ্যে গণিত ও বিজ্ঞান বিষয় দুটি
              তুলনামূলক বেশ জটিল। বার্ষিক পরীক্ষায় সামগ্রিকভাবে ভালো ফলাফল
              অর্জনে এই বিষয় দুটিতে দৃঢ় প্রস্তুতি নেওয়া খুবই জরুরি।
            </p>
            {/* <img src={course.image || "https://udvash.com/media/Images/UDVASH/program/2025/SSC25FMTofon.png"} alt=""  className="rounded-xl"/> */}
          </div>
          {/* Course Title */}

          <h2 className="text-3xl text-left p-2">কোর্সের বিস্তারিত...</h2>
          {/* Course Details */}
          <div className=" border-2 p-5">
            <div className="grid grid-cols-1 my-2 md:grid-cols-2 gap-8  text-gray-700">
              <div>
                <p className="text-lg mb-3">
                  <span className="font-semibold">📚 Class:</span>{" "}
                  {course.class}
                </p>
                <p className="text-lg mb-3">
                  <span className="font-semibold">📖 Subject:</span>{" "}
                  {course.subjects &&
                  Array.isArray(course.subjects) &&
                  course.subjects.length > 0
                    ? course.subjects.join(", ")
                    : "No subjects available"}
                </p>

                <p className="text-lg mb-3">
                  <span className="font-semibold">⏳ Duration:</span>{" "}
                  {course.duration}
                </p>
                <p className="text-lg mb-3">
                  <span className="font-semibold">💰 Fee:</span> {course.fee} <span >BDT/month</span>
                </p>
              </div>
              <div>
                <p className="text-lg mb-3">
                  <span className="font-semibold">📍 Location:</span>{" "}
                  {course.location}
                </p>
                <p className="text-lg mb-3">
                  <span className="font-semibold">📆 Day:</span>{" "}
                  {course.days && Array.isArray(course.days)
                    ? course.days.join(", ")
                    : "No days available"}
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
            <div className="mt-6 text-lg text-gray-600 leading-relaxed">
              <p>{course.description}</p>
            </div>
          </div>

          {/* Go Back Button */}
          <div className="text-center mt-8 flex justify-center gap-4">
            {/* Go Back Button */}
            <button
              onClick={() => window.history.back()}
              className="btn btn-lg bg-gradient-to-r from-green-500 to-amber-500  text-white py-2 px-4 font-semibold rounded-2xl shadow-md"
            >
              🔙 Back Home
            </button>

            {/* Buy Course Button */}
            <button
              onClick={() => navigate("/enrollmentForm", { state: { id } })}
              className="btn btn-lg bg-gradient-to-r from-green-500 to-amber-500  text-white py-2 px-4 font-semibold rounded-2xl shadow-md"
            >
              💸 Buy Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
