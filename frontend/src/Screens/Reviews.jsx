import React from 'react';
import Marquee from 'react-fast-marquee';

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
  const reviews = [
    {
      name: 'Aarushi Patel',
      initial: 'A',
      review: 'Loved the fabric quality and the intricate designs. Definitely buying again!',
      rating: 5,
    },
    {
      name: 'Ritika Sharma',
      initial: 'R',
      review: 'Beautiful collection! The color was slightly different, but still gorgeous.',
      rating: 5,
    },
    {
      name: 'Sneha Verma',
      initial: 'S',
      review: 'Absolutely stunning! The saree was exactly as shown in the pictures.',
      rating: 5,
    },
  ];

  return (
    <section id="reviews" className="py-16 px-6 lg:px-20">
      <h2 className="text-4xl font-bold mb-12 text-center uppercase font-comic">Customer Reviews</h2>
      
      <Marquee
        pauseOnHover
        speed={50}
        gradient
        gradientWidth={60}
        direction="left"
        play
        loop={0}
      >
        <div className="flex gap-8">
          {/* Duplicating list to make it loop longer */}
          {[...reviews, ...reviews].map((review, index) => (
            <ReviewCard
              key={index}
              name={review.name}
              initial={review.initial}
              review={review.review}
              rating={review.rating}
            />
          ))}
        </div>
      </Marquee>
    </section>
  );
}