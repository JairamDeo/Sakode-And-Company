import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../assets/Logo.webp"; // Replace with your PNG logo path.

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with default duration
    AOS.refresh(); // Refresh AOS on initial load
  }, []);

  // Update active link when the page scrolls or navigates
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "category", "aboutus", "contactus"];
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveLink(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on component mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (target) => {
    if (location.pathname !== "/") {
      // Redirect to the homepage if not on it
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      setActiveLink(target);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 sm:px-0 lg:px-20 py-4 flex items-center justify-between h-[80px]">
        {/* Logo */}
        <div>
          <img src={logo} alt="Logo" className="w-[220px] h-[70px] object-fit" />
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex space-x-8 uppercase">
          {["home", "category", "aboutus", "contactus"].map((item) => (
            <ScrollLink
              key={item}
              to={item}
              smooth
              duration={500}
              spy
              onClick={() => handleNavClick(item)}
              className={`cursor-pointer font-semibold text-black ${
                activeLink === item
                  ? "text-orange-600 border-b-2 border-orange-400"
                  : "hover:text-orange-600"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1).replace("us", " Us")}
            </ScrollLink>
          ))}
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <FaSearch className="text-black" />
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <FaTimes size={24} className="text-black" />
            ) : (
              <FaBars size={24} className="text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="absolute top-[80px] left-0 w-full bg-white flex flex-col py-4 px-6 shadow-lg z-40"
          onClick={closeMenu}
        >
          {["home", "category", "aboutus", "contactus"].map((item) => (
            <ScrollLink
              key={item}
              to={item}
              smooth
              duration={500}
              spy
              onClick={() => handleNavClick(item)}
              className={`cursor-pointer uppercase py-2 px-4 text-lg rounded-lg ${
                activeLink === item
                  ? "text-orange-600 font-semibold bg-orange-50"
                  : "text-black hover:text-orange-600"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1).replace("us", " Us")}
            </ScrollLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
