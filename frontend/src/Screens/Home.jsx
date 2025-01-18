import React, { useState, useEffect } from "react";
import banner1 from "../assets/zareebanner.jpg";
import banner4 from "../assets/syntheticbanner.jpg";
import banner2 from "../assets/cottonbanner.jpg";
import banner3 from "../assets/shalubanner.jpg";
import banner5 from "../assets/fancybanner.jpg";

const Home = () => {
  const banners = [banner1, banner2, banner3, banner4, banner5];
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = 4000; // Auto-slide interval in milliseconds

  let touchStartX = 0; // Start position of touch
  let touchEndX = 0; // End position of touch

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
  };

  // Auto-Slide Functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, slideInterval);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Touch Gesture Functionality
  const handleTouchStart = (event) => {
    touchStartX = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left
      handleNext();
    } else if (touchEndX - touchStartX > 50) {
      // Swipe right
      handlePrev();
    }
  };

  return (
    <section
      id="home"
      className="w-full h-screen relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel */}
      <div className="relative h-full">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={banner}
              alt={`Slide ${index + 1}`}
              className="w-full h-full bg-cover"
            />
          </div>
        ))}
      </div>

      {/* Controls (hidden on mobile) */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none lg:p-3 hidden lg:block"
      >
        <span className="sr-only">Previous</span>
        &#9664;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none lg:p-3 hidden lg:block"
      >
        <span className="sr-only">Next</span>
        &#9654;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Home;
