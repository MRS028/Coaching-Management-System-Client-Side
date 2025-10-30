import { useState } from "react";
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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useScrolltoTop from "../../../Hooks/useScrolltoTop";
import AdmissionProgress from "./AdmissionProgress";

const MySwal = withReactContent(Swal);

const AdmissionPayment = () => {
  useScrolltoTop();
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentNumber, setPaymentNumber] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { admissionData, course } = location.state || {};

  // SweetAlert2 configuration
  const showErrorAlert = (message) => {
    MySwal.fire({
      icon: "error",
      title: '<span style="color: #dc2626">ত্রুটি!</span>',
      html: `<div style="text-align: center; color: #4b5563">${message}</div>`,
      confirmButtonText: "ঠিক আছে",
      confirmButtonColor: "#dc2626",
      customClass: {
        popup: "rounded-2xl border border-gray-200",
        confirmButton: "px-6 py-2 rounded-lg font-medium",
      },
    });
  };

  const showSuccessAlert = () => {
    MySwal.fire({
      icon: "success",
      title: '<span style="color: #16a34a">পেমেন্ট সফল!</span>',
      html: `
        <div style="text-align: center; color: #4b5563">
          <p style="margin-bottom: 1rem; font-size: 1.125rem;">আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে</p>
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 0.5rem; padding: 1rem; margin-top: 1rem;">
            <p style="margin: 0.25rem 0; font-size: 0.875rem;"><strong>ভর্তি আইডি:</strong> ${
              admissionData.admissionId
            }</p>
            <p style="margin: 0.25rem 0; font-size: 0.875rem;"><strong>ট্রানজেকশন আইডি:</strong> ${transactionId}</p>
            <p style="margin: 0.25rem 0; font-size: 0.875rem;"><strong>পরিশোধিত অর্থ:</strong> ${totalAmount.toLocaleString()} টাকা</p>
          </div>
        </div>
      `,
      confirmButtonText: "ভর্তি কনফার্মেশন দেখুন",
      confirmButtonColor: "#16a34a",
      showCancelButton: true,
      cancelButtonText: "বন্ধ করুন",
      cancelButtonColor: "#6b7280",
      customClass: {
        popup: "rounded-2xl border border-gray-200",
        confirmButton: "px-6 py-2 rounded-lg font-medium",
        cancelButton: "px-6 py-2 rounded-lg font-medium",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigateToSuccess();
      }
    });
  };

  const showConfirmAlert = () => {
    const paymentMethodText = {
      bkash: "বিকাশ",
      nagad: "নগদ",
      bank: "ব্যাংক ট্রান্সফার",
      cash: "নগদ জমা",
    }[paymentMethod];

    return MySwal.fire({
      title: '<span style="color: #d97706">পেমেন্ট নিশ্চিতকরণ</span>',
      html: `
        <div style="text-align: center; color: #4b5563">
          <div style="background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 0.5rem; padding: 1rem; margin-bottom: 1rem;">
            <p style="margin: 0.5rem 0; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <span style="color: #d97706">⚠️</span>
              <strong>আপনি কি নিশ্চিত?</strong>
            </p>
            <p style="margin: 0.25rem 0; font-size: 0.875rem;">পেমেন্ট সম্পন্ন করার পরে তথ্য পরিবর্তন করা যাবে না</p>
          </div>
          <div style="background-color: #f8fafc; border-radius: 0.5rem; padding: 1rem;">
            <p style="margin: 0.25rem 0; font-size: 0.875rem;"><strong>পেমেন্ট মাধ্যম:</strong> ${paymentMethodText}</p>
            <p style="margin: 0.25rem 0; font-size: 0.875rem;"><strong>ট্রানজেকশন আইডি:</strong> ${transactionId}</p>
            <p style="margin: 0.25rem 0; font-size: 0.875rem;"><strong>মোট অর্থ:</strong> ${totalAmount.toLocaleString()} টাকা</p>
          </div>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, পেমেন্ট নিশ্চিত করুন",
      cancelButtonText: "না, তথ্য চেক করুন",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      customClass: {
        popup: "rounded-2xl border border-gray-200",
        confirmButton: "px-6 py-2 rounded-lg font-medium",
        cancelButton: "px-6 py-2 rounded-lg font-medium",
      },
    });
  };

  const showLoadingAlert = () => {
    MySwal.fire({
      title: '<span style="color: #2563eb">পেমেন্ট প্রক্রিয়াধীন...</span>',
      html: `
        <div style="text-align: center; color: #4b5563">
          <p style="margin-bottom: 1rem;">আপনার পেমেন্ট ভেরিফাই করা হচ্ছে</p>
          <div style="display: flex; justify-content: center; margin: 1rem 0;">
            <div style="border: 4px solid #f3f4f6; border-top: 4px solid #2563eb; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite;"></div>
          </div>
          <p style="font-size: 0.875rem; color: #6b7280;">দয়া করে অপেক্ষা করুন...</p>
        </div>
      `,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: {
        popup: "rounded-2xl border border-gray-200",
      },
    });
  };

  const navigateToSuccess = () => {
    navigate("/admission/success", {
      state: {
        admissionData: {
          ...admissionData,
          paymentStatus: "Pending",
          status: "Pending",
          paymentDate: paymentDate,
          transactionId: transactionId,
          paymentMethod: paymentMethod,
          paymentNumber: paymentNumber,
          paidAmount: totalAmount,
          updatedAt: new Date().toISOString(),
        },
        course: course,
        transactionId: transactionId,
      },
    });
  };

  const handlePayment = async () => {
    // Validation
    if (!transactionId || !paymentDate || !paymentMethod) {
      showErrorAlert(
        "দয়া করে সব তথ্য পূরণ করুন (ট্রানজেকশন আইডি, তারিখ এবং পেমেন্ট মাধ্যম)"
      );
      return;
    }

    // Show confirmation dialog
    const result = await showConfirmAlert();

    if (!result.isConfirmed) {
      return;
    }

    setLoading(true);
    showLoadingAlert();

    try {
      // Update payment status in database
      const paymentPayload = {
        paymentStatus: "Pending",
        status: "Pending",
        paymentDate: paymentDate,
        transactionId: transactionId,
        paymentMethod: paymentMethod,
        paymentNumber: paymentNumber,
        paidAmount: totalAmount,
        updatedAt: new Date().toISOString(),
      };

      const response = await fetch(
        `http://localhost:5000/admissions/${admissionData.admissionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentPayload),
        }
      );

      const result = await response.json();

      if (result.success) {
        navigateToSuccess();
        // Close loading alert
        MySwal.close();

        // Show success alert
        await showSuccessAlert();
      } else {
        throw new Error(
          result.message ||
            "পেমেন্ট ভেরিফিকেশন সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।"
        );
      }
    } catch (error) {
      console.error("Payment error:", error);
      MySwal.close();
      showErrorAlert("পেমেন্ট প্রক্রিয়ায় সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = course.fee + 1000; // Course fee + registration fee

  // Get current date in YYYY-MM-DD format for date input
  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            <span className="text-green-600">পেমেন্ট</span> প্রক্রিয়া
          </h1>
          <p className="text-lg text-gray-600">
            আপনার ভর্তি সম্পূর্ণ করতে পেমেন্ট করুন
          </p>
        </div>

        <AdmissionProgress currentStep={3} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaCreditCard className="text-blue-600 text-xl" />
                <h4 className="font-semibold text-gray-800 text-lg">
                  পেমেন্ট মাধ্যম নির্বাচন করুন
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    id: "bkash",
                    name: "বিকাশ",
                    icon: MdPayment,
                    number: "01966601000",
                    instructions: [
                      "বিকাশে পেমেন্ট করুন",
                      "রেফারেন্স হিসেবে ভর্তি আইডি দিন",
                      "ট্রানজেকশন আইডি সেভ করুন",
                    ],
                  },
                  {
                    id: "nagad",
                    name: "নগদ",
                    icon: FaMoneyBillWave,
                    number: "019666660100",
                    instructions: [
                      "নগদে পেমেন্ট করুন",
                      "রেফারেন্স হিসেবে ভর্তি আইডি দিন",
                      "ট্রানজেকশন আইডি সেভ করুন",
                    ],
                  },
                  {
                    id: "bank",
                    name: "ব্যাংক ট্রান্সফার",
                    icon: MdPersonalVideo,
                    number: "বিকাশ/নগদ",
                    instructions: [
                      "সরাসরি ব্যাংক ট্রান্সফার করুন",
                      "রেফারেন্স হিসেবে ভর্তি আইডি দিন",
                      "ট্রানজেকশন স্লিপ সেভ করুন",
                    ],
                  },
                ].map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? "border-green-500 bg-green-50 shadow-md"
                        : "border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <method.icon
                        className={`text-2xl ${
                          paymentMethod === method.id
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      />
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800">
                          {method.name}
                        </h5>
                        <p className="text-sm text-gray-600 mt-1">
                          <FaPhone className="inline mr-1 text-xs" />
                          {method.number}
                        </p>
                      </div>
                      {paymentMethod === method.id && (
                        <FaCheckCircle className="text-green-500 text-xl" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Instructions */}
            {paymentMethod && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaShieldAlt className="text-green-600 text-xl" />
                  <h5 className="font-semibold text-gray-800 text-lg">
                    পেমেন্ট তথ্য প্রদান করুন
                  </h5>
                </div>

                <div className="space-y-4">
                  {/* Payment Instructions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h6 className="font-semibold text-blue-800 mb-2">
                      নির্দেশাবলী:
                    </h6>
                    <ul className="text-sm space-y-1">
                      {paymentMethod === "bkash" && (
                        <>
                          <li>
                            • বিকাশ অ্যাপে যান এবং{" "}
                            <strong className="text-red-600">Payment</strong>{" "}
                            নির্বাচন করুন
                          </li>
                          <li>
                            • নম্বর:{" "}
                            <strong className="text-red-600">
                              01966601000
                            </strong>{" "}
                            এ টাকা পাঠান
                          </li>
                          <li>
                            • রেফারেন্স হিসেবে আপনার ভর্তি আইডি:{" "}
                            <strong>{admissionData.admissionId}</strong> লিখুন
                          </li>
                          <li>
                            • ট্রানজেকশন সম্পন্ন হলে ট্রানজেকশন আইডি নোট করুন
                          </li>
                        </>
                      )}
                      {paymentMethod === "nagad" && (
                        <>
                          <li>
                            • নগদ অ্যাপে যান এবং "Send Money" নির্বাচন করুন
                          </li>
                          <li>
                            • নম্বর: <strong>01966601000</strong> এ টাকা পাঠান
                          </li>
                          <li>
                            • রেফারেন্স হিসেবে আপনার ভর্তি আইডি:{" "}
                            <strong>{admissionData.admissionId}</strong> লিখুন
                          </li>
                          <li>
                            • ট্রানজেকশন সম্পন্ন হলে ট্রানজেকশন আইডি নোট করুন
                          </li>
                        </>
                      )}
                      {paymentMethod === "bank" && (
                        <>
                          <li>
                            • আপনার ব্যাংক অ্যাপ/ইন্টারনেট ব্যাংকিং এ লগইন করুন
                          </li>
                          <li>
                            • নম্বর: <strong>01955554414</strong> (বিকাশ/নগদ) এ
                            টাকা পাঠান
                          </li>
                          <li>
                            • রেফারেন্স হিসেবে আপনার ভর্তি আইডি:{" "}
                            <strong>{admissionData.admissionId}</strong> লিখুন
                          </li>
                          <li>• ট্রানজেকশন স্লিপ/রিসিট সংরক্ষণ করুন</li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* Payment Details Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ট্রানজেকশন আইডি *
                      </label>
                      <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-green-500 focus:border-green-500"
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
                        max={getCurrentDate()}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>

                    {(paymentMethod === "bkash" ||
                      paymentMethod === "nagad") && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          আপনার মোবাইল নম্বর (যেখান থেকে পেমেন্ট করেছেন)
                        </label>
                        <input
                          type="text"
                          value={paymentNumber}
                          onChange={(e) => setPaymentNumber(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-green-500 focus:border-green-500"
                          placeholder="01XXXXXXXXX"
                        />
                      </div>
                    )}
                  </div>

                  {/* Important Note */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      <FaExclamationTriangle className="inline mr-1" />
                      <strong>দ্রষ্টব্য:</strong> ভুল ট্রানজেকশন আইডি দিলে আপনার
                      পেমেন্ট ভেরিফাই হতে সমস্যা হবে। সঠিক ট্রানজেকশন আইডি
                      প্রদান করুন।
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <FaIdCard className="text-blue-600 text-xl" />
                <h4 className="font-semibold text-gray-800 text-lg">
                  ভর্তি সারসংক্ষেপ
                </h4>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-600">ভর্তি আইডি:</span>
                  <span className="font-semibold">
                    {admissionData.admissionId}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-600">ছাত্র/ছাত্রীর নাম:</span>
                  <span className="font-semibold text-right">
                    {admissionData.fullName}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-600">কোর্স:</span>
                  <span className="font-semibold text-right">
                    {course.title}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-600">শ্রেণী:</span>
                  <span className="font-semibold">{course.class}</span>
                </div>

                <div className="pt-2 space-y-2">
                  <div className="flex justify-between">
                    <span>কোর্স ফি:</span>
                    <span className="font-semibold">
                      {course.fee.toLocaleString()} টাকা
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>রেজিস্ট্রেশন ফি:</span>
                    <span className="font-semibold">১,০০০ টাকা</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span className="text-green-600">মোট পরিশোধযোগ্য:</span>
                    <span className="text-green-600">
                      {totalAmount.toLocaleString()} টাকা
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={
                  loading || !transactionId || !paymentDate || !paymentMethod
                }
                className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    পেমেন্ট ভেরিফাই হচ্ছে...
                  </>
                ) : (
                  <>
                    পেমেন্ট নিশ্চিত করুন
                    <FaCheckCircle />
                  </>
                )}
              </button>

              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="w-full mt-3 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <FaArrowLeft />
                পূর্ববর্তী পেজে ফিরে যান
              </button>
            </div>

            {/* Support Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-2">
                সহায়তা প্রয়োজন?
              </h5>
              <p className="text-sm text-blue-700">
                পেমেন্ট সংক্রান্ত যেকোনো সমস্যায় কল করুন:
                <br />
                <strong>01955554414</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPayment;
