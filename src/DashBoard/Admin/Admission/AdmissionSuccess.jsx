import { useLocation, useNavigate } from "react-router-dom";
import { 
  FaCheckCircle,
  FaPrint,
  FaIdCard,
  FaPhone,
  FaEnvelope,
  FaSchool,
  FaBook,
  FaMoneyBillWave,
  FaHome
} from "react-icons/fa";
import useScrolltoTop from "../../../Hooks/useScrolltoTop";

const AdmissionSuccess = () => {
   useScrolltoTop();
  const location = useLocation();
  const navigate = useNavigate();

  const { admissionData, course } = location.state || {};

  if (!admissionData || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">ডাটা পাওয়া যায়নি</h2>
          <button 
            onClick={() => navigate('/admission')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            ফর্ম পেজে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    const printContent = document.getElementById('admission-receipt').innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const totalAmount = course.fee + 500;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-800 mb-3">
            ভর্তি প্রক্রিয়া সফলভাবে সম্পন্ন হয়েছে!
          </h1>
          <p className="text-lg text-gray-600">
            আপনাকে স্বাগতম! আপনার ভর্তি প্রক্রিয়া সফলভাবে সম্পন্ন হয়েছে।
          </p>
        </div>

        {/* Printable Receipt */}
        <div id="admission-receipt" className="bg-white rounded-xl shadow-lg p-8 mb-6">
          {/* Header for Print */}
          <div className="text-center mb-6 border-b pb-4 print:block hidden">
            <h2 className="text-2xl font-bold text-gray-800">অধ্যয়ন কোচিং সেন্টার</h2>
            <p className="text-gray-600">ভর্তি কনফার্মেশন রিসিট</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Student Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <FaIdCard className="text-blue-600 text-xl" />
                <h3 className="text-xl font-semibold text-gray-800">ছাত্র/ছাত্রীর তথ্য</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">ভর্তি আইডি:</span>
                  <span className="font-bold">{admissionData.admissionId}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">পুরো নাম:</span>
                  <span>{admissionData.fullName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">ইমেইল:</span>
                  <span>{admissionData.email}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">মোবাইল:</span>
                  <span>{admissionData.phone}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">পিতার নাম:</span>
                  <span>{admissionData.fatherName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">মাতার নাম:</span>
                  <span>{admissionData.motherName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">ঠিকানা:</span>
                  <span className="text-right">{admissionData.address}</span>
                </div>
              </div>
            </div>

            {/* Educational & Payment Information */}
            <div className="space-y-6">
              {/* Educational Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FaSchool className="text-green-600" />
                  <h4 className="font-semibold text-gray-800">শিক্ষাগত তথ্য</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-1">
                    <span>শিক্ষাপ্রতিষ্ঠান:</span>
                    <span>{admissionData.currentInstitution}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>শ্রেণী:</span>
                    <span>{admissionData.classLevel}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>কোর্স:</span>
                    <span>{course.title}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>কোর্স সময়:</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-600" />
                  <h4 className="font-semibold text-gray-800">পেমেন্ট তথ্য</h4>
                </div>
                <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span>কোর্স ফি:</span>
                    <span>{course.fee} টাকা</span>
                  </div>
                  <div className="flex justify-between">
                    <span>রেজিস্ট্রেশন ফি:</span>
                    <span>500 টাকা</span>
                  </div>
                  <div className="flex justify-between border-t pt-1 font-bold">
                    <span>মোট:</span>
                    <span className="text-green-600">{totalAmount} টাকা</span>
                  </div>
                  <div className="flex justify-between">
                    <span>পেমেন্ট স্ট্যাটাস:</span>
                    <span className="text-green-600 font-bold">Paid</span>
                  </div>
                  {admissionData.transactionId && (
                    <div className="flex justify-between">
                      <span>ট্রানজেকশন আইডি:</span>
                      <span>{admissionData.transactionId}</span>
                    </div>
                  )}
                  {admissionData.paymentDate && (
                    <div className="flex justify-between">
                      <span>পেমেন্ট তারিখ:</span>
                      <span>{new Date(admissionData.paymentDate).toLocaleDateString('bn-BD')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Notes */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">পরবর্তী ধাপ:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• আমাদের অফিস থেকে শীঘ্রই আপনার সাথে যোগাযোগ করা হবে</li>
              <li>• ক্লাস শুরুর তারিখ ও সময় সম্পর্কে আপনাকে জানানো হবে</li>
              <li>• ভর্তি সম্পর্কিত যেকোনো তথ্যের জন্য কল করুন: 01966601000</li>
              <li>• এই রিসিটটি সংরক্ষণ করুন, ভবিষ্যতে প্রয়োজন হবে</li>
            </ul>
          </div>

          {/* Print Date */}
          <div className="mt-6 text-center text-sm text-gray-500 border-t pt-4">
            প্রিন্টের তারিখ: {new Date().toLocaleDateString('bn-BD')} - {new Date().toLocaleTimeString('bn-BD')}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handlePrint}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <FaPrint />
            রিসিট প্রিন্ট করুন
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <FaHome />
            হোমপেজে ফিরে যান
          </button>
          <button
            onClick={() => navigate("/admission")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            নতুন ভর্তি করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionSuccess;