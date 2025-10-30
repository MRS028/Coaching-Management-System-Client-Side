import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { 
  FaUser, 
  FaPhone, 
  FaEnvelope, 
  FaSchool, 
  FaBook, 
  FaMoneyBillWave,
  FaCreditCard,
  FaCheckCircle,
  FaArrowLeft,
  FaPrint,
  FaIdCard,
  FaCalendarAlt
} from "react-icons/fa";
import { MdPayment, MdPersonalVideo } from "react-icons/md";
import useCourses from "../../../Hooks/useCourses";

const Admission = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [admissionData, setAdmissionData] = useState(null);
  const [courses, refetch] = useCourses();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

 
  const selectedCourse = courses.find(course => course._id === watch("courseId"));

  const generateAdmissionId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `ADM${timestamp}${random}`;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const admissionId = generateAdmissionId();
      
      const admissionPayload = {
        ...data,
        admissionId,
        status: "pending",
        admissionDate: new Date().toISOString(),
        courseFee: selectedCourse?.fee || 0,
        paymentStatus: "pending",
        courseName: selectedCourse?.title,
        className: selectedCourse?.class,
        courseDuration: selectedCourse?.duration,
        batchTime: selectedCourse?.time,
        classDays: selectedCourse?.days,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Save to database using NEW admission endpoint
      const response = await fetch('http://localhost:5000/admissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(admissionPayload),
      });

      const result = await response.json();

      if (result.success) {
        setAdmissionData(admissionPayload);
        setStep(3); // Move to payment step
      } else if (result.error) {
        throw new Error(result.message);
      } else {
        throw new Error('Failed to submit admission application');
      }
    } catch (error) {
      console.error('Error submitting admission:', error);
      alert(`দুঃখিত, ভর্তি ফর্ম জমা দেওয়া যায়নি: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Simulate payment processing
      setTimeout(async () => {
        try {
          // Update payment status in database
          await updatePaymentStatus();
          setStep(4); // Move to success step
        } catch (error) {
          alert('পেমেন্ট স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে।');
        } finally {
          setLoading(false);
        }
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      alert('পেমেন্ট প্রক্রিয়ায় সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।');
      setLoading(false);
    }
  };

  const updatePaymentStatus = async () => {
    try {
      const response = await fetch(`http://localhost:5000/admissions/${admissionData.admissionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentStatus: 'Pending',
          status: 'Pending',
          paymentDate: new Date().toISOString()
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const renderStep1 = () => (
    <div className="space-y-6">
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
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ইমেইল *
            </label>
            <input
              type="email"
              {...register("email", { 
                required: "ইমেইল আবশ্যক",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "সঠিক ইমেইল দিন"
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
                  message: "সঠিক মোবাইল নম্বর দিন"
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="01XXXXXXXXX"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              পিতার নাম *
            </label>
            <input
              type="text"
              {...register("fatherName", { required: "পিতার নাম আবশ্যক" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="পিতার নাম লিখুন"
            />
            {errors.fatherName && (
              <p className="text-red-500 text-sm mt-1">{errors.fatherName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              মাতার নাম *
            </label>
            <input
              type="text"
              {...register("motherName", { required: "মাতার নাম আবশ্যক" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="মাতার নাম লিখুন"
            />
            {errors.motherName && (
              <p className="text-red-500 text-sm mt-1">{errors.motherName.message}</p>
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
              {...register("currentInstitution", { required: "শিক্ষাপ্রতিষ্ঠানের নাম আবশ্যক" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="বিদ্যালয়/কলেজের নাম"
            />
            {errors.currentInstitution && (
              <p className="text-red-500 text-sm mt-1">{errors.currentInstitution.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              শ্রেণী *
            </label>
            <select
              {...register("classLevel", { required: "শ্রেণী নির্বাচন করুন" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">শ্রেণী নির্বাচন করুন</option>
              <option value="9">নবম শ্রেণী</option>
              <option value="10">দশম শ্রেণী</option>
              <option value="11">একাদশ শ্রেণী</option>
              <option value="12">দ্বাদশ শ্রেণী</option>
              <option value="university">বিশ্ববিদ্যালয়</option>
            </select>
            {errors.classLevel && (
              <p className="text-red-500 text-sm mt-1">{errors.classLevel.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              কোর্স নির্বাচন করুন *
            </label>
            <select
              {...register("courseId", { required: "কোর্স নির্বাচন করুন" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">কোর্স নির্বাচন করুন</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.title} - {course.fee} টাকা
                </option>
              ))}
            </select>
            {errors.courseId && (
              <p className="text-red-500 text-sm mt-1">{errors.courseId.message}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
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

      <div className="flex justify-end pt-6">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          পরবর্তী ধাপ
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          ভর্তি তথ্য পর্যালোচনা
        </h3>
        <p className="text-yellow-700">
          দয়া করে আপনার তথ্যগুলো সঠিক কিনা পরীক্ষা করে নিন। ভুল তথ্য দেওয়া হলে ভর্তি বাতিল হতে পারে।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800 border-b pb-2">ব্যক্তিগত তথ্য</h4>
          <div className="space-y-2">
            <p><strong>নাম:</strong> {watch("fullName")}</p>
            <p><strong>ইমেইল:</strong> {watch("email")}</p>
            <p><strong>মোবাইল:</strong> {watch("phone")}</p>
            <p><strong>পিতার নাম:</strong> {watch("fatherName")}</p>
            <p><strong>মাতার নাম:</strong> {watch("motherName")}</p>
            <p><strong>ঠিকানা:</strong> {watch("address")}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800 border-b pb-2">শিক্ষাগত তথ্য</h4>
          <div className="space-y-2">
            <p><strong>শিক্ষাপ্রতিষ্ঠান:</strong> {watch("currentInstitution")}</p>
            <p><strong>শ্রেণী:</strong> {watch("classLevel")}</p>
            <p><strong>কোর্স:</strong> {selectedCourse?.title}</p>
            <p><strong>কোর্স ফি:</strong> {selectedCourse?.fee} টাকা</p>
            <p><strong>কোর্স সময়:</strong> {selectedCourse?.duration}</p>
            {selectedCourse?.time && <p><strong>ব্যাচ টাইম:</strong> {selectedCourse.time}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
        >
          <FaArrowLeft />
          পূর্ববর্তী ধাপ
        </button>
        
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
          className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? "জমা দেওয়া হচ্ছে..." : "ভর্তি ফর্ম জমা দিন"}
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <FaCheckCircle className="text-blue-600 text-xl" />
          <h3 className="text-lg font-semibold text-blue-800">
            ভর্তি আবেদন সফল!
          </h3>
        </div>
        <p className="text-blue-700">
          আপনার ভর্তি আবেদন সফলভাবে জমা হয়েছে। এখন পেমেন্ট সম্পন্ন করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h4 className="font-semibold text-gray-800 text-lg">পেমেন্ট মাধ্যম নির্বাচন করুন</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-blue-500 rounded-lg p-4 cursor-pointer hover:bg-blue-50 transition-colors">
              <div className="flex items-center gap-3">
                <MdPayment className="text-3xl text-blue-600" />
                <div>
                  <h5 className="font-semibold">বিকাশ</h5>
                  <p className="text-sm text-gray-600">মোবাইল ব্যাংকিং</p>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <FaCreditCard className="text-3xl text-gray-600" />
                <div>
                  <h5 className="font-semibold">কার্ড</h5>
                  <p className="text-sm text-gray-600">ডেবিট/ক্রেডিট কার্ড</p>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <MdPersonalVideo className="text-3xl text-gray-600" />
                <div>
                  <h5 className="font-semibold">ব্যাংক</h5>
                  <p className="text-sm text-gray-600">অনলাইন ব্যাংকিং</p>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <FaMoneyBillWave className="text-3xl text-gray-600" />
                <div>
                  <h5 className="font-semibold">নগদ</h5>
                  <p className="text-sm text-gray-600">অফিসে নগদ প্রদান</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h5 className="font-semibold mb-4">বিকাশের মাধ্যমে পেমেন্ট</h5>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2 font-bold"><strong>বিকাশ নম্বর:</strong> 01966601000</p>
                <p className="text-sm text-gray-700 mb-2"><strong>টাইপ:</strong> Payment</p>
                <p className="text-sm text-gray-700"><strong>রেফারেন্স:</strong> আপনার ভর্তি আইডি ({admissionData?.admissionId})</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ট্রানজেকশন আইডি *
                </label>
                <input
                  type="text"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaIdCard className="text-blue-600" />
              <h4 className="font-semibold text-gray-800">ভর্তি সারসংক্ষেপ</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>ভর্তি আইডি:</span>
                <span className="font-semibold">{admissionData?.admissionId}</span>
              </div>
              <div className="flex justify-between">
                <span>কোর্স ফি:</span>
                <span className="font-semibold">{selectedCourse?.fee} টাকা</span>
              </div>
              <div className="flex justify-between">
                <span>রেজিস্ট্রেশন ফি:</span>
                <span className="font-semibold">500 টাকা</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">মোট:</span>
                <span className="font-semibold text-green-600">
                  {selectedCourse ? selectedCourse.fee + 500 : 0} টাকা
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? "পেমেন্ট প্রক্রিয়াধীন..." : "পেমেন্ট সম্পন্ন করুন"}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              পরে পেমেন্ট করব
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="text-center space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 max-w-2xl mx-auto">
        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          ভর্তি প্রক্রিয়া সফলভাবে সম্পন্ন হয়েছে!
        </h2>
        <p className="text-green-700 mb-4">
          আপনাকে স্বাগতম! আপনার ভর্তি প্রক্রিয়া সফলভাবে সম্পন্ন হয়েছে।
        </p>
        
        <div className="bg-white rounded-lg p-6 text-left max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <FaIdCard className="text-blue-600 text-xl" />
            <h4 className="font-semibold text-gray-800 text-lg">ভর্তি তথ্য</h4>
          </div>
          <div className="space-y-2">
            <p><strong>ভর্তি আইডি:</strong> {admissionData?.admissionId}</p>
            <p><strong>নাম:</strong> {admissionData?.fullName}</p>
            <p><strong>কোর্স:</strong> {admissionData?.courseName}</p>
            <p><strong>মোবাইল:</strong> {admissionData?.phone}</p>
            <p><strong>স্ট্যাটাস:</strong> <span className="text-green-600">ভর্তি সম্পন্ন</span></p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>পরবর্তী ধাপ:</strong> আমাদের অফিস থেকে শীঘ্রই আপনার সাথে যোগাযোগ করা হবে। 
            ক্লাস শুরুর তারিখ ও সময় সম্পর্কে আপনাকে জানানো হবে।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <FaPrint />
            প্রিন্ট করুন
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            হোমপেজে ফিরে যান
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-blue-600">ভর্তি</span> ফর্ম
          </h1>
          <p className="text-xl text-gray-600">
            আপনার শিক্ষার যাত্রা শুরু করুন আমাদের সাথে
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNumber
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`w-24 h-1 ${
                      step > stepNumber ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>ব্যক্তিগত তথ্য</span>
            <span>নিশ্চিতকরণ</span>
            <span>পেমেন্ট</span>
            <span>সম্পন্ন</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admission;