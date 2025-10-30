import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaDownload,
  FaIdCard,
  FaPhone,
  FaEnvelope,
  FaSchool,
  FaMoneyBillWave,
  FaHome,
  FaUserGraduate,
  FaCalendarAlt,
  FaUniversity,
  FaPrint,
} from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import EnrollmentPDF from "./EnrollmentPDF";
import useScrolltoTop from "../../Hooks/useScrolltoTop";

const EnrollmentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useScrolltoTop();

  const { enrollmentData, course } = location.state || {};

  if (!enrollmentData || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            ডাটা পাওয়া যায়নি
          </h2>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            কোর্স পেজে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const totalAmount = parseInt(course.fee) + 500;
  const currentDate = new Date().toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4 animate-bounce" />
          <h1 className="text-4xl font-bold text-green-800 mb-3">
            এনরোলমেন্ট সফলভাবে সম্পন্ন হয়েছে!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            আপনাকে স্বাগতম! আপনার কোর্স এনরোলমেন্ট সফলভাবে সম্পন্ন হয়েছে।
          </p>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg inline-block">
            <strong>স্টুডেন্ট আইডি:</strong> {enrollmentData.studentID}
            {enrollmentData.admissionId && (
              <span className="ml-4">
                <strong>অ্যাডমিশন আইডি:</strong> {enrollmentData.admissionId}
              </span>
            )}
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={() => navigate("/dashboard/myCourses")}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FaUserGraduate />
            আমার কোর্স দেখুন
          </button>

          <PDFDownloadLink
            document={
              <EnrollmentPDF
                enrollmentData={enrollmentData}
                course={course}
                totalAmount={totalAmount}
                currentDate={currentDate}
              />
            }
            fileName={`enrollment-${enrollmentData.studentID}.pdf`}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {({ loading }) => (
              <>
                <FaDownload />
                {loading ? "ডাউনলোড হচ্ছে..." : "পিডিএফ ডাউনলোড"}
              </>
            )}
          </PDFDownloadLink>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaPrint />
            প্রিন্ট করুন
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaHome />
            হোমপেজে ফিরে যান
          </button>
        </div>

        {/* Success Summary Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <FaUserGraduate className="text-blue-600 text-2xl mx-auto mb-2" />
              <p className="text-sm text-gray-600">ছাত্র/ছাত্রীর নাম</p>
              <p className="font-bold text-gray-800">{enrollmentData.name}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <FaSchool className="text-green-600 text-2xl mx-auto mb-2" />
              <p className="text-sm text-gray-600">কোর্স</p>
              <p className="font-bold text-gray-800">{course.title}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <FaMoneyBillWave className="text-purple-600 text-2xl mx-auto mb-2" />
              <p className="text-sm text-gray-600">মোট ফি</p>
              <p className="font-bold text-gray-800">{totalAmount} টাকা</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <FaCheckCircle className="text-orange-600 text-2xl mx-auto mb-2" />
              <p className="text-sm text-gray-600">স্ট্যাটাস</p>
              <p className="font-bold text-green-600">এনরোলমেন্ট সম্পন্ন</p>
            </div>
          </div>

          {/* Payment Confirmation */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              পেমেন্ট কনফার্মেশন
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p>
                  <strong>ট্রানজেকশন আইডি:</strong>{" "}
                  {enrollmentData.transactionId}
                </p>
                <p>
                  <strong>পেমেন্ট মাধ্যম:</strong>{" "}
                  {enrollmentData.paymentMethod === "bkash"
                    ? "বিকাশ"
                    : enrollmentData.paymentMethod === "nagad"
                    ? "নগদ"
                    : enrollmentData.paymentMethod === "bank"
                    ? "ব্যাংক"
                    : "নগদ"}
                </p>
              </div>
              <div>
                <p>
                  <strong>পেমেন্ট তারিখ:</strong>{" "}
                  {enrollmentData.paymentDate
                    ? new Date(enrollmentData.paymentDate).toLocaleDateString(
                        "bn-BD"
                      )
                    : currentDate}
                </p>
                <p>
                  <strong>পরিশোধিত অর্থ:</strong> {totalAmount} টাকা
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-3">
              পরবর্তী ধাপসমূহ:
            </h4>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>
                  আমাদের অফিস থেকে ২৪ ঘন্টার মধ্যে আপনার সাথে যোগাযোগ করা হবে
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>
                  ক্লাস শুরুর তারিখ, সময় ও রুটিন সম্পর্কে আপনাকে জানানো হবে
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>
                  এনরোলমেন্ট সম্পর্কিত যেকোনো তথ্যের জন্য কল করুন:{" "}
                  <strong>01955554414</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>
                  এই কনফার্মেশন রিসিটটি সংরক্ষণ করুন, ভবিষ্যতে প্রয়োজন হবে
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <h4 className="font-semibold text-gray-700 mb-2">জরুরি যোগাযোগ</h4>
          <p className="text-gray-600">
            <FaPhone className="inline mr-2" />
            মোবাইল: 01955554414
          </p>
          <p className="text-gray-600">
            <FaEnvelope className="inline mr-2" />
            ইমেইল: info@oddhayon.com
          </p>
          <p className="text-sm text-gray-500 mt-2">সাভার, ঢাকা</p>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentSuccess;
