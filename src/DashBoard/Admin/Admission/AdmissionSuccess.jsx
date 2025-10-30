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
  FaUser,
  FaBook,
  FaCalendarAlt,
  FaSignature,
  FaUserGraduate,
} from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AdmissionPDF from "./AdmissionPDF";
import useScrolltoTop from "../../../Hooks/useScrolltoTop";
import AdmissionProgress from "./AdmissionProgress";

const AdmissionSuccess = () => {
  useScrolltoTop();
  const location = useLocation();
  const navigate = useNavigate();

  const { admissionData, course } = location.state || {};

  if (!admissionData || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            ডাটা পাওয়া যায়নি
          </h2>
          <button
            onClick={() => navigate("/admission")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            ফর্ম পেজে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  const totalAmount = course.fee + 500;
  const currentDate = new Date().toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdmissionProgress currentStep={4} />

        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-green-200">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4 animate-bounce" />
            <h1 className="text-4xl font-bold text-green-800 mb-3">
              ভর্তি প্রক্রিয়া সফলভাবে সম্পন্ন হয়েছে!
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              আপনাকে স্বাগতম! আপনার ভর্তি প্রক্রিয়া সফলভাবে সম্পন্ন হয়েছে।
            </p>
            <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-lg inline-block">
              <div className="flex items-center gap-4">
                <FaIdCard className="text-2xl text-green-600" />
                <div>
                  <div className="font-bold text-lg">
                    ভর্তি আইডি: {admissionData.admissionId}
                  </div>
                  <div className="text-sm">তারিখ: {currentDate}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex pt-5 flex-col sm:flex-row gap-4 justify-center mb-8">
              <PDFDownloadLink
                document={
                  <AdmissionPDF
                    admissionData={admissionData}
                    course={course}
                    totalAmount={totalAmount}
                    currentDate={currentDate}
                  />
                }
                fileName={`admission_receipt_${admissionData.admissionId}.pdf`}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center gap-3 shadow-lg"
              >
                {({ loading }) => (
                  <>
                    <FaDownload className="text-xl" />
                    <span>
                      {loading ? "রিসিপ্ট তৈরি হচ্ছে..." : "রিসিপ্ট ডাউনলোড করুন"}
                    </span>
                  </>
                )}
              </PDFDownloadLink>

              <button
                onClick={() => navigate("/")}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center justify-center gap-3"
              >
                <FaHome className="text-xl" />
                হোমপেজে ফিরে যান
              </button>

              <button
                onClick={() => navigate("/admission")}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold"
              >
                নতুন ভর্তি করুন
              </button>
            </div>
          </div>
        </div>

        {/* PDF Content - Professional Design */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 mb-8">


          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-blue-800 bg-blue-50 py-3 rounded-lg border border-blue-200">
              ভর্তি কনফার্মেশন রিসিট
            </h2>
          </div>
          {/* <div className="bg-white rounded-xl shadow-2xl p-8 mb-6"> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <FaUserGraduate className="text-blue-600 text-2xl mx-auto mb-2" />
              <p className="text-sm text-gray-600">ছাত্র/ছাত্রীর নাম</p>
              <p className="font-bold text-gray-800">{admissionData.fullName}</p>
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
              <p className="font-bold text-green-600">ভর্তি সম্পন্ন</p>
            </div>
          </div>


          {/* Payment Information */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FaMoneyBillWave className="text-green-600 text-xl" />
              <h3 className="text-xl font-bold text-gray-800 border-b-2 border-green-600 pb-2 w-full">
                পেমেন্ট তথ্য
              </h3>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
              <div className="grid grid-cols-2 gap-4 text-lg">
                <div className="text-gray-700">কোর্স ফি:</div>
                <div className="text-right font-semibold">
                  {course.fee} টাকা
                </div>

                <div className="text-gray-700">রেজিস্ট্রেশন ফি:</div>
                <div className="text-right font-semibold">1000 টাকা</div>

                <div className="border-t border-green-300 pt-2 col-span-2"></div>

                <div className="text-xl font-bold text-green-700">
                  মোট পরিশোধিত:
                </div>
                <div className="text-right text-xl font-bold text-green-700">
                  {totalAmount} টাকা
                </div>

                <div className="text-gray-700">পেমেন্ট স্ট্যাটাস:</div>
                <div className="text-right">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold text-sm">
                    Pending
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FaBook className="text-purple-600 text-xl" />
              <h3 className="text-xl font-bold text-gray-800 border-b-2 border-purple-600 pb-2 w-full">
                পরবর্তী ধাপ ও নির্দেশনা
              </h3>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <FaCalendarAlt className="text-purple-600 mt-1 flex-shrink-0" />
                  <span>
                    আমাদের অফিস থেকে শীঘ্রই আপনার সাথে যোগাযোগ করা হবে
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCalendarAlt className="text-purple-600 mt-1 flex-shrink-0" />
                  <span>
                    ক্লাস শুরুর তারিখ ও সময় সম্পর্কে আপনাকে জানানো হবে
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FaPhone className="text-purple-600 mt-1 flex-shrink-0" />
                  <span>
                    ভর্তি সম্পর্কিত যেকোনো তথ্যের জন্য কল করুন:{" "}
                    <strong>০১৯৬৬৬০১০০০</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FaBook className="text-purple-600 mt-1 flex-shrink-0" />
                  <span>এই রিসিটটি সংরক্ষণ করুন, ভবিষ্যতে প্রয়োজন হবে</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaUser className="text-purple-600 mt-1 flex-shrink-0" />
                  <span>নিয়মিত ক্লাসে উপস্থিতি বাধ্যতামূলক (৮০% উপস্থিতি)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Signatures Section */}
          {/* <div className="border-t-2 border-gray-300 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="border-b-2 border-gray-400 pb-2 mb-4 inline-block">
                  <FaSignature className="text-gray-600 text-xl mb-2 mx-auto" />
                  <div className="font-bold text-lg text-gray-800">
                    আব্দুল হাকিম
                  </div>
                </div>
                <div className="text-gray-700">প্রতিষ্ঠাতা ও পরিচালক</div>
                <div className="text-gray-600 text-sm">
                  অধ্যায়ন কোচিং সেন্টার
                </div>
              </div>

              <div className="text-center">
                <div className="border-b-2 border-gray-400 pb-2 mb-4 inline-block">
                  <FaSignature className="text-gray-600 text-xl mb-2 mx-auto" />
                  <div className="font-bold text-lg text-gray-800">
                    ছাত্র/ছাত্রীর স্বাক্ষর
                  </div>
                </div>
                <div className="text-gray-700">অধ্যায়ন কোচিং সেন্টার</div>
                <div className="text-gray-600 text-sm">
                  তারিখ: {currentDate}
                </div>
              </div>
            </div>
          </div> */}

          {/* Footer */}
          
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
          <h4 className="font-bold text-2xl text-blue-800 mb-6 text-center">
            জরুরি যোগাযোগ
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <FaPhone className="text-3xl text-green-600 mx-auto mb-3" />
              <div className="font-semibold text-gray-800">হটলাইন</div>
              <div className="text-lg font-bold text-gray-900">০১৯৬৬৬০১০০০</div>
            </div>
            <div className="text-center">
              <FaEnvelope className="text-3xl text-red-600 mx-auto mb-3" />
              <div className="font-semibold text-gray-800">ইমেইল</div>
              <div className="text-lg font-bold text-gray-900">
                info@oddhayon.com
              </div>
            </div>
            <div className="text-center">
              <FaUser className="text-3xl text-purple-600 mx-auto mb-3" />
              <div className="font-semibold text-gray-800">ঠিকানা</div>
              <div className="text-lg font-bold text-gray-900">সাভার, ঢাকা</div>
            </div>
            <div className="text-center">
              <FaCalendarAlt className="text-3xl text-orange-600 mx-auto mb-3" />
              <div className="font-semibold text-gray-800">কাজের সময়</div>
              <div className="text-lg font-bold text-gray-900">
                সকাল ৯টা - রাত ১০টা
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionSuccess;
