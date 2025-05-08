import React from 'react';
import Marquee from "react-fast-marquee";

const ReviewCard = ({ name, initial, review, rating }) => {
    return (
        <div className="p-4 shadow-lg rounded-lg border w-78">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-700">{initial}</span>
                </div>
                <h3 className="font-semibold text-lg">{name}</h3>
            </div>
            <div className="mt-2 text-yellow-500">{"⭐".repeat(rating)}</div>
            <p className="mt-2 text-gray-600">{review}</p>
        </div>
    );
};

export default function Reviews() {
    const reviews = [
        { name: "Aarushi Patel", initial: "A", review: "Loved the fabric quality and the intricate designs. Definitely buying again!", rating: 5 },
        { name: "Ritika Sharma", initial: "R", review: "Beautiful collection! The color was slightly different, but still gorgeous.", rating: 5 },
        { name: "Sneha Verma", initial: "S", review: "Absolutely stunning! The saree was exactly as shown in the pictures.", rating: 5 },
        { name: "Aarushi Patel", initial: "A", review: "Loved the fabric quality and the intricate designs. Definitely buying again!", rating: 5 },
        { name: "Ritika Sharma", initial: "R", review: "Beautiful collection! The color was slightly different, but still gorgeous.", rating: 5 },
        { name: "Sneha Verma", initial: "S", review: "Absolutely stunning! The saree was exactly as shown in the pictures.", rating: 5 },        
    ];

    return (
        <div id='reviews'>
            <div className="bg-white py-10 px-5">
                <h2 className="text-[40px] font-bold mb-[3rem] text-center uppercase font-comic">
                    Customer Reviews
                </h2>

                {/* Marquee Effect */}
                <Marquee pauseOnHover speed={50} gradient gradientWidth={50} direction="left" loop={0} play>
                    <div className="flex gap-6">
                        {reviews.map((review, index) => (
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
            </div>
        </div>
    );
}