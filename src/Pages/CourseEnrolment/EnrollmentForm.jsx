import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUserGraduate,
  FaSchool,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaVenusMars,
  FaHashtag,
  FaBookOpen,
  FaMoneyBillWave,
  FaChalkboardTeacher,
  FaArrowRight,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useCourses from "../../Hooks/useCourses";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useaxiosSecure";
import useStudents from "../../Hooks/StudentRelated/useStudents";
import AlreadyEnrolled from "./AlreadyEnrolled";
import useScrolltoTop from "../../Hooks/useScrolltoTop";

const EnrollmentForm = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [studentID, setStudentID] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const [students] = useStudents();
  const [courses] = useCourses();
  const location = useLocation();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  useScrolltoTop();

  const courseID = location.state?.id;
  const course = courses.find((c) => c._id === courseID);

  useEffect(() => {
    if (students.length > 0 && user?.email) {
      const matchedStudent = students.find((stu) => stu.email === user.email);
      setStudentInfo(matchedStudent || null);
    }
  }, [students, user]);

  // Auto-generate Student ID
  const generateStudentID = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `STU${year}${randomNum}`;
  };

  // Generate or reuse Student ID
  useEffect(() => {
    if (studentInfo?.studentID) {
      setStudentID(studentInfo.studentID);
      setValue("studentID", studentInfo.studentID);
    } else {
      const newID = generateStudentID();
      setStudentID(newID);
      setValue("studentID", newID);
    }
    setValue("courseID", courseID);
    if (course) {
      setValue("courseTitle", course.title);
      setValue("fee", course.fee);
      setValue("subjects", course.subjects?.join(", "));
    }
  }, [setValue, course, courseID, studentInfo]);

  const onSubmit = async (data) => {
    try {
      // Navigate to payment page with enrollment data
      navigate("/enrollment/payment", {
        state: {
          enrollmentData: {
            ...data,
            status: "pending",
            enrollmentDate: new Date().toISOString(),
            courseFee: course?.fee || 0,
            paymentStatus: "pending",
            courseName: course?.title,
            className: data.class,
            courseDuration: course?.duration,
            createdAt: new Date().toISOString(),
          },
          course: course,
        },
      });
    } catch (error) {
      console.error("Form submission error:", error);
      alert("ফর্ম জমা দেওয়া যায়নি। পরে আবার চেষ্টা করুন।");
    }
  };

  if (studentInfo?.courseID === courseID) {
    return <AlreadyEnrolled />;
  }

  if (!course || !courseID) {
    return (
      <div className="text-center py-20 text-2xl font-semibold text-red-500">
        ❌ No Course Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            <span className="text-blue-600">কোর্স</span> এনরোলমেন্ট
          </h1>
          <p className="text-lg text-gray-600">
            আপনার কোর্স নিবন্ধন সম্পূর্ণ করুন
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Course Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-3 text-lg">
                কোর্স তথ্য
              </h3>
              <div className="grid grid-cols-1 font-semibold justify-between gap-4 text-sm">
                <div className="flex justify-between">
                  <span>কোর্স:</span>
                  <span>{course.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>ফি:</span>
                  <span>{course.fee} টাকা</span>
                </div>
                <div className="flex justify-between">
                  <span>সময়:</span>
                  <span>{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>বিষয়:</span>
                  <span>{course.subjects?.join(", ")}</span>
                </div>
              </div>
              <input type="hidden" {...register("studentID")} />
              <input type="hidden" {...register("courseID")} />
              <input type="hidden" {...register("courseTitle")} />
              <input type="hidden" {...register("fee")} />
              <input type="hidden" {...register("subjects")} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FaUserGraduate className="text-blue-600" />
                  ব্যক্তিগত তথ্য
                </h3>

                {/* Student ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaHashtag className="inline mr-1" /> স্টুডেন্ট আইডি
                  </label>
                  <input
                    type="text"
                    value={studentID}
                    readOnly
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-500"
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaUserGraduate className="inline mr-1" /> পুরো নাম
                  </label>
                  <input
                    {...register("name", { required: "নাম আবশ্যক" })}
                    type="text"
                    defaultValue={user?.displayName || ""}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ভার্সন
                  </label>
                  <select
                    {...register("version", {
                      required: "ভার্সন নির্বাচন করুন",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="English">ইংরেজি</option>
                    <option value="Bangla">বাংলা</option>
                  </select>
                </div>

                {/* Age */}
                {/* <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        বয়স
                                    </label>
                                    <input
                                        {...register("age", { required: "বয়স আবশ্যক" })}
                                        type="number"
                                        placeholder="11"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div> */}

                {/* Class */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaUserGraduate className="inline mr-1" /> শ্রেণী
                  </label>
                  <select
                    {...register("class", { required: "শ্রেণী নির্বাচন করুন" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">শ্রেণী নির্বাচন করুন</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                </div>
              </div>

              {/* Contact & Educational Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FaSchool className="text-green-600" />
                  যোগাযোগ ও শিক্ষাগত তথ্য
                </h3>

                {/* School Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaSchool className="inline mr-1" /> শিক্ষাপ্রতিষ্ঠান
                  </label>
                  <select
                    {...register("schoolName", {
                      required: "শিক্ষাপ্রতিষ্ঠান নির্বাচন করুন",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">শিক্ষাপ্রতিষ্ঠান নির্বাচন করুন</option>
                    <option value="BPATC School & College">
                      BPATC School & College
                    </option>
                    <option value="Cant. Public School">
                      Cant. Public School
                    </option>
                    <option value="Morning Glory School">
                      Morning Glory School
                    </option>
                    <option value="Fair Anjuman School">
                      Fair Anjuman School
                    </option>
                    <option value="Savar Model School">
                      Savar Model School
                    </option>
                    <option value="Green View School">Green View School</option>
                    <option value="Scholars Home">Scholars Home</option>
                    <option value="ABC International School">
                      ABC International School
                    </option>
                    <option value="Sunrise Model School">
                      Sunrise Model School
                    </option>
                    <option
                      value="Others"
                      className="text-red-500 font-semibold"
                    >
                      অন্যান্য
                    </option>
                  </select>
                </div>

                {/* Gender */}
                {/* <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <FaVenusMars className="inline mr-1" /> লিঙ্গ
                                    </label>
                                    <select
                                        {...register("gender", { required: "লিঙ্গ নির্বাচন করুন" })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">নির্বাচন করুন</option>
                                        <option value="Male">পুরুষ</option>
                                        <option value="Female">মহিলা</option>
                                        <option value="Other">অন্যান্য</option>
                                    </select>
                                </div> */}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaEnvelope className="inline mr-1" /> ইমেইল
                  </label>
                  <input
                    {...register("email", { required: "ইমেইল আবশ্যক" })}
                    type="email"
                    defaultValue={user?.email || ""}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaPhone className="inline mr-1" /> মোবাইল নম্বর
                  </label>
                  <input
                    {...register("phone", { required: "মোবাইল নম্বর আবশ্যক" })}
                    type="text"
                    placeholder="01710000001"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaMapMarkerAlt className="inline mr-1" /> ঠিকানা
                  </label>
                  <input
                    {...register("address", { required: "ঠিকানা আবশ্যক" })}
                    type="text"
                    placeholder="ঢাকা, বাংলাদেশ"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Version */}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                পরবর্তী ধাপ - পেমেন্ট
                <FaArrowRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentForm;
