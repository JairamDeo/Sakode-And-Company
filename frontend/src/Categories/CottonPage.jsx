import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CottonPage = () => {
    const [cottonSarees, setCottonSarees] = useState([]);
    const [error, setError] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchCottonSarees = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/sarees/category/Cotton`);
                setCottonSarees([...response.data].reverse());
            } catch (error) {
                setError('No Saree Uploaded!');
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

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Cotton Sarees</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex flex-wrap justify-center gap-8">
                {cottonSarees.map((saree) => (
                    <div 
                        key={saree._id} 
                        className="w-[330px] h-auto bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                    >
                        <div className="h-[340px] w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                            <img 
                                src={saree.imageUrl} 
                                alt={saree.name}
                                className="w-full h-full object-fit"
                                loading='lazy'
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-1 text-center truncate">{saree.name}</h3>
                            <p className="text-gray-600 text-sm text-center line-clamp-2">{saree.description}</p>
                            <p className="text-gray-500 text-xs text-center mt-2">
                                Uploaded on: {formatDate(saree.uploadDate)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CottonPage;