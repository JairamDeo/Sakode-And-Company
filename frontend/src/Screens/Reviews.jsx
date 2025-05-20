import React, { useState, useEffect, useRef } from 'react';
import Marquee from 'react-fast-marquee';
import ReviewModal from './ReviewModal';

const ReviewCard = ({ name, initial, review, rating }) => {
  return (
    <div className="p-4 w-72 shadow-md rounded-lg border bg-white">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-lg font-bold text-gray-700">{initial}</span>
        </div>
        <h3 className="font-semibold text-lg">{name}</h3>
      </div>
      <div className="text-yellow-500 text-sm">
        {Array(rating).fill('⭐').join('')}
      </div>
      <p className="mt-2 text-gray-600 text-sm">{review}</p>
    </div>
  );
};

export default function Reviews() {
  // Get backendUrl directly from import.meta to avoid undefined errors
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noReviews, setNoReviews] = useState(false);
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    // Fetch reviews from backend when component mounts
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/reviews`);
        const data = await response.json();
        
        if (data.success && data.reviews.length > 0) {
          // Sort reviews by rating (highest first), then by date (newest first) for same ratings
          const sortedReviews = data.reviews.sort((a, b) => {
            if (b.rating !== a.rating) {
              return b.rating - a.rating; // Sort by rating first
            }
            // If ratings are equal, sort by date (newest first)
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setReviews(sortedReviews);
        } else {
          // If no reviews found
          setNoReviews(true);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setNoReviews(true);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [backendUrl]);

  return (
    <section id="reviews" className="py-16 px-6 lg:px-20">
      <h2 className="text-4xl font-bold mb-12 text-center uppercase font-comic">Customer Reviews</h2>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : noReviews || reviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No reviews yet. Be the first to leave a review!</p>
        </div>
      ) : (
        <>
          <div 
            ref={containerRef}
            className="overflow-hidden"
          >
            <Marquee
              ref={marqueeRef}
              pauseOnHover
              speed={50}
              gradient
              gradientWidth={60}
              direction="left"
              play={true}
              loop={0}
            >
              <div className="flex gap-8">
                {/* Duplicating list to make it loop longer */}
                {[...reviews, ...reviews].map((review, index) => (
                  <ReviewCard
                    key={index}
                    name={review.name}
                    initial={review.name.charAt(0).toUpperCase()}
                    review={review.review}
                    rating={review.rating}
                  />
                ))}
              </div>
            </Marquee>
          </div>
        </>
      )}
      
      {/* Write a Review Button */}
      <div className="flex justify-center mt-12">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="py-3 px-8 border-2 border-orange-600 rounded-md font-medium hover:bg-orange-600 hover:text-white transition duration-500 ease-in-out"
        >
          Write a Review
        </button>
      </div>
      
      {/* Review Modal */}
      <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        backendUrl={backendUrl}
      />
    </section>
  );
}