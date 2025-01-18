import React from 'react';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

const Contactus = () => {
  const address = "Patthhar Phod Darwaja, Near Nagpur Freight Carrier Jalalpura, Central Avenue Road Gandhibagh, Nagpur, Maharashtra - 440002";

  const handleGetDirections = () => {
    // Encode the address for URL
    const encodedAddress = encodeURIComponent(address);
    // Open Google Maps in new tab
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  return (
    <section id="contactus" className="py-20 px-6 lg:px-20">
      <h2 className="text-[40px] font-bold mb-[3rem] text-center uppercase font-comic">Contact us</h2>
      
      <div className="grid lg:grid-cols-2 gap-8 items-start overflow-hidden ">
        <div className="w-full h-[400px] relative overflow-hidden " data-aos="fade-right" data-aos-duration="1000">
          <div className="absolute bottom-[1rem] left-4 z-10 bg-white py-2 px-4 rounded-md shadow-md">
            <p className="text-[#B95C50] font-medium">Sakode & Company</p>
            <p className="text-sm text-gray-600">Gandhibagh, Nagpur</p>
          </div>
          
          <button 
            onClick={handleGetDirections}
            className="absolute top-4 right-4 z-10 bg-white py-2 px-4 rounded-md shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <p className="text-[#B95C50] font-medium flex items-center gap-2">
              Get Direction <MapPin size={16} />
            </p>
          </button>  
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.062879335268!2d79.10388327508434!3d21.14989578052997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0cbaf588af5%3A0x7fb90bf1125ae13a!2z4KS44KSV4KWL4KSh4KWHIOCkhuCko-CkvyDgpJXgpILgpKrgpKjgpYA!5e0!3m2!1sen!2sin!4v1732726902925!5m2!1sen!2sin"
            className="w-full h-full rounded-xl"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          
          <div className="absolute bottom-4 right-4 z-10 bg-white rounded-md shadow-md">
            <button className="p-2 border-r hover:bg-gray-50">
              <MapPin size={20} />
            </button>
            <button className="p-2 hover:bg-gray-50">
              <span className="text-2xl">+</span>
            </button>
            <button className="p-2 border-l hover:bg-gray-50">
              <span className="text-2xl">−</span>
            </button>
          </div>
        </div>

        <div className="space-y-8" >
          <div className="flex items-start gap-4" data-aos='fade-down' data-aos-delay='500'>
            <MapPin className="text-[#B95C50] mt-1" size={44} />
            <div>
              <h3 className="font-medium text-lg mb-2">Our Office Address</h3>
              <p className="text-gray-600">{address}</p>
            </div>
          </div>

          <div className="flex items-start gap-4" data-aos='fade-down' data-aos-delay='1000'>
            <Mail className="text-[#B95C50] mt-1" size={24} />
            <div>
              <h3 className="font-medium text-lg mb-2">General Enquiries</h3>
              <p className="text-gray-600">tradevistasnc@gamil.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4" data-aos='fade-up' data-aos-delay='1500'>
            <Phone className="text-[#B95C50] mt-1" size={24} />
            <div>
              <h3 className="font-medium text-lg mb-2">Call Us</h3>
              <p className="text-gray-600">+91-9307146830</p>
            </div>
          </div>

          <div className="flex items-start gap-4" data-aos='fade-up' data-aos-delay='2000'>
            <Clock className="text-[#B95C50] mt-1" size={24} />
            <div>
              <h3 className="font-medium text-lg mb-2">Our Timing</h3>
              <p className="text-gray-600">Mon - Sat : 10:00 AM - 08:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactus;