import React, { useState } from 'react';

const ReviewModal = ({ isOpen, onClose, backendUrl }) => {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0); // Start with 0 rating (no stars selected)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleStarClick = (star) => {
    // If the same star is clicked again, toggle it off along with all higher stars
    if (star === rating) {
      setRating(star - 1);
    } else {
      setRating(star);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !review.trim()) {
      setMessage({ type: 'error', text: 'Please fill all fields' });
      return;
    }
    
    if (rating === 0) {
      setMessage({ type: 'error', text: 'Please select a rating' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use the imported backendUrl directly
      const response = await fetch(`${backendUrl}/api/reviews/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          review,
          rating
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Review submitted successfully!' });
        // Reset form
        setName('');
        setReview('');
        setRating(0);
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          window.location.reload(); // Refresh to show new review
        }, 2000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to submit review' });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-4xl overflow-hidden">
        <div className="flex h-full">
          {/* Left side image */}
          <div className="hidden md:block w-1/3 bg-gray-100">
            <div className="h-full flex items-center justify-center">
              <img 
                src="/api/placeholder/300/500" 
                alt="Customer review" 
                className="object-cover h-full" 
              />
            </div>
          </div>
          
          {/* Right side form */}
          <div className="w-full md:w-2/3 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Write a Review</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {message.text && (
              <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message.text}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                  Rating
                </label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      className="text-2xl focus:outline-none mr-1"
                    >
                      {star <= rating ? '⭐' : '☆'}
                    </button>
                  ))}
                </div>
                {rating === 0 && (
                  <p className="text-xs text-gray-500 mt-1">Click on stars to select your rating</p>
                )}
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review">
                  Your Review
                </label>
                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="4"
                  placeholder="Tell us about your experience..."
                  required
                ></textarea>
              </div>
              
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-6 border-2 border-orange-600 rounded-md font-medium hover:bg-orange-600 hover:text-white transition duration-500 ease-in-out"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;