import { Link } from "react-router-dom";
import { FaChalkboardTeacher, FaUsers, FaCertificate } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4 tracking-wide">স্বপ্ন পূরণের পথে তোমার সঙ্গী</h1>
          <p className="text-xl mb-6 leading-relaxed">আমরা তোমাকে উন্নতির পথে নিয়ে যাবো, যেখানে অধ্যবসায় ও সঠিক দিকনির্দেশনার সাথে তুমি সাফল্য অর্জন করতে পারবে।</p>
          <Link to="/courses" className="py-3 px-8 rounded-full text-lg font-semibold bg-yellow-500 hover:bg-yellow-600 transition transform hover:scale-105">
            কোর্স সমূহ দেখুন
          </Link>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-12">আমাদের সেবা</h2>
          <div className="grid grid-cols-1 text-gray-900 md:grid-cols-3 gap-12">
            {/* Service 1 */}
            <div className="bg-gray-100 p-10 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
              <FaChalkboardTeacher size={50} className="text-green-500 mb-6 mx-auto" />
              <h3 className="text-xl font-semibold mb-4">প্রফেশনাল শিক্ষকগণ</h3>
              <p className="text-gray-900">বিশ্বস্ত এবং অভিজ্ঞ শিক্ষকদের মাধ্যমে আমরা তোমাকে সর্বোত্তম শিক্ষা প্রদান করি।</p>
            </div>
            {/* Service 2 */}
            <div className="bg-gray-100 p-10 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
              <FaUsers size={50} className="text-blue-500 mb-6 mx-auto" />
              <h3 className="text-xl  font-semibold mb-4">বিশ্বস্ত শিক্ষার্থীরা</h3>
              < p className="text-gray-900">আমাদের শিক্ষার্থীরা শুধু পড়াশোনায় দক্ষ নয়, তারা বাস্তব জীবনে সফল হওয়ার জন্য প্রস্তুত।</p>
            </div>
            {/* Service 3 */}
            <div className="bg-gray-100 p-10 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
              <FaCertificate size={50} className="text-yellow-500 mb-6 mx-auto" />
              <h3 className="text-xl font-semibold mb-4">প্রামাণ্য সনদ</h3>
              <p className="text-gray-900">প্রতিটি কোর্স শেষে তোমাকে একটি প্রামাণ্য সনদ প্রদান করা হবে, যা তোমার দক্ষতা প্রমাণ করবে।</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-12">শিক্ষার্থীদের মতামত</h2>
          <div className="space-y-12">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto transform hover:scale-105 transition duration-300">
              <p className="text-lg text-gray-700 italic mb-4">
                {"অধ্যয়ন কোচিং সেন্টার আমাকে শুধু পড়াশোনায় দক্ষ করে তুলেনি, বরং জীবনের প্রতি দৃষ্টিভঙ্গিও বদলে দিয়েছে।"}
              </p>
              <p className="font-semibold text-gray-900">রহিম আহমেদ</p>
              <p className="text-sm text-gray-500">ইউনিভার্সিটি স্টুডেন্ট</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto transform hover:scale-105 transition duration-300">
              <p className="text-lg text-gray-700 italic mb-4">
                {"কোচিং সেন্টারের শিক্ষকরা অত্যন্ত অভিজ্ঞ এবং তাদের পাঠদানের পদ্ধতি খুবই সহজ এবং কার্যকর।"}
              </p>
              <p className="font-semibold text-gray-900">শান্তনা রায়</p>
              <p className="text-sm text-gray-500">এলিমেন্টারি স্কুল স্টুডেন্ট</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-semibold mb-4">আজই তোমার যাত্রা শুরু করো!</h2>
          <p className="text-xl mb-6 leading-relaxed">আমরা তোমাকে সঠিক দিকনির্দেশনা দেবো। একসাথে আমরা সফলতার শীর্ষে পৌঁছাবো।</p>
          <Link to="/auth/signup" className="py-3 px-8 rounded-full text-lg font-semibold bg-yellow-500 hover:bg-yellow-600 transition transform hover:scale-105">
            এখনই যুক্ত হোন
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
