
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CottonPage = () => {
    const [cottonSarees, setCottonSarees] = useState([]);
    const [error, setError] = useState(null);
    const [activeSlides, setActiveSlides] = useState({});
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchCottonSarees = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/sarees/category/Cotton`);
                setCottonSarees([...response.data].reverse());
                
                // Initialize active slides
                const initialActiveSlides = {};
                response.data.forEach(saree => {
                    initialActiveSlides[saree._id] = 0;
                });
                setActiveSlides(initialActiveSlides);
            } catch (error) {
                setError('No Sarees Uploaded Yet!');
                console.error(error);
            }
        };
        fetchCottonSarees();
    }, []);

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        };
        return new Date(dateString).toLocaleString('en-GB', options);
    };

    const nextSlide = (sareeId, maxSlides) => {
        setActiveSlides(prev => ({
            ...prev,
            [sareeId]: (prev[sareeId] + 1) % maxSlides
        }));
    };

    const prevSlide = (sareeId, maxSlides) => {
        setActiveSlides(prev => ({
            ...prev,
            [sareeId]: (prev[sareeId] - 1 + maxSlides) % maxSlides
        }));
    };

    const goToSlide = (sareeId, slideIndex) => {
        setActiveSlides(prev => ({
            ...prev,
            [sareeId]: slideIndex
        }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Cotton Sarees</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex flex-wrap justify-center gap-8">
                {cottonSarees.map((saree) => {
                    // Combine main image with thumbnails for the carousel
                    const allImages = [saree.imageUrl, ...(saree.thumbnailImages || [])];
                    const currentSlide = activeSlides[saree._id] || 0;
                    
                    return (
                        <div 
                            key={saree._id} 
                            className="w-[330px] h-auto bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                        >
                            <div className="relative h-[340px] w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                {/* Carousel Images */}
                                {allImages.map((imgSrc, imgIndex) => (
                                    <img 
                                        key={imgIndex}
                                        src={imgSrc} 
                                        alt={`${saree.name} - Image ${imgIndex + 1}`}
                                        className={`absolute w-full h-full object-fit transition-opacity duration-300 ${
                                            currentSlide === imgIndex ? 'opacity-100' : 'opacity-0'
                                        }`}
                                        loading='lazy'
                                    />
                                ))}
                                
                                {/* Carousel Controls - only show if there are multiple images */}
                                {allImages.length > 1 && (
                                    <>
                                        {/* Previous Button */}
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                prevSlide(saree._id, allImages.length);
                                            }}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 z-10"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        
                                        {/* Next Button */}
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                nextSlide(saree._id, allImages.length);
                                            }}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 z-10"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                        
                                        {/* Indicators */}
                                        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
                                            {allImages.map((_, imgIndex) => (
                                                <button 
                                                    key={imgIndex}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        goToSlide(saree._id, imgIndex);
                                                    }}
                                                    className={`h-2 w-2 rounded-full ${
                                                        currentSlide === imgIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-1 text-center truncate">{saree.name}</h3>
                                <p className="text-gray-600 text-sm text-center line-clamp-2">{saree.description}</p>
                                <p className="text-gray-500 text-xs text-center mt-2">
                                    Uploaded on: {formatDate(saree.uploadDate)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CottonPage;