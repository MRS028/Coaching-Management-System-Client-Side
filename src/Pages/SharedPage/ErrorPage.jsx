import { useRouteError, Link, useNavigate } from "react-router-dom";
import { FaHome, FaArrowLeft, FaExclamationTriangle, FaRedo } from "react-icons/fa";
import { useEffect } from "react";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error("Error details:", error);

  // Safe error message extraction
  const getErrorMessage = () => {
    if (!error) return "আপনার কাঙ্ক্ষিত পেজটি পাওয়া যায়নি।";
    
    if (error.statusText) return error.statusText;
    if (error.message) return error.message;
    if (error.data) return error.data;
    
    return "পৃষ্ঠাটি লোড করতে সমস্যা হচ্ছে";
  };

  const getErrorStatus = () => {
    if (!error) return "404";
    
    if (error.status) return error.status;
    if (error.response?.status) return error.response.status;
    
    return "404";
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Icon */}
        <div className="mb-8">
          <div className="relative inline-block">
            <FaExclamationTriangle className="text-8xl text-yellow-500 mb-4 animate-bounce" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Error Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">
            {getErrorStatus()}
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
            ওহো! কিছু একটা সমস্যা হয়েছে
          </h2>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 font-medium">
              {getErrorMessage()}
            </p>
          </div>

          <p className="text-gray-600 mb-8 text-lg">
            দুঃখিত, আপনি যে পেজটি এক্সেস করতে চাচ্ছেন তা পাওয়া যাচ্ছে না বা কিছু সমস্যা হয়েছে।
          </p>

          {/* Debug Information (only in development) */}
          {import.meta.env.DEV && error && (
            <details className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
              <summary className="cursor-pointer font-semibold text-gray-700">
                Developer Details (Development Only)
              </summary>
              <pre className="text-xs text-gray-600 mt-2 overflow-auto">
                {JSON.stringify(error, null, 2)}
              </pre>
            </details>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 font-medium gap-2"
            >
              <FaHome />
              হোমপেজে ফিরে যান
            </Link>
            
            <button
              onClick={handleGoBack}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium gap-2"
            >
              <FaArrowLeft />
              পূর্ববর্তী পেজ
            </button>

            <button
              onClick={handleRetry}
              className="inline-flex items-center justify-center px-6 py-3 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-all duration-300 font-medium gap-2"
            >
              <FaRedo />
              আবার চেষ্টা করুন
            </button>
          </div>

          {/* Additional Help */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800 text-sm">
              যদি আপনি মনে করেন এটি একটি ত্রুটি, অনুগ্রহ করে আমাদের{" "}
              <Link to="/contact" className="font-semibold underline hover:text-blue-600">
                সহায়তা কেন্দ্র
              </Link>
              {" "}এ যোগাযোগ করুন।
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"
              style={{ animationDelay: `${item * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;