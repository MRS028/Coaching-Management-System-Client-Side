import { Link } from "react-router-dom";
import { FaTools, FaHardHat, FaHome, FaEnvelope, FaClock, FaRocket } from "react-icons/fa";

const UnderConstruction = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center">
        {/* Animated Construction Icon */}
        <div className="mb-8 relative">
          <div className="relative inline-block">
            <FaHardHat className="text-8xl text-orange-500 mb-4 animate-bounce" />
            <FaTools className="text-4xl text-gray-600 absolute -top-2 -right-2 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* Construction Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-orange-200">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-4 animate-pulse">
              <FaClock className="inline mr-2" />
              চলমান কাজ
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            পেজটি নির্মাণাধীন
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-6">
            শীঘ্রই আসছে!
          </h2>
          
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            আমরা এই মুহূর্তে এই পেজটি উন্নয়ন করছি। কিছুক্ষণ পর আবার চেষ্টা করুন 
            অথবা নিচের বিকল্পগুলো ব্যবহার করুন।
          </p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>নির্মাণের অগ্রগতি</span>
              <span>৭৫% সম্পূর্ণ</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-orange-500 h-3 rounded-full animate-pulse"
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <FaRocket className="text-2xl text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800">আধুনিক ডিজাইন</h3>
              <p className="text-sm text-blue-600 mt-1">সবচেয়ে আধুনিক টেকনোলজি ব্যবহার করা হচ্ছে</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <FaTools className="text-2xl text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">অপ্টিমাইজেশন</h3>
              <p className="text-sm text-green-600 mt-1">সর্বোচ্চ পারফরম্যান্সের জন্য অপ্টিমাইজ করা হচ্ছে</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <FaClock className="text-2xl text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-800">দ্রুত আসছে</h3>
              <p className="text-sm text-purple-600 mt-1">অনেক দ্রুত এই পেজটি চালু হবে</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 font-medium gap-2"
            >
              <FaHome />
              হোমপেজে ফিরে যান
            </Link>
            
            <Link
              to="/courses"
              className="inline-flex items-center justify-center px-6 py-3 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 transition-all duration-300 font-medium gap-2"
            >
              আমাদের কোর্সসমূহ
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium gap-2"
            >
              <FaEnvelope />
              যোগাযোগ করুন
            </Link>
          </div>

          {/* Countdown/Notification */}
          <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-amber-800 text-sm">
              <strong>সতর্কতা:</strong> এই পেজটি বর্তমানে উন্নয়নাধীন রয়েছে। 
              সম্পূর্ণ হওয়ার পর আপনাকে স্বয়ংক্রিয়ভাবে জানানো হবে।
            </p>
          </div>
        </div>

        {/* Animated Construction Elements */}
        <div className="mt-8 flex justify-center space-x-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="w-3 h-3 bg-orange-400 rounded-full animate-bounce"
              style={{ animationDelay: `${item * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;