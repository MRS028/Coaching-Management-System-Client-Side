import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  FaCheck, 
  FaEdit, 
  FaArrowLeft,
  FaUser,
  FaSchool,
  FaMoneyBillWave,
  FaClock,
  FaArrowRight
} from "react-icons/fa";
import useScrolltoTop from "../../../Hooks/useScrolltoTop";
import AdmissionProgress from "./AdmissionProgress";

const AdmissionConfirmation = () => {
  useScrolltoTop();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(location.state?.admissionData || {});
  const course = location.state?.course;

  if (!formData || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">ডেটা পাওয়া যায়নি</h2>
          <button 
            onClick={() => navigate('/admission')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            ভর্তি ফর্মে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Form data already updated via state
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProceedToPayment = async () => {
    setLoading(true);
    try {
      // First save admission data to database with 'pending' status
      const submissionData = {
        ...formData,
        status: "pending",
        paymentStatus: "pending",
        submittedAt: new Date().toISOString()
      };

      const response = await fetch('http://localhost:5000/admissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.insertedId) {
        // Navigate to payment page
        navigate('/admission/payment', { 
          state: { 
            admissionData: submissionData,
            course: course
          } 
        });
      } else {
        throw new Error('Failed to save admission application');
      }
    } catch (error) {
      console.error('Error saving admission:', error);
      alert(`দুঃখিত, ভর্তি ফর্ম সেভ করা যায়নি: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = course.fee + 500; // Course fee + registration

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            তথ্য <span className="text-blue-600">পর্যালোচনা</span>
          </h1>
          <p className="text-lg text-gray-600">
            আপনার তথ্য পর্যালোচনা করুন এবং পেমেন্টের জন্য এগিয়ে যান
          </p>
        </div>
        
        <AdmissionProgress currentStep={2} />

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/admission')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaArrowLeft />
            ফর্মে ফিরে যান
          </button>
          
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              <FaEdit />
              তথ্য এডিট করুন
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <FaCheck />
              পরিবর্তন সেভ করুন
            </button>
          )}
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          {/* Student Information */}
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaUser className="text-blue-600" />
              ব্যক্তিগত তথ্য
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField 
                label="পুরো নাম" 
                value={formData.fullName} 
                field="fullName"
                isEditing={isEditing}
                onChange={handleInputChange}
              />
              <EditableField 
                label="ইমেইল" 
                value={formData.email} 
                field="email"
                isEditing={isEditing}
                onChange={handleInputChange}
              />
              <EditableField 
                label="মোবাইল নম্বর" 
                value={formData.phone} 
                field="phone"
                isEditing={isEditing}
                onChange={handleInputChange}
              />
              <EditableField 
                label="পিতার নাম" 
                value={formData.fatherName} 
                field="fatherName"
                isEditing={isEditing}
                onChange={handleInputChange}
              />
              <EditableField 
                label="মাতার নাম" 
                value={formData.motherName} 
                field="motherName"
                isEditing={isEditing}
                onChange={handleInputChange}
              />
              <EditableField 
                label="ঠিকানা" 
                value={formData.address} 
                field="address"
                isEditing={isEditing}
                onChange={handleInputChange}
                textarea
              />
            </div>
          </div>

          {/* Educational Information */}
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaSchool className="text-green-600" />
              শিক্ষাগত তথ্য
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField 
                label="বর্তমান শিক্ষাপ্রতিষ্ঠান" 
                value={formData.currentInstitution} 
                field="currentInstitution"
                isEditing={isEditing}
                onChange={handleInputChange}
              />
              <InfoField 
                label="শ্রেণী" 
                value={getClassLevelText(formData.classLevel)} 
              />
              <InfoField 
                label="কোর্স নাম" 
                value={course.title} 
              />
              <InfoField 
                label="কোর্স সময়" 
                value={course.duration} 
              />
              <InfoField 
                label="ব্যাচ সময়" 
                value={course.time} 
              />
              <InfoField 
                label="ক্লাসের দিন" 
                value={course.days} 
              />
              <EditableField 
                label="পূর্বের শিক্ষাগত যোগ্যতা" 
                value={formData.previousQualification || "প্রযোজ্য নয়"} 
                field="previousQualification"
                isEditing={isEditing}
                onChange={handleInputChange}
                textarea
                fullWidth
              />
            </div>
          </div>

          {/* Payment Information */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaMoneyBillWave className="text-purple-600" />
              পেমেন্ট তথ্য
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField label="কোর্স ফি" value={`${course.fee.toLocaleString()} টাকা`} />
                <InfoField label="রেজিস্ট্রেশন ফি" value="৫০০ টাকা" />
                <InfoField 
                  label="মোট পরিশোধযোগ্য" 
                  value={`${totalAmount.toLocaleString()} টাকা`} 
                  highlight 
                />
                <InfoField label="ভর্তি আইডি" value={formData.admissionId} />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <button
            onClick={() => navigate('/admission')}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <FaArrowLeft />
            ফর্মে ফিরে যান
          </button>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Important Note */}
            <div className="text-sm text-gray-600 text-center sm:text-right">
              <p>সকল তথ্য সঠিক কিনা নিশ্চিত হয়ে তারপর পেমেন্ট করুন</p>
            </div>

            {/* Proceed to Payment Button */}
            <button
              onClick={handleProceedToPayment}
              disabled={loading || isEditing}
              className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  সেভ করা হচ্ছে...
                </>
              ) : (
                <>
                  পেমেন্ট করুন
                  <FaArrowRight />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm text-center">
            <strong>দ্রষ্টব্য:</strong> পেমেন্ট সম্পন্ন হওয়ার পরেই আপনার ভর্তি প্রক্রিয়া সম্পূর্ণ হবে। 
            পেমেন্টের পর আপনি ভর্তি কনফার্মেশন রিসিট ডাউনলোড করতে পারবেন।
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper function to get class level text
const getClassLevelText = (classLevel) => {
  const classMap = {
    "4": "চতুর্থ শ্রেণী",
    "5": "পঞ্চম শ্রেণী",
    "6": "ষষ্ঠ শ্রেণী",
    "7": "সপ্তম শ্রেণী",
    "8": "অষ্টম শ্রেণী",
    "9": "নবম শ্রেণী",
    "10": "দশম শ্রেণী",
    "11": "একাদশ শ্রেণী",
    "12": "দ্বাদশ শ্রেণী",
    "university": "বিশ্ববিদ্যালয়"
  };
  return classMap[classLevel] || classLevel;
};

// Reusable Editable Field Component
const EditableField = ({ label, value, field, isEditing, onChange, textarea = false, fullWidth = false }) => (
  <div className={fullWidth ? "md:col-span-2" : ""}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {isEditing ? (
      textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder={`${label} লিখুন...`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder={`${label} লিখুন...`}
        />
      )
    ) : (
      <p className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 min-h-[42px] flex items-center">
        {value || <span className="text-gray-400">প্রদান করা হয়নি</span>}
      </p>
    )}
  </div>
);

// Reusable Read-only Field Component
const InfoField = ({ label, value, highlight = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <p className={`px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 min-h-[42px] flex items-center ${
      highlight ? 'text-green-600 font-bold text-lg bg-green-50 border-green-200' : ''
    }`}>
      {value}
    </p>
  </div>
);

export default AdmissionConfirmation;