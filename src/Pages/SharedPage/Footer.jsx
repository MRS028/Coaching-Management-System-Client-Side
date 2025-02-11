import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-white">অধ্যয়ন কোচিং সেন্টার</h2>
            <p className="mt-2 text-sm">
            পরিশ্রম কখনো ব্যর্থ হয় না, সফলতা অবশ্যই আসবে, তুমি শুধু চেষ্টা চালিয়ে যাও। তোমার স্বপ্ন পুরণে আমরা অঙ্গিকারবদ্ধ ।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">লিংক সমূহ</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="hover:text-blue-400">
                  কোর্স সমূহ
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400">
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400">
                  যোগাযোগ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">যোগাযোগ</h3>
            <div className="flex space-x-4">
              <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} className="hover:text-blue-500" />
              </Link>
              <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} className="hover:text-pink-500" />
              </Link>
              <Link to="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube size={24} className="hover:text-red-500" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm">
          © {new Date().getFullYear()} অধ্যয়ন কোচিং সেন্টার,সাভার | সর্বস্বত্ব সংরক্ষিত
        </div>
      </div>
    </footer>
  );
};

export default Footer;
