import { Link } from "react-router-dom";
import { FaChalkboardTeacher, FaUsers, FaCertificate, FaBook, FaGraduationCap, FaChartLine, FaRegSmile, FaBookReader, FaLaptopCode, FaStar, FaClock, FaBookOpen, FaUserGraduate, FaPhoneAlt, FaArrowRight } from "react-icons/fa";
import { MdScience, MdComputer } from "react-icons/md";
import useScrolltoTop from "../../Hooks/useScrolltoTop";
import HomeBanner from "./HomeBanner";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  useScrolltoTop();
  return (
    <div className="bg-gray-50">
      {/* Keep the original banner */}
      <HomeBanner />
      
      {/* Hero Section with Stats */}
      <section className="relative py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-blue-600">স্বপ্ন</span> পূরণের পথে তোমার <span className="text-green-600">সঙ্গী</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              আমরা উন্নত শিক্ষা পদ্ধতি ও অভিজ্ঞ শিক্ষকদের মাধ্যমে তোমাকে সাফল্যের পথে এগিয়ে নিয়ে যাব
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <FaGraduationCap className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-800">500+</h3>
              <p className="text-gray-600">সফল শিক্ষার্থী</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <FaChalkboardTeacher className="text-3xl text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-800">25+</h3>
              <p className="text-gray-600">প্রশিক্ষিত শিক্ষক</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg text-center">
              <FaBook className="text-3xl text-yellow-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-800">50+</h3>
              <p className="text-gray-600">কোর্স সমূহ</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <FaChartLine className="text-3xl text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-800">95%</h3>
              <p className="text-gray-600">সাফল্যের হার</p>
            </div>
          </div>
          
          <div className="text-center">
            <Link
              to="/courses"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
            >
              আমাদের কোর্সসমূহ দেখুন
            </Link>
          </div>
        </div>
      </section>
      <section>
        <WhyChooseUs/>
      </section>

      {/* Features Section */}

      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-blue-600">আমাদের</span> বিশেষ <span className="text-green-600">সুবিধাসমূহ</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            শিক্ষার গুণগত মান উন্নয়নে আমরা প্রদান করি অনন্য সব সুবিধা
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-6">
              <FaChalkboardTeacher className="text-indigo-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">অভিজ্ঞ শিক্ষকমণ্ডলী</h3>
            <p className="text-gray-600 text-center">
              ১০+ বছর অভিজ্ঞতাসম্পন্ন বিষয়ভিত্তিক বিশেষজ্ঞ শিক্ষক দ্বারা পাঠদান
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
              <FaUsers className="text-green-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">ব্যক্তিগত মনোযোগ</h3>
            <p className="text-gray-600 text-center">
              সর্বোচ্চ ১২ জন শিক্ষার্থীর ছোট ব্যাচে পাঠদান, প্রত্যেককে ব্যক্তিগত কোচিং
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center mx-auto mb-6">
              <FaCertificate className="text-yellow-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">আধুনিক পাঠ্যক্রম</h3>
            <p className="text-gray-600 text-center">
              জাতীয় শিক্ষাক্রম ও বোর্ড পরীক্ষার সর্বশেষ সিলেবাস অনুসরণ করে প্রণীত
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
              <FaUserGraduate className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">সাফল্যের গ্যারান্টি</h3>
            <p className="text-gray-600 text-center">
              গত ৩ বছরে ৯২% শিক্ষার্থী এ+ পেয়েছে এবং ৮৫% টপ ইউনিভার্সিটিতে ভর্তি হয়েছে
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-6">
              <FaBookOpen className="text-purple-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">গবেষণামূলক উপকরণ</h3>
            <p className="text-gray-600 text-center">
              বছরের সর্বশেষ প্রশ্নব্যাংক, মডেল টেস্ট এবং বিশেষ গাইডলাইন সরবরাহ
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-6">
              <FaClock className="text-orange-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">নমনীয় সময়সূচী</h3>
            <p className="text-gray-600 text-center">
              সকাল ৮টা থেকে রাত ১০টা পর্যন্ত বিভিন্ন শিফটে ক্লাসের সুবিধা
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
              <FaStar className="text-teal-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">মডেল টেস্ট</h3>
            <p className="text-gray-600 text-center">
              মাসিক ফুল সিলেবাস মডেল টেস্ট এবং বোর্ড পরীক্ষার সিমুলেশন টেস্ট
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
              <FaChalkboardTeacher className="text-red-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">ডাউট ক্লিয়ারিং</h3>
            <p className="text-gray-600 text-center">
              প্রতিদিন আলাদা ডাউট ক্লিয়ারিং সেশন এবং অতিরিক্ত ক্লাসের সুবিধা
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full font-medium hover:shadow-lg transition-all transform hover:scale-105">
            ফ্রী ডেমো ক্লাসে যোগ দিন
          </button>
        </div>
      </div>
    </section>


      {/* Popular Courses */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">জনপ্রিয় কোর্সসমূহ</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-blue-500 h-40 flex items-center justify-center">
                <MdScience className="text-white text-5xl" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">বিজ্ঞান বিভাগ</h3>
                <p className="text-gray-600 mb-4">একাদশ-দ্বাদশ শ্রেণীর জন্য সম্পূর্ণ কোর্স</p>
                <Link to="/courses/science" className="text-blue-600 font-medium hover:underline">
                  বিস্তারিত জানুন →
                </Link>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-green-500 h-40 flex items-center justify-center">
                <MdComputer className="text-white text-5xl" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">কম্পিউটার প্রোগ্রামিং</h3>
                <p className="text-gray-600 mb-4">প্রাথমিক থেকে উন্নত পর্যায়ের কোর্স</p>
                <Link to="/courses/programming" className="text-green-600 font-medium hover:underline">
                  বিস্তারিত জানুন →
                </Link>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-purple-500 h-40 flex items-center justify-center">
                <FaBook className="text-white text-5xl" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">মানবিক বিভাগ</h3>
                <p className="text-gray-600 mb-4">একাদশ-দ্বাদশ শ্রেণীর জন্য সম্পূর্ণ কোর্স</p>
                <Link to="/courses/humanities" className="text-purple-600 font-medium hover:underline">
                  বিস্তারিত জানুন →
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/courses" className="inline-block px-6 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition">
              সব কোর্স দেখুন
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">শিক্ষার্থীদের কথা</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">র</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">রহিম আহমেদ</h4>
                  <p className="text-sm text-gray-500">ইউনিভার্সিটি স্টুডেন্ট</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "এই কোচিং সেন্টারের শিক্ষকদের ধৈর্য্য এবং পাঠদানের পদ্ধতি আমাকে গণিতে ভীতি কাটাতে সাহায্য করেছে। আজ আমি প্রকৌশল বিশ্ববিদ্যালয়ে ভর্তি হতে পেরেছি।"
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">স</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">সুমাইয়া ইসলাম</h4>
                  <p className="text-sm text-gray-500">মেডিকেল স্টুডেন্ট</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "বায়োলজি এবং কেমিস্ট্রিতে আমার দুর্বলতা ছিল। এখানকার বিশেষ ক্লাসগুলো এবং নিয়মিত মডেল টেস্ট আমাকে মেডিকেল কলেজে ভর্তি হতে সাহায্য করেছে।"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-screen filter blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-green-400 rounded-full mix-blend-screen filter blur-2xl animate-float-delay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-400 bg-opacity-20 rounded-full text-sm font-medium">
            <FaStar className="mr-2 text-yellow-300" />
            ৫০০+ শিক্ষার্থী সাফল্য অর্জন করেছে
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          <span className="block">আপনার সাফল্যের গল্প</span>
          <span className="text-yellow-300">আমাদের সাথে শুরু হোক</span>
        </h2>
        
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
          বাংলাদেশের শীর্ষস্থানীয় শিক্ষাপ্রতিষ্ঠানগুলোর মধ্যে আমরা অগ্রগণ্য। আমাদের বিশেষায়িত পাঠদান পদ্ধতি আপনাকে পরীক্ষায় সাফল্য পেতে সাহায্য করবে।
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
          <Link
            to="/admission"
            className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 text-lg"
          >
            <FaUserGraduate className="text-blue-700" />
            ভর্তি প্রক্রিয়া শুরু করুন
            <FaArrowRight className="ml-1" />
          </Link>
          
          <Link
            to="/contact"
            className="px-8 py-4 border-2 hover:transition-all  border-white text-white rounded-full font-semibold hover:bg-gray-400 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 text-lg"
          >
            <FaPhoneAlt />
            ফ্রী কাউন্সেলিং বুক করুন
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-400 bg-opacity-10 p-6 rounded-xl backdrop-blur-sm border border-none border-opacity-20">
            <FaChalkboardTeacher className="text-3xl mx-auto mb-3 text-yellow-300" />
            <h3 className="font-bold text-lg mb-1">১৫+ অভিজ্ঞ শিক্ষক</h3>
            <p className="text-sm opacity-90">বিষয়ভিত্তিক বিশেষজ্ঞ</p>
          </div>
          <div className="bg-gray-400  bg-opacity-10 p-6 rounded-xl backdrop-blur-sm border border-none border-opacity-20">
            <FaUsers className="text-3xl mx-auto mb-3 text-blue-300" />
            <h3 className="font-bold text-lg mb-1">৯৫% সাফল্য হার</h3>
            <p className="text-sm opacity-90">বিশ্ববিদ্যালয় ভর্তিতে</p>
          </div>
          <div className="bg-gray-400  bg-opacity-10 p-6 rounded-xl backdrop-blur-sm border border-none border-opacity-20 col-span-2 md:col-span-1">
            <FaStar className="text-3xl mx-auto mb-3 text-green-300" />
            <h3 className="font-bold text-lg mb-1">১০০% সন্তুষ্টি</h3>
            <p className="text-sm opacity-90">শিক্ষার্থী ও অভিভাবকদের</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 10s ease-in-out infinite 2s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </section>
    </div>
  );
};

export default Home;