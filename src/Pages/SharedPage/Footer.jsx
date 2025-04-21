import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-white">Oddhayon Coaching Center</h2>
            <p className="mt-2 text-sm">
              Hard work never fails, success will surely come, you just need to keep trying. We are committed to helping you achieve your dreams.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="hover:text-blue-400">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Contact Us</h3>
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
          <p>© {new Date().getFullYear()} Study Coaching Center, Savar | All rights reserved</p>
          <p className="mt-1 text-gray-400">
            Developed by <span className="text-amber-400 font-semibold"><a href="https://www.facebook.com/sheikh.rifat.28">Md. Rifat Sheikh</a></span> <br  className="lg:hidden sm:flex"/>Senior Teacher, Oddhayon Coaching Center
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
