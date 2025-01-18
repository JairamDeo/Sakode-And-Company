import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram } from "react-icons/fa";
import { ChevronRight } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (target) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 overflow-hidden">
      <div className="container mx-auto px-6 sm:px-0 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-x-8 xl:gap-x-12">
          {/* Company Column */}
          <div className="space-y-4" data-aos="fade-right" data-aos-duration="1000">
            <h2 className="text-xl lg:text-2xl font-bold text-orange-400">Sakode & Company</h2>
            <p className="text-gray-400 leading-relaxed">
              Redefining saree shopping with premium quality and impeccable service for all your needs.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link
                to="https://www.facebook.com/share/Koc7CNvv4KntRNYf/?mibextid=LQQJ4d"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:bg-blue-600 group-hover:scale-110 group-hover:rotate-12" data-aos='flip-right' data-aos-delay='500'>
                  <FaFacebookF className="text-2xl text-white transition-all duration-300 group-hover:scale-110" />
                </div>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Facebook
                </span>
              </Link>
              <Link
                to="https://www.instagram.com/sakode_co/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 group-hover:scale-110 group-hover:-rotate-12" data-aos='flip-right' data-aos-delay='1000'>
                  <FaInstagram className="text-2xl text-white transition-all duration-300 group-hover:scale-110" />
                </div>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-br from-pink-500 to-red-500 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Instagram
                </span>
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <h3 className="text-lg lg:text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["home", "category", "aboutus", "contactus"].map((item) => (
                <li key={item}>
                  <ScrollLink
                    to={item}
                    smooth
                    duration={500}
                    onClick={() => handleNavClick(item)}
                    className="text-gray-400 hover:text-orange-400 cursor-pointer transition-colors flex items-center group"
                  >
                    <ChevronRight
                      className="mr-1 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                    />
                    {item.charAt(0).toUpperCase() + item.slice(1).replace("us", " Us")}
                  </ScrollLink>
                </li>

              ))}

              {["/admin/upload"].map((item) => (
                <li key={item}>
                  <Link
                    to={item}
                    className="text-gray-400 hover:text-orange-400 cursor-pointer transition-colors flex items-center group"
                  >
                    <ChevronRight
                      className="mr-1 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                    />
                    {item.slice(0).replace("/admin/upload", " Admin")}
                  </Link>
                </li>

              ))}

            </ul>
          </div>

          {/* Useful Links Column */}
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
            <h3 className="text-lg lg:text-xl font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              {["synthetic", "zari", "cotton", "shalu", "fancy"].map((item) => (
                <li key={item}>
                  <Link
                    to={item}
                    smooth
                    duration={500}
                    className="text-gray-400 hover:text-orange-400 cursor-pointer transition-colors flex items-center group"
                  >
                    <ChevronRight
                      className="mr-1 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                    />
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Contact Us Column */}
          <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="600">
            <h3 className="text-lg lg:text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="tel:+919307146830"
                  className="flex items-center space-x-3 group hover:text-orange-400 transition-colors"
                >
                  <FaPhone className="text-orange-400 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-400 group-hover:text-orange-400">+91 9307146830</span>
                </Link>
              </li>
              <li>
                <Link
                  to="mailto:tradevistasnc@gmail.com"
                  className="flex items-center space-x-3 group hover:text-orange-400 transition-colors"
                >
                  <FaEnvelope className="text-orange-400 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-400 group-hover:text-orange-400">tradevistasnc@gmail.com</span>
                </Link>
              </li>
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-orange-400 mt-1 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  Patthhar Phod Darwaja, Near Nagpur Freight Carrier Jalalpura, Central Avenue Road Gandhibagh, Nagpur, Maharashtra - 440002
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400 text-sm md:text-base lg:text-sm">
            © {new Date().getFullYear()} Sakode & Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
