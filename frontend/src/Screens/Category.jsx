import React from "react";
import { Link } from "react-router-dom";
import synthetic from "../assets/syntheticm.jpg";
import zari from "../assets/zarim.jpg";
import cotton from "../assets/cottonm.jpg";
import shalu from "../assets/shalum.jpg";
import topdyied from "../assets/topdyiedm.jpg";

export default function Category() {
  const cards = [
    {
      id: 1,
      img: synthetic,
      heading: "Synthetic Sarees",
      text: "Affordable and durable, synthetic sarees offer vibrant colors and easy maintenance for any occasion.",
      aosEffect: "flip-left",
      aosDuration: "1500",
      link: "/synthetic", 
    },
    {
      id: 2,
      img: zari,
      heading: "Zari Sarees",
      text: "A luxurious blend of tradition and elegance, featuring intricate gold or silver threadwork for royalty.",
      aosEffect: "zoom-in",
      aosDuration: "2000",
      link: "/zari",
    },
    {
      id: 3,
      img: cotton,
      heading: "Cotton Sarees",
      text: "Lightweight and breathable, cotton sarees offer comfort, simplicity, and elegance for everyday wear.",
      aosEffect: "flip-right",
      aosDuration: "1500",
      link: "/cotton",
    },
    {
      id: 4,
      img: shalu,
      heading: "Shalu Sarees",
      text: "Richly woven and elegant, Shalu sarees offer timeless beauty and grace for festive celebrations.",
      aosEffect: "fade-up",
      aosDuration: "1500",
      link: "/shalu",
    },
    {
      id: 5,
      img: topdyied,
      heading: "Fancy Sarees",
      text: "Graceful and stylish, fancy sarees blend modern trends with traditional designs for elegant occasions.",
      aosEffect: "fade-up",
      aosDuration: "1500",
      link: "/fancy",
    },
  ];

  return (
    <section id="category" className="py-20 px-6 lg:px-20">
      <h2 className="text-[40px] font-bold mb-[3rem] text-center uppercase font-comic">Category</h2>
      <div className="flex flex-wrap justify-center gap-y-24 gap-x-24">
        {cards.map((card) => (
          <div
            key={card.id}
            className="w-[295px] h-[445px] bg-white shadow-lg rounded-lg overflow-hidden text-center"
            data-aos={card.aosEffect} data-aos-duration={card.aosDuration}
          >
            <img
              src={card.img}
              alt={`Card ${card.id}`}
              className="w-full h-64"
            />
            <h1 className="text-md md:text-[22px] text-center mb-3 font-bold uppercase mt-3">{card.heading}</h1>
            <p className="text-sm md:text-md mt-3 text-gray-700 px-3">{card.text}</p>
            <Link to={card.link}>
              <button className="p-1 mt-4 border-2 border-orange-600 w-[130px] h-[40px] rounded-md font-medium hover:bg-orange-600 hover:text-white transition duration-500 ease-in-out">
                View More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
