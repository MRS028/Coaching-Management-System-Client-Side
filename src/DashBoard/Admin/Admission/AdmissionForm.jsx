import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaSchool,
  FaArrowRight,
} from "react-icons/fa";
import useCourses from "../../../Hooks/useCourses";
import useScrolltoTop from "../../../Hooks/useScrolltoTop";
import AdmissionProgress from "./AdmissionProgress";

const AdmissionForm = () => {
  useScrolltoTop();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [courses] = useCourses();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [courseError, setCourseError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const classMapping = {
    4: ["4", "four", "class 4", "fourth", "৪র্থ", "চতুর্থ"],
    5: ["5", "five", "class 5", "fifth", "৫ম", "পঞ্চম"],
    6: ["6", "six", "class 6", "sixth", "৬ষ্ঠ", "ষষ্ঠ"],
    7: ["7", "seven", "class 7", "seventh", "৭ম", "সপ্তম"],
    8: ["8", "eight", "class 8", "eighth", "৮ম", "অষ্টম"],
    9: ["9", "nine", "class 9", "ninth", "৯ম", "নবম"],
    10: ["10", "ten", "class 10", "tenth", "১০ম", "দশম"],
    11: ["11", "eleven", "class 11", "eleventh", "১১তম", "একাদশ"],
    12: ["12", "twelve", "class 12", "twelfth", "১২তম", "দ্বাদশ"],
    university: ["university", "uni", "graduation", "degree"],
  };

  useEffect(() => {
    const selectedClass = watch("classLevel");

    if (selectedClass) {
      try {
        const classKeywords = classMapping[selectedClass] || [selectedClass];

        const filtered = courses.filter((course) => {
          // কোর্সের বিভিন্ন ফিল্ড চেক করুন (title, description, class, category ইত্যাদি)
          const courseText = `
          ${course.title?.toLowerCase() || ""}
          ${course.description?.toLowerCase() || ""}
          ${course.class?.toLowerCase() || ""}
          ${course.category?.toLowerCase() || ""}
          ${course.tags?.join(" ")?.toLowerCase() || ""}
        `;

          // কিওয়ার্ড ম্যাচ চেক করুন
          return classKeywords.some((keyword) =>
            courseText.includes(keyword.toLowerCase())
          );
        });

        setFilteredCourses(filtered);
        setCourseError("");

        // যদি ফিল্টার করার পর কোন কোর্স না থাকে
        if (filtered.length === 0) {
          setCourseError(`এই শ্রেণীর জন্য কোন কোর্স পাওয়া যায়নি`);
        }
      } catch (error) {
        setCourseError("কোর্স লোড করতে সমস্যা হয়েছে");
        setFilteredCourses([]);
      }
    } else {
      // যদি কোন শ্রেণী নির্বাচন না করা থাকে, সব কোর্স দেখাবে
      setFilteredCourses(courses);
      setCourseError("");
    }
  }, [watch("classLevel"), courses]);

  const selectedCourseId = watch("courseId");
  const selectedCourse = courses.find(
    (course) => course._id === watch("courseId")
  );

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const admissionId = `ADM${Date.now().toString().slice(-6)}${Math.random()
        .toString(36)
        .substr(2, 4)
        .toUpperCase()}`;

      const admissionPayload = {
        ...data,
        admissionId,
        status: "draft",
        admissionDate: new Date().toISOString(),
        courseFee: selectedCourse?.fee || 0,
        paymentStatus: "pending",
        courseName: selectedCourse?.title,
        className: selectedCourse?.class,
        courseDuration: selectedCourse?.duration,
        batchTime: selectedCourse?.time,
        classDays: selectedCourse?.days,
        createdAt: new Date().toISOString(),
      };

      // Navigate to confirmation page with form data
      navigate("/admission/confirm", {
        state: {
          admissionData: admissionPayload,
          course: selectedCourse,
        },
      });
    } catch (error) {
      console.error("Error in admission form:", error);
      alert(`দুঃখিত, সমস্যা হয়েছে: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            <span className="text-blue-600">ভর্তি</span> ফর্ম
          </h1>
          <p className="text-lg text-gray-600">
            আপনার শিক্ষার যাত্রা শুরু করুন আমাদের সাথে
          </p>
        </div>
        <AdmissionProgress currentStep={1} />

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FaUser className="text-blue-600" />
                  ব্যক্তিগত তথ্য
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পুরো নাম *
                  </label>
                  <input
                    type="text"
                    {...register("fullName", { required: "নাম আবশ্যক" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="আপনার পুরো নাম লিখুন"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ইমেইল
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      // required: "ইমেইল আবশ্যক",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "সঠিক ইমেইল দিন",
                      },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    {...register("phone", {
                      required: "মোবাইল নম্বর আবশ্যক",
                      pattern: {
                        value: /^01[3-9]\d{8}$/,
                        message: "সঠিক মোবাইল নম্বর দিন",
                      },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="01XXXXXXXXX"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পিতার নাম *
                  </label>
                  <input
                    type="text"
                    {...register("fatherName", {
                      required: "পিতার নাম আবশ্যক",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="পিতার নাম লিখুন"
                  />
                  {errors.fatherName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fatherName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    মাতার নাম *
                  </label>
                  <input
                    type="text"
                    {...register("motherName", {
                      required: "মাতার নাম আবশ্যক",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="মাতার নাম লিখুন"
                  />
                  {errors.motherName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.motherName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Educational Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FaSchool className="text-green-600" />
                  শিক্ষাগত তথ্য
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    বর্তমান শিক্ষাপ্রতিষ্ঠান *
                  </label>
                  <input
                    type="text"
                    {...register("currentInstitution", {
                      required: "শিক্ষাপ্রতিষ্ঠানের নাম আবশ্যক",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="বিদ্যালয়/কলেজের নাম"
                  />
                  {errors.currentInstitution && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currentInstitution.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    শ্রেণী *
                  </label>
                  <select
                    {...register("classLevel", {
                      required: "শ্রেণী নির্বাচন করুন",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">শ্রেণী নির্বাচন করুন</option>
                    <option value="4">চতুর্থ শ্রেণী</option>
                    <option value="5">পঞ্চম শ্রেণী</option>
                    <option value="6">ষষ্ঠ শ্রেণী</option>
                    <option value="7">সপ্তম শ্রেণী</option>
                    <option value="8">অষ্টম শ্রেণী</option>
                    <option value="9">নবম শ্রেণী</option>
                    <option value="10">দশম শ্রেণী</option>
                    <option value="11">একাদশ শ্রেণী</option>
                    <option value="12">দ্বাদশ শ্রেণী</option>
                    <option value="university">বিশ্ববিদ্যালয়</option>
                  </select>
                  {errors.classLevel && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.classLevel.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    কোর্স নির্বাচন করুন *
                  </label>

                  {courseError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                      <p className="text-red-600 text-sm">{courseError}</p>
                    </div>
                  )}

                  <select
                    {...register("courseId", {
                      required: "কোর্স নির্বাচন করুন",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!!courseError}
                  >
                    <option value="">কোর্স নির্বাচন করুন</option>
                    {filteredCourses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.title} - {course.fee} টাকা
                      </option>
                    ))}
                  </select>
                  {errors.courseId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.courseId.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ঠিকানা *
                  </label>
                  <textarea
                    {...register("address", { required: "ঠিকানা আবশ্যক" })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="বিস্তারিত ঠিকানা"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পূর্বের শিক্ষাগত যোগ্যতা
                  </label>
                  <textarea
                    {...register("previousQualification")}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="এসএসসি/এইচএসসি রেজাল্ট ইত্যাদি"
                  />
                </div>
              </div>
            </div>

            {/* Course Preview */}
            {selectedCourse && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">
                  নির্বাচিত কোর্স:
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">কোর্স:</span>{" "}
                    {selectedCourse.title}
                  </div>
                  <div>
                    <span className="font-medium">ফি:</span>{" "}
                    {selectedCourse.fee} টাকা
                  </div>
                  <div>
                    <span className="font-medium">সময়:</span>{" "}
                    {selectedCourse.duration}
                  </div>
                  <div>
                    <span className="font-medium">ক্লাস:</span>{" "}
                    {selectedCourse.class}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? "প্রসেসিং..." : "পর্যালোচনা করুন"}
                <FaArrowRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;
