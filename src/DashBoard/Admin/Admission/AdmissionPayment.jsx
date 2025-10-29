import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  FaMoneyBillWave,
  FaCreditCard,
  FaArrowLeft,
  FaCheckCircle,
  FaIdCard
} from "react-icons/fa";
import { MdPayment, MdPersonalVideo } from "react-icons/md";
import useScrolltoTop from "../../../Hooks/useScrolltoTop";

const AdmissionPayment = () => {
    useScrolltoTop();
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
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

  const handlePayment = async () => {
    if (!transactionId || !paymentDate || !paymentMethod) {
      alert("দয়া করে সব তথ্য পূরণ করুন");
      return;
    }

    setLoading(true);
    try {
      // Update payment status in database
      const response = await fetch(`http://localhost:5000/admissions/${admissionData.admissionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentStatus: 'paid',
          status: 'approved',
          paymentDate: paymentDate,
          transactionId: transactionId,
          paymentMethod: paymentMethod,
          updatedAt: new Date().toISOString()
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        navigate('/admission/success', { 
          state: { 
            admissionData: {
              ...admissionData,
              paymentStatus: 'paid',
              status: 'approved',
              paymentDate,
              transactionId,
              paymentMethod
            },
            course 
          } 
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('পেমেন্ট প্রক্রিয়ায় সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = course.fee + 500; // Course fee + registration fee

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            <span className="text-green-600">পেমেন্ট</span> প্রক্রিয়া
          </h1>
          <p className="text-lg text-gray-600">
            আপনার ভর্তি সম্পূর্ণ করতে পেমেন্ট করুন
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-semibold text-gray-800 text-lg mb-4">পেমেন্ট মাধ্যম নির্বাচন করুন</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "bkash", name: "বিকাশ", icon: MdPayment, color: "blue" },
                  { id: "card", name: "কার্ড", icon: FaCreditCard, color: "gray" },
                  { id: "bank", name: "ব্যাংক", icon: MdPersonalVideo, color: "gray" },
                  { id: "cash", name: "নগদ", icon: FaMoneyBillWave, color: "gray" },
                ].map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === method.id 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <method.icon className={`text-2xl ${
                        paymentMethod === method.id ? "text-blue-600" : "text-gray-600"
                      }`} />
                      <div>
                        <h5 className="font-semibold">{method.name}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Instructions */}
            {paymentMethod === "bkash" && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h5 className="font-semibold mb-4">বিকাশের মাধ্যমে পেমেন্ট</h5>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2 font-bold">
                      <strong>বিকাশ নম্বর:</strong> 01966601000
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>টাইপ:</strong> Payment
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>রেফারেন্স:</strong> আপনার ভর্তি আইডি ({admissionData.admissionId})
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ট্রানজেকশন আইডি *
                    </label>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="TRX123456789"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      পেমেন্টের তারিখ *
                    </label>
                    <input
                      type="date"
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaIdCard className="text-blue-600" />
                <h4 className="font-semibold text-gray-800">ভর্তি সারসংক্ষেপ</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>ভর্তি আইডি:</span>
                  <span className="font-semibold">{admissionData.admissionId}</span>
                </div>
                <div className="flex justify-between">
                  <span>নাম:</span>
                  <span className="font-semibold">{admissionData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span>কোর্স:</span>
                  <span className="font-semibold">{course.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>কোর্স ফি:</span>
                  <span className="font-semibold">{course.fee} টাকা</span>
                </div>
                <div className="flex justify-between">
                  <span>রেজিস্ট্রেশন ফি:</span>
                  <span className="font-semibold">500 টাকা</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">মোট:</span>
                  <span className="font-semibold text-green-600">
                    {totalAmount} টাকা
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading || !transactionId || !paymentDate || !paymentMethod}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? "পেমেন্ট প্রক্রিয়াধীন..." : "পেমেন্ট সম্পন্ন করুন"}
              <FaCheckCircle />
            </button>

            <button
              onClick={() => navigate('/admission')}
              className="w-full px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <FaArrowLeft />
              ফর্ম পেজে ফিরে যান
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPayment;