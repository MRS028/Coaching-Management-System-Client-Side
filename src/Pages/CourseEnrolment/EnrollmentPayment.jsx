import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaArrowLeft,
  FaCheckCircle,
  FaIdCard,
  FaPhone,
  FaShieldAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdPayment, MdPersonalVideo } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useaxiosSecure";
import Swal from "sweetalert2";
import useScrolltoTop from "../../Hooks/useScrolltoTop";

const EnrollmentPayment = () => {
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentNumber, setPaymentNumber] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useScrolltoTop();

  const { enrollmentData, course } = location.state || {};

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: "ত্রুটি!",
      text: message,
      confirmButtonText: "ঠিক আছে",
      confirmButtonColor: "#dc2626",
    });
  };

  const showSuccessAlert = (studentID, admissionId) => {
    Swal.fire({
      icon: "success",
      title: "এনরোলমেন্ট সফল!",
      html: `
        <div class="text-center">
          <p class="text-lg mb-4">আপনার কোর্স এনরোলমেন্ট সফলভাবে সম্পন্ন হয়েছে</p>
          <div class="bg-green-50 border border-green-200 rounded-lg p-4 mt-3">
            <p class="text-sm mb-1"><strong>স্টুডেন্ট আইডি:</strong> ${studentID}</p>
            <p class="text-sm mb-1"><strong>অ্যাডমিশন আইডি:</strong> ${admissionId}</p>
            <p class="text-sm mb-1"><strong>ট্রানজেকশন আইডি:</strong> ${transactionId}</p>
            <p class="text-sm"><strong>মোট পরিশোধিত:</strong> ${totalAmount.toLocaleString()} টাকা</p>
          </div>
        </div>
      `,
      confirmButtonText: "কনফার্মেশন দেখুন",
      confirmButtonColor: "#16a34a",
    }).then((result) => {
      if (result.isConfirmed) {
        navigateToSuccess(studentID, admissionId);
      }
    });
  };

  const showConfirmAlert = () => {
    const paymentMethodText = {
      bkash: "বিকাশ", nagad: "নগদ", bank: "ব্যাংক", cash: "নগদ"
    }[paymentMethod];

    return Swal.fire({
      title: "পেমেন্ট নিশ্চিতকরণ",
      html: `
        <div class="text-center">
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
            <p class="font-semibold text-yellow-800">⚠️ আপনি কি নিশ্চিত?</p>
            <p class="text-sm text-yellow-700">পেমেন্ট সম্পন্ন করার পরে তথ্য পরিবর্তন করা যাবে না</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-sm"><strong>পেমেন্ট মাধ্যম:</strong> ${paymentMethodText}</p>
            <p class="text-sm"><strong>ট্রানজেকশন আইডি:</strong> ${transactionId}</p>
            <p class="text-sm"><strong>মোট অর্থ:</strong> ${totalAmount.toLocaleString()} টাকা</p>
          </div>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, পেমেন্ট নিশ্চিত করুন",
      cancelButtonText: "না, তথ্য চেক করুন",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
    });
  };

  const handlePayment = async () => {
    if (!transactionId || !paymentDate || !paymentMethod) {
      showErrorAlert("দয়া করে সব তথ্য পূরণ করুন");
      return;
    }

    const result = await showConfirmAlert();
    if (!result.isConfirmed) return;

    setLoading(true);

    try {
      const enrollmentPayload = {
        // Student Personal Info
        name: enrollmentData.name,
        email: enrollmentData.email,
        phone: enrollmentData.phone,
        age: enrollmentData.age,
        gender: enrollmentData.gender,
        address: enrollmentData.address,

        // Educational Info
        class: enrollmentData.class,
        schoolName: enrollmentData.schoolName,
        version: enrollmentData.version,
        subjects: enrollmentData.subjects,

        // Course Info
        courseID: course._id,
        courseTitle: course.title,
        courseDuration: course.duration,
        fee: course.fee,

        // Payment Info
        paymentDate: paymentDate,
        transactionId: transactionId,
        paymentMethod: paymentMethod,
        paymentNumber: paymentNumber,
        paidAmount: totalAmount
      };

    //   console.log("Sending enrollment data:", enrollmentPayload);

      const response = await axiosSecure.post("/enrollments", enrollmentPayload);

      if (response.data.success) {
        await showSuccessAlert(response.data.studentID, response.data.admissionId);
      } else {
        throw new Error(response.data.message || "Enrollment failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      showErrorAlert(error.response?.data?.message || error.message || "পেমেন্ট প্রক্রিয়ায় সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const navigateToSuccess = (studentID, admissionId) => {
    navigate("/enrollment/success", {
      state: {
        enrollmentData: {
          ...enrollmentData,
          studentID: studentID,
          admissionId: admissionId,
          paymentStatus: "paid",
          paymentDate: paymentDate,
          transactionId: transactionId,
          paymentMethod: paymentMethod,
          paidAmount: totalAmount
        },
        course: course
      },
    });
  };

  const totalAmount = course.fee + 500;

  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  if (!enrollmentData || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">ডাটা পাওয়া যায়নি</h2>
          <button onClick={() => navigate("/courses")} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
            কোর্স পেজে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            <span className="text-green-600">পেমেন্ট</span> প্রক্রিয়া
          </h1>
          <p className="text-lg text-gray-600">আপনার কোর্স এনরোলমেন্ট সম্পূর্ণ করতে পেমেন্ট করুন</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaCreditCard className="text-blue-600 text-xl" />
                <h4 className="font-semibold text-gray-800 text-lg">পেমেন্ট মাধ্যম নির্বাচন করুন</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { id: "bkash", name: "বিকাশ", icon: MdPayment, number: "01966601000" },
                  { id: "nagad", name: "নগদ", icon: FaMoneyBillWave, number: "019666660100" },
                  { id: "bank", name: "ব্যাংক", icon: MdPersonalVideo, number: "বিকাশ/নগদ" },
                  { id: "cash", name: "নগদ", icon: FaMoneyBillWave, number: "অফিসে" },
                ].map((method) => (
                  <div key={method.id} onClick={() => setPaymentMethod(method.id)} className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === method.id ? "border-green-500 bg-green-50 shadow-md" : "border-gray-300 hover:bg-gray-50"}`}>
                    <div className="flex items-center gap-3">
                      <method.icon className={`text-2xl ${paymentMethod === method.id ? "text-green-600" : "text-gray-600"}`} />
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800">{method.name}</h5>
                        <p className="text-sm text-gray-600 mt-1"><FaPhone className="inline mr-1 text-xs" />{method.number}</p>
                      </div>
                      {paymentMethod === method.id && <FaCheckCircle className="text-green-500 text-xl" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {paymentMethod && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaShieldAlt className="text-green-600 text-xl" />
                  <h5 className="font-semibold text-gray-800 text-lg">পেমেন্ট তথ্য প্রদান করুন</h5>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h6 className="font-semibold text-blue-800 mb-2">নির্দেশাবলী:</h6>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• {paymentMethod === "bkash" ? "বিকাশ" : "নগদ"} অ্যাপে Payment নির্বাচন করুন</li>
                      <li>• নম্বর: <strong>01966601000</strong> এ টাকা পাঠান</li>
                      <li>• রেফারেন্স হিসেবে আপনার নাম: <strong>{enrollmentData.name}</strong> লিখুন</li>
                      <li>• ট্রানজেকশন আইডি নোট করুন</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ট্রানজেকশন আইডি *</label>
                      <input type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="TRX123456789" required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">পেমেন্টের তারিখ *</label>
                      <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} max={getCurrentDate()} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" required />
                    </div>

                    {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">আপনার মোবাইল নম্বর</label>
                        <input type="text" value={paymentNumber} onChange={(e) => setPaymentNumber(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="01XXXXXXXXX" />
                      </div>
                    )}
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      <FaExclamationTriangle className="inline mr-1" />
                      <strong>দ্রষ্টব্য:</strong> সঠিক ট্রানজেকশন আইডি প্রদান করুন
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <FaIdCard className="text-blue-600 text-xl" />
                <h4 className="font-semibold text-gray-800 text-lg">এনরোলমেন্ট সারসংক্ষেপ</h4>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between pb-2 border-b"><span>নাম:</span><span className="font-semibold">{enrollmentData.name}</span></div>
                <div className="flex justify-between pb-2 border-b"><span>ইমেইল:</span><span className="font-semibold">{enrollmentData.email}</span></div>
                <div className="flex justify-between pb-2 border-b"><span>কোর্স:</span><span className="font-semibold">{course.title}</span></div>
                <div className="flex justify-between pb-2 border-b"><span>শ্রেণী:</span><span className="font-semibold">{enrollmentData.class}</span></div>

                <div className="pt-2 space-y-2">
                  <div className="flex justify-between"><span>কোর্স ফি:</span><span className="font-semibold">{course.fee.toLocaleString()} টাকা</span></div>
                  <div className="flex justify-between"><span>রেজিস্ট্রেশন ফি:</span><span className="font-semibold">৫০০ টাকা</span></div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span className="text-green-600">মোট:</span>
                    <span className="text-green-600">{totalAmount.toLocaleString()} টাকা</span>
                  </div>
                </div>
              </div>

              <button onClick={handlePayment} disabled={loading || !transactionId || !paymentDate || !paymentMethod} className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>প্রক্রিয়াধীন...</> : <><FaCheckCircle />পেমেন্ট নিশ্চিত করুন</>}
              </button>

              <button onClick={() => navigate(-1)} className="w-full mt-3 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2">
                <FaArrowLeft />পূর্ববর্তী পেজে ফিরে যান
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-2">সহায়তা প্রয়োজন?</h5>
              <p className="text-sm text-blue-700">পেমেন্ট সংক্রান্ত যেকোনো সমস্যায় কল করুন:<br /><strong>01955554414</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPayment;