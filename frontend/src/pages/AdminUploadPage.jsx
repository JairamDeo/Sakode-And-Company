import React, { useState } from 'react';
import axios from 'axios';
import successGif from '../assets/success.gif';

const AdminUploadPage = () => {
  const [image, setImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [webpPreviewUrl, setWebpPreviewUrl] = useState(null); // ✅ WebP preview
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false); // ✅ Drag-and-drop highlight

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ✅ Convert image to WebP with quality control
  const convertToWebP = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('WebP conversion failed'));
            }
          },
          'image/webp',
          0.8 // ✅ Quality setting: 0.0 (lowest) to 1.0 (best)
        );
      };

      img.onerror = () => reject(new Error('Image load error'));
      reader.onerror = () => reject(new Error('File read error'));

      reader.readAsDataURL(file);
    });
  };

  const processFile = async (file) => {
    if (!file) return;
    setImage(file);
    try {
      const webpBlob = await convertToWebP(file);
      const webpFile = new File([webpBlob], file.name.replace(/\.[^/.]+$/, '') + '.webp', {
        type: 'image/webp',
      });
      setConvertedImage(webpFile);
      setWebpPreviewUrl(URL.createObjectURL(webpBlob)); // ✅ Show WebP preview
    } catch (error) {
      console.error('Error converting image to WebP:', error);
      setMessage('Error converting image. Please try another file.');
    }
  };

  const handleFileChange = (e) => {
    processFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!convertedImage || !name || !description || !category) {
      setMessage('Please fill out all fields');
      return;
    }

    const formData = new FormData();
    formData.append('image', convertedImage);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('dateTime', new Date().toLocaleString());

    setLoading(true);
    setMessage('');
    setShowSuccess(false);
    setUploadProgress(0);

    try {
      const response = await axios.post(`${backendUrl}/api/sarees/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
          if (progress === 100) {
            setShowSuccess(true);
            setLoading(false);
            setImage(null);
            setConvertedImage(null);
            setWebpPreviewUrl(null); // ✅ Clear preview
            setName('');
            setDescription('');
            setCategory('');
            setTimeout(() => setShowSuccess(false), 2500);
          }
        },
      });
    } catch (error) {
      setLoading(false);
      setUploadProgress(0);
      setMessage('Error uploading the file. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-6 lg:p-8">
      {/* ✅ Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl animate-bounce">
            <img src={successGif} alt="Success" className="w-40 h-40 rounded-lg" />
            <p className="text-center text-lg font-medium mt-4">Upload Successful!</p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h1 className="text-3xl font-bold text-white text-center">Upload Saree</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Inputs */}
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Saree Name" required className="w-full px-4 py-2 border rounded" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required className="w-full px-4 py-2 border rounded" />
            <select value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full px-4 py-2 border rounded">
              <option value="">Select Category</option>
              <option value="Synthetic">Synthetic</option>
              <option value="Cotton">Cotton</option>
              <option value="Shalu">Shalu</option>
              <option value="Zari">Zari</option>
              <option value="Fancy">Fancy</option>
            </select>

            {/* ✅ Drag & Drop File Upload */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`mt-2 flex justify-center items-center px-6 pt-5 pb-6 border-2 ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              } border-dashed rounded-lg transition-all`}
            >
              <div className="space-y-1 text-center">
                <p className="text-gray-600">Drag & drop an image or click below</p>
                <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" id="file-upload" />
                <label htmlFor="file-upload" className="cursor-pointer text-blue-600 font-medium">
                  Choose Image
                </label>
              </div>
            </div>

            {/* ✅ WebP Preview */}
            {webpPreviewUrl && (
              <div className="mt-4 text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">WebP Preview:</p>
                <img src={webpPreviewUrl} alt="WebP Preview" className="w-32 h-32 object-cover rounded-lg mx-auto shadow-md" />
              </div>
            )}

            {uploadProgress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}

            {message && <p className="text-red-600">{message}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Saree'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUploadPage;