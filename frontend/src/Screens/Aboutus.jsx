import React from "react";

const Aboutus = () => {
  return (
    <section id="aboutus" className="py-20 px-6 lg:px-20">
      <h2 className="text-[40px] font-bold mb-12 text-center uppercase font-comic">About us</h2>
      
      <div className="flex items-center justify-center mb-8">
        <img
          src=""
          alt="shop-image"
          data-aos="fade-down"
          data-aos-duration="1600"
          className="bg-center"
          loading="lazy"
        />
      </div>
      
      <p
        className="text-justify sm:text-center text-[18px] sm:text-[24px]"
        data-aos="fade-up"
        data-aos-duration="1600"
      >
        We, <span className="font-semibold">Sakode & Company</span>, a <span className="font-semibold">Wholesale Shop</span> situated at <span className="font-semibold text-orange-600">Gandhibagh</span>, <span className="font-semibold">Nagpur, Maharashtra</span>, are your one stop shop for all types and patterns of sarees. Our sarees are available in many different ranges and varieties. We have a qualified team of adroit professionals, who test the entire range of offered sarees to make sure that the clients receive flawless supplies. The demand for our sarees is increasing rapidly owing to their beautiful designs, finest quality and attractive colours.
      </p>
    </section>
  );
};

export default Aboutus;