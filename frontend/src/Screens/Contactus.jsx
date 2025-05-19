import React from 'react';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

const Contactus = () => {
  const address = "Patthhar Phod Darwaja, Near Nagpur Freight Carrier Jalalpura, Central Avenue Road Gandhibagh, Nagpur, Maharashtra - 440002";

  const handleGetDirections = () => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  const contactDetails = [
    {
      icon: <MapPin className="text-[#B95C50] mt-1" size={44} />,
      title: "Our Office Address",
      content: address,
      delay: 500,
    },
    {
      icon: <Mail className="text-[#B95C50] mt-1" size={24} />,
      title: "General Enquiries",
      content: "tradevistasnc@gamil.com",
      delay: 1000,
    },
    {
      icon: <Phone className="text-[#B95C50] mt-1" size={24} />,
      title: "Call Us",
      content: "+91-9307146830",
      delay: 1500,
    },
    {
      icon: <Clock className="text-[#B95C50] mt-1" size={24} />,
      title: "Our Timing",
      content: "Mon - Sat : 10:00 AM - 08:00 PM",
      delay: 2000,
    },
  ];

  return (
    <section id="contactus" className="py-20 px-6 lg:px-20">
      <h2 className="text-[40px] font-bold mb-[3rem] text-center uppercase font-comic">
        Contact us
      </h2>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Map Section */}
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden" data-aos="fade-right" data-aos-duration="1000">
          {/* Info Box Bottom Left */}
          <div className="absolute bottom-4 left-4 z-10 bg-white py-2 px-4 rounded-md shadow-md">
            <p className="text-[#B95C50] font-medium">Sakode & Company</p>
            <p className="text-sm text-gray-600">Gandhibagh, Nagpur</p>
          </div>

          {/* Get Directions Button */}
          <button
            onClick={handleGetDirections}
            className="absolute top-4 right-4 z-10 bg-white py-2 px-4 rounded-md shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Get Directions"
          >
            <span className="text-[#B95C50] font-medium flex items-center gap-2">
              Get Direction <MapPin size={16} />
            </span>
          </button>

          {/* Google Maps iframe */}
          <iframe
            title="Sakode & Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.062879335268!2d79.10388327508434!3d21.14989578052997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0cbaf588af5%3A0x7fb90bf1125ae13a!2z4KS44KSV4KWL4KSh4KWHIOCkhuCko-CkvyDgpJXgpILgpKrgpKjgpYA!5e0!3m2!1sen!2sin!4v1732726902925!5m2!1sen!2sin"
            className="w-full h-full border-0 rounded-xl"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>

          {/* Mini Controls */}
          <div className="absolute bottom-4 right-4 z-10 bg-white rounded-md shadow-md flex divide-x">
            <button className="p-2 hover:bg-gray-50" aria-label="Location pin">
              <MapPin size={20} />
            </button>
            <button className="p-2 hover:bg-gray-50" aria-label="Zoom in">+</button>
            <button className="p-2 hover:bg-gray-50" aria-label="Zoom out">−</button>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="space-y-8">
          {contactDetails.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4"
              data-aos="fade-down"
              data-aos-delay={item.delay}
            >
              {item.icon}
              <div>
                <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contactus;