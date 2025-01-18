import React, { useState } from 'react';
import axios from 'axios';
import successGif from '../assets/success.gif';

const AdminUploadPage = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  
  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !name || !description || !category) {
      setMessage('Please fill out all fields');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('dateTime', new Date().toLocaleString());

    setLoading(true);
    setMessage('');
    setShowSuccess(false);
    setUploadProgress(0);

    try {
      const controller = new AbortController();
      const response = await axios.post(`${backendUrl}/api/sarees/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        signal: controller.signal,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
          if (progress === 100) {
            setShowSuccess(true);
            setLoading(false);
            // Clear form immediately after upload
            setImage(null);
            setName('');
            setDescription('');
            setCategory('');
            // Navigate faster
            setTimeout(() => setShowSuccess(false), 2500);
          }
        },
      });

    } catch (error) {
      setLoading(false);
      setUploadProgress(0);
      console.error('Error uploading the file:', error);
      setMessage('Error uploading the file. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-6 lg:p-8">
      {/* Success Animation Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl transform scale-100 animate-bounce">
            <img
              src={successGif}
              alt="Success"
              className="w-40 h-40 object-cover rounded-lg"
            />
            <p className="text-center text-lg font-medium text-gray-800 mt-4">
              Upload Successful!
            </p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h1 className="text-3xl font-bold text-white text-center">
              Upload Saree
            </h1>
          </div> 

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Name of Saree
              </label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter saree name"
                required
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[100px]"
                placeholder="Enter saree description"
                required
              />
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Choose Category
              </label>
              <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              >
                <option value="">Select Category</option>
                <option value="Synthetic">Synthetic</option>
                <option value="Cotton">Cotton</option>
                <option value="Shalu">Shalu</option>
                <option value="Zari">Zari</option>
                <option value="Fancy">Fancy</option>
              </select>
            </div>

            {/* File Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Choose Image
              </label>
              <div className="mt-1 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-all duration-200">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer text-center mx-auto bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span className='text-center'>Upload Your Saree Image</span>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="sr-only"
                        accept="image/*"
                        required
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
                
                {/* Selected File Preview */}
                {image && (
                  <div className="mt-4 text-center">
                    <div className="bg-blue-50 rounded-lg p-3 inline-flex items-center">
                      <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">
                        Selected: {image.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {message && (
              <div className={`text-center p-3 rounded-lg ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}

            {/* Submit Button with Progress */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium text-lg hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Uploading... {uploadProgress}%</span>
                  </div>
                </div>
              ) : (
                'Upload Saree'
              )}
              {loading && (
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-50"
                  style={{ width: `${uploadProgress}%`, transition: 'width 1s ease-in-out' }}
                />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUploadPage;