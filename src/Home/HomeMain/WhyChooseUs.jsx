import { FaUserGraduate, FaBookOpen, FaClock, FaStar, FaChalkboardTeacher, FaAward, FaUsers, FaChartLine } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaUserGraduate className="text-indigo-600 text-4xl" />,
      title: "দক্ষ শিক্ষকমণ্ডলী",
      desc: "আমাদের শিক্ষকরা বিষয়ভিত্তিক বিশেষজ্ঞ এবং অভিজ্ঞ, যারা প্রতিটি শিক্ষার্থীকে ব্যক্তিগতভাবে বুঝিয়ে শেখান",
      bgColor: "bg-indigo-50"
    },
    {
      icon: <FaBookOpen className="text-green-600 text-4xl" />,
      title: "আধুনিক সিলেবাস",
      desc: "নতুন শিক্ষাক্রম ও বোর্ড পরীক্ষার প্রশ্নপত্র অনুযায়ী হালনাগাদকৃত কোর্স ম্যাটেরিয়াল",
      bgColor: "bg-green-50"
    },
    {
      icon: <FaClock className="text-orange-600 text-4xl" />,
      title: "নমনীয় সময়সূচী",
      desc: "শিক্ষার্থীদের সুবিধামতো সময় নির্ধারণের সুযোগ সকাল ৮টা থেকে রাত ৯টা পর্যন্ত",
      bgColor: "bg-orange-50"
    },
    {
      icon: <FaStar className="text-yellow-500 text-4xl" />,
      title: "সাফল্যের রেকর্ড",
      desc: "গত ৫ বছরে আমাদের ৯৫% শিক্ষার্থী বিশ্ববিদ্যালয় ভর্তি পরীক্ষায় সাফল্য অর্জন করেছে",
      bgColor: "bg-yellow-50"
    },
    {
      icon: <FaChalkboardTeacher className="text-blue-600 text-4xl" />,
      title: "ব্যক্তিগত মনোযোগ",
      desc: "ছোট ব্যাচ সাইজ (১০-১২ জন) যাতে প্রত্যেক শিক্ষার্থীকে পর্যাপ্ত মনোযোগ দেওয়া যায়",
      bgColor: "bg-blue-50"
    },
    {
      icon: <FaAward className="text-purple-600 text-4xl" />,
      title: "প্রামাণিক সনদ",
      desc: "কোর্স সম্পন্নকারী শিক্ষার্থীদের জন্য স্বীকৃত সনদ প্রদান যা ভবিষ্যত শিক্ষায় সহায়ক",
      bgColor: "bg-purple-50"
    },
    {
      icon: <FaUsers className="text-teal-600 text-4xl" />,
      title: "পিয়ার লার্নিং",
      desc: "গ্রুপ স্টাডি ও ডিসকাশন সেশনের মাধ্যমে সহপাঠীদের কাছ থেকে শেখার সুযোগ",
      bgColor: "bg-teal-50"
    },
    {
      icon: <FaChartLine className="text-red-500 text-4xl" />,
      title: "নিয়মিত মূল্যায়ন",
      desc: "সাপ্তাহিক কুইজ, মাসিক টেস্ট ও মডেল টেস্টের মাধ্যমে অগ্রগতি নিরূপণ",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-blue-600">কেন</span> অধ্যয়ন কোচিং সেন্টার <span className="text-green-600">বেছে নেবেন?</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            আমরা শিক্ষার্থীদের সাফল্যের জন্য সর্বোত্তম শিক্ষার পরিবেশ নিশ্চিত করি
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div 
              key={index}
              className={`${item.bgColor} p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-white`}
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 text-center">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full font-medium hover:shadow-lg transition-all transform hover:scale-105">
            আমাদের সম্পর্কে আরও জানুন
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;