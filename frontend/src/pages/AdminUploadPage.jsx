import React, { useState, useEffect } from 'react';
import axios from 'axios';
import successGif from '../assets/success.gif';

const AdminUploadPage = () => {
  const [mainImage, setMainImage] = useState(null);
  const [thumbnailImages, setThumbnailImages] = useState([]);
  const [convertedMainImage, setConvertedMainImage] = useState(null);
  const [convertedThumbnailImages, setConvertedThumbnailImages] = useState([]);
  const [mainWebpPreviewUrl, setMainWebpPreviewUrl] = useState(null);
  const [thumbnailWebpPreviewUrls, setThumbnailWebpPreviewUrls] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDraggingMain, setIsDraggingMain] = useState(false);
  const [isDraggingThumbnails, setIsDraggingThumbnails] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Convert image to WebP with quality control
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
          0.8 // Quality setting: 0.0 (lowest) to 1.0 (best)
        );
      };

      img.onerror = () => reject(new Error('Image load error'));
      reader.onerror = () => reject(new Error('File read error'));

      reader.readAsDataURL(file);
    });
  };

  // Process main image file
  const processMainFile = async (file) => {
    if (!file) return;
    setMainImage(file);
    try {
      const webpBlob = await convertToWebP(file);
      const webpFile = new File([webpBlob], file.name.replace(/\.[^/.]+$/, '') + '.webp', {
        type: 'image/webp',
      });
      setConvertedMainImage(webpFile);
      setMainWebpPreviewUrl(URL.createObjectURL(webpBlob));
    } catch (error) {
      console.error('Error converting main image to WebP:', error);
      setMessage('Error converting main image. Please try another file.');
    }
  };

  // Process thumbnail image files
  const processThumbnailFiles = async (files) => {
    if (!files || files.length === 0) return;
    
    setThumbnailImages([...thumbnailImages, ...files]);
    
    try {
      const webpPromises = Array.from(files).map(async (file) => {
        const webpBlob = await convertToWebP(file);
        const webpFile = new File([webpBlob], file.name.replace(/\.[^/.]+$/, '') + '.webp', {
          type: 'image/webp',
        });
        const previewUrl = URL.createObjectURL(webpBlob);
        return { file: webpFile, preview: previewUrl };
      });
      
      const results = await Promise.all(webpPromises);
      
      setConvertedThumbnailImages([...convertedThumbnailImages, ...results.map(r => r.file)]);
      setThumbnailWebpPreviewUrls([...thumbnailWebpPreviewUrls, ...results.map(r => r.preview)]);
    } catch (error) {
      console.error('Error converting thumbnail images to WebP:', error);
      setMessage('Error converting thumbnail images. Please try other files.');
    }
  };

  // Handle main image file change
  const handleMainFileChange = (e) => {
    processMainFile(e.target.files[0]);
  };

  // Handle thumbnail images file change
  const handleThumbnailFilesChange = (e) => {
    processThumbnailFiles(e.target.files);
  };

  // Handle main image drag and drop
  const handleMainDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingMain(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processMainFile(e.dataTransfer.files[0]);
    }
  };

  // Handle thumbnail images drag and drop
  const handleThumbnailsDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingThumbnails(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processThumbnailFiles(e.dataTransfer.files);
    }
  };

  // Handle drag events
  const handleDragOver = (e, setter) => {
    e.preventDefault();
    setter(true);
  };

  const handleDragLeave = (setter) => {
    setter(false);
  };

  // Remove a thumbnail
  const handleRemoveThumbnail = (index) => {
    const newThumbnails = [...thumbnailImages];
    const newConvertedThumbnails = [...convertedThumbnailImages];
    const newPreviews = [...thumbnailWebpPreviewUrls];
    
    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(newPreviews[index]);
    
    newThumbnails.splice(index, 1);
    newConvertedThumbnails.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setThumbnailImages(newThumbnails);
    setConvertedThumbnailImages(newConvertedThumbnails);
    setThumbnailWebpPreviewUrls(newPreviews);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!convertedMainImage || !name || !description || !category) {
      setMessage('Please fill out all required fields and upload a main image');
      return;
    }

    const formData = new FormData();
    formData.append('image', convertedMainImage);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('dateTime', new Date().toLocaleString());

    // Append all thumbnail images
    convertedThumbnailImages.forEach((thumbnail) => {
      formData.append('thumbnailImages', thumbnail);
    });

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
            resetForm();
            setTimeout(() => setShowSuccess(false), 2500);
          }
        },
      });
    } catch (error) {
      setLoading(false);
      setUploadProgress(0);
      setMessage('Error uploading the saree. Please try again.');
      console.error(error);
    }
  };

  // Reset form after successful upload
  const resetForm = () => {
    setMainImage(null);
    setThumbnailImages([]);
    setConvertedMainImage(null);
    setConvertedThumbnailImages([]);
    setMainWebpPreviewUrl(null);
    
    // Clean up object URLs to prevent memory leaks
    thumbnailWebpPreviewUrls.forEach(url => URL.revokeObjectURL(url));
    setThumbnailWebpPreviewUrls([]);
    
    setName('');
    setDescription('');
    setCategory('');
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (mainWebpPreviewUrl) URL.revokeObjectURL(mainWebpPreviewUrl);
      thumbnailWebpPreviewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [mainWebpPreviewUrl, thumbnailWebpPreviewUrls]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-6 lg:p-8">
      {/* Success Overlay */}
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

            {/* Main Image Upload */}
            <div className="space-y-2">
              <p className="font-medium text-gray-700">Main Image (Required)</p>
              <div
                onDrop={handleMainDrop}
                onDragOver={(e) => handleDragOver(e, setIsDraggingMain)}
                onDragLeave={() => handleDragLeave(setIsDraggingMain)}
                className={`flex justify-center items-center px-6 pt-5 pb-6 border-2 ${
                  isDraggingMain ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                } border-dashed rounded-lg transition-all`}
              >
                <div className="space-y-1 text-center">
                  <p className="text-gray-600">Drag & drop main image or click below</p>
                  <input type="file" accept="image/*" onChange={handleMainFileChange} className="sr-only" id="main-file-upload" />
                  <label htmlFor="main-file-upload" className="cursor-pointer text-blue-600 font-medium">
                    Choose Main Image
                  </label>
                </div>
              </div>

              {/* Main Image Preview */}
              {mainWebpPreviewUrl && (
                <div className="mt-4 text-center">
                  <p className="text-sm font-medium text-gray-600 mb-2">Main Image Preview:</p>
                  <img src={mainWebpPreviewUrl} alt="Main Image Preview" className="w-32 h-32 object-cover rounded-lg mx-auto shadow-md" />
                </div>
              )}
            </div>

            {/* Thumbnail Images Upload */}
            <div className="space-y-2">
              <p className="font-medium text-gray-700">Additional Images (Optional, max 5)</p>
              <div
                onDrop={handleThumbnailsDrop}
                onDragOver={(e) => handleDragOver(e, setIsDraggingThumbnails)}
                onDragLeave={() => handleDragLeave(setIsDraggingThumbnails)}
                className={`flex justify-center items-center px-6 pt-5 pb-6 border-2 ${
                  isDraggingThumbnails ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                } border-dashed rounded-lg transition-all`}
              >
                <div className="space-y-1 text-center">
                  <p className="text-gray-600">Drag & drop additional images or click below</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleThumbnailFilesChange} 
                    className="sr-only" 
                    id="thumbnail-files-upload" 
                    multiple 
                    disabled={thumbnailImages.length >= 5}
                  />
                  <label 
                    htmlFor="thumbnail-files-upload" 
                    className={`cursor-pointer ${thumbnailImages.length >= 5 ? 'text-gray-400' : 'text-blue-600'} font-medium`}
                  >
                    {thumbnailImages.length >= 5 ? 'Maximum 5 images reached' : 'Choose Additional Images'}
                  </label>
                </div>
              </div>

              {/* Thumbnail Images Preview */}
              {thumbnailWebpPreviewUrls.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">Additional Images Preview:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {thumbnailWebpPreviewUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <img src={url} alt={`Thumbnail ${index + 1}`} className="w-20 h-20 object-cover rounded-lg shadow-md" />
                        <button
                          type="button"
                          onClick={() => handleRemoveThumbnail(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

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