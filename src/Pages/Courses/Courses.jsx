import React from "react";
import {
  FaBook,
  FaChalkboardTeacher,
  FaAward,
  FaClipboardList,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useScrolltoTop from "../../Hooks/useScrolltoTop";

const Courses = () => {
  useScrolltoTop();
  const courses = [
    {
      id: 1,
      title: "বিজ্ঞান ফাউন্ডেশন",
      class: "৩য়-৫ম শ্রেণী",
      version: "বাংলা",
      subjects: ["গণিত", "বিজ্ঞান", "ইংরেজি"],
      duration: "৬ মাস",
      fee: "৩৫০০ টাকা/মাস",
      description:
        "৩য়-৫ম শ্রেণীর জন্য বেসিক সাইন্স ও গণিতের মজবুত ভিত্তি গড়ে তোলার জন্য ডিজাইন করা হয়েছে।",
      contact: "017XXXXXXXX",
      icon: <FaBook />,
    },
    {
      id: 2,
      title: "জুনিয়র বিজ্ঞান প্রোগ্রাম",
      class: "৬ষ্ঠ-৮ম শ্রেণী",
      version: "বাংলা",
      subjects: ["গণিত", "পদার্থ", "রসায়ন", "জীববিজ্ঞান"],
      duration: "৬ মাস",
      fee: "৪০০০ টাকা/মাস",
      description:
        "৬ষ্ঠ-৮ম শ্রেণীর শিক্ষার্থীদের জন্য একটি স্ট্রাকচারড প্রোগ্রাম, যেখানে বিজ্ঞান ও গণিতের গভীর ধারণা দেওয়া হয়।",
      contact: "018XXXXXXXX",
      icon: <FaChalkboardTeacher />,
    },
    {
      id: 3,
      title: "এসএসসি বিজ্ঞান স্পেশাল",
      class: "৯ম-১০ম শ্রেণী",
      version: "বাংলা",
      subjects: ["পদার্থ", "রসায়ন", "জীববিজ্ঞান", "উচ্চতর গণিত"],
      duration: "৮ মাস",
      fee: "৫০০০ টাকা/মাস",
      description:
        "এসএসসি পরীক্ষার্থীদের জন্য সাজানো বিশেষ প্রস্তুতি কোর্স, যেখানে প্রতিটি বিষয় গভীরভাবে বোঝানো হয়।",
      contact: "019XXXXXXXX",
      icon: <FaAward />,
    },
    {
      id: 4,
      title: "এইচএসসি বিজ্ঞান মাস্টারি",
      class: "১১শ-১২শ শ্রেণী",
      version: "বাংলা",
      subjects: ["পদার্থ", "রসায়ন", "জীববিজ্ঞান", "উচ্চতর গণিত"],
      duration: "১ বছর",
      fee: "৬০০০ টাকা/মাস",
      description:
        "এইচএসসি শিক্ষার্থীদের জন্য এক্সপার্ট লেভেলের কোচিং যেখানে প্রতিটি বিষয় আলাদাভাবে কভার করা হয়।",
      contact: "016XXXXXXXX",
      icon: <FaClipboardList />,
    },
    {
      id: 5,
      title: "Science Foundation",
      class: "Class 3-5",
      version: "English",
      subjects: ["Mathematics", "Science", "English"],
      duration: "6 months",
      fee: "3500 BDT/month",
      description:
        "Designed to build a strong foundation in basic science and mathematics for students of classes 3-5.",
      contact: "017XXXXXXXX",
      icon: <FaBook />,
    },
    {
      id: 6,
      title: "Junior Science Program",
      class: "Class 6-8",
      version: "English",
      subjects: ["Mathematics", "Physics", "Chemistry", "Biology"],
      duration: "6 months",
      fee: "4000 BDT/month",
      description:
        "A structured program for students of classes 6-8, providing in-depth understanding of science and mathematics.",
      contact: "018XXXXXXXX",
      icon: <FaChalkboardTeacher />,
    },
    {
      id: 7,
      title: "SSC Science Special",
      class: "Class 9-10",
      version: "English",
      subjects: ["Physics", "Chemistry", "Biology", "Higher Mathematics"],
      duration: "8 months",
      fee: "5000 BDT/month",
      description:
        "A special preparation course for SSC examinees, where each subject is explained in depth.",
      contact: "019XXXXXXXX",
      icon: <FaAward />,
    },
    {
      id: 8,
      title: "HSC Science Mastery",
      class: "Class 11-12",
      version: "English",
      subjects: ["Physics", "Chemistry", "Biology", "Higher Mathematics"],
      duration: "1 year",
      fee: "6000 BDT/month",
      description:
        "Expert-level coaching for HSC students, where each subject is covered separately.",
      contact: "016XXXXXXXX",
      icon: <FaClipboardList />,
    },
    {
      id: 9,
      title: "Primary Mathematics",
      class: "Class 1-2",
      version: "English",
      subjects: ["Mathematics"],
      duration: "3 months",
      fee: "2500 BDT/month",
      description:
        "Basic mathematics course for students of classes 1-2 to build fundamental skills.",
      contact: "015XXXXXXXX",
      icon: <FaBook />,
    },
    {
      id: 10,
      title: "English Language Course",
      class: "All Classes",
      version: "English",
      subjects: ["English"],
      duration: "4 months",
      fee: "3000 BDT/month",
      description:
        "Designed to improve English language proficiency for students of all classes.",
      contact: "014XXXXXXXX",
      icon: <FaChalkboardTeacher />,
    },
    {
      id: 11,
      title: "প্রাথমিক গণিত কোর্স",
      class: "১ম-২য় শ্রেণী",
      version: "বাংলা",
      subjects: ["গণিত"],
      duration: "৩ মাস",
      fee: "২০০০ টাকা/মাস",
      description:
        "১ম-২য় শ্রেণীর শিক্ষার্থীদের জন্য গণিতের বেসিক ধারণা শেখানোর জন্য ডিজাইন করা হয়েছে।",
      contact: "015XXXXXXXX",
      icon: <FaAward />,
    },
    {
      id: 12,
      title: "ইংরেজি ভাষা কোর্স",
      class: "সকল শ্রেণী",
      version: "বাংলা",
      subjects: ["ইংরেজি"],
      duration: "৪ মাস",
      fee: "২৫০০ টাকা/মাস",
      description:
        "সকল শ্রেণীর শিক্ষার্থীদের জন্য ইংরেজি ভাষার দক্ষতা উন্নত করার জন্য ডিজাইন করা হয়েছে।",
      contact: "014XXXXXXXX",
      icon: <FaClipboardList />,
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-12">
          আমাদের কোর্সসমূহ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white card-body p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-100"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="text-5xl text-green-600">{course.icon}</div>
              </div>
              <h3 className="text-xl text-gray-900 font-bold mb-4">
                {course.title}
              </h3>
              {/* <p className="text-gray-600 mb-4 leading-relaxed">{course.description}</p> */}
              <div className="text-left space-y-2 mb-6">
                <p className="text-gray-700">
                  <span className="font-semibold">ক্লাস:</span> {course?.class}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">বিষয়:</span>{" "}
                  {course.subjects.join(", ")}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">সময় কাল:</span>{" "}
                  {course.duration}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">ফি:</span> {course.fee}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">যোগাযোগ:</span>{" "}
                  {course.contact}
                </p>
              </div>
              <div className="text-center">
                <Link
                  to={`/course/${course.id}`}
                  className="inline-block bg-amber-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-amber-700 transition duration-300 font-semibold hover:shadow-lg"
                >
                  বিস্তারিত দেখুন
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
