import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FancyPage = () => {
    const [fancySarees, setFancySarees] = useState([]);
    const [error, setError] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchFancySarees = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/sarees/category/Fancy`);
                setFancySarees([...response.data].reverse());
            } catch (error) {
                setError('Error fetching fancy sarees');
                console.error(error);
            }
        };
        fetchFancySarees();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
        const formattedDate = new Date(dateString).toLocaleString('en-GB', options); // 'en-GB' ensures dd/mm/yyyy format
        return formattedDate;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Fancy Sarees</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex flex-wrap justify-center gap-12">
                {fancySarees.map((saree) => (
                    <div 
                        key={saree._id} 
                        className="w-[295px] min-h-[420px] bg-white rounded-lg shadow-md"
                    >
                        <div className="h-[320px] overflow-hidden">
                            <img 
                                src={saree.imageUrl} 
                                alt={saree.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg text-center font-semibold mb-2 truncate">{saree.name}</h3>
                            <p className="text-gray-600 text-sm text-center break-words">{saree.description}</p>
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

export default FancyPage;