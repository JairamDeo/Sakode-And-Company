// routes/sarees.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { cloudinary, uploadImageToCloudinary } = require('../middleware/cloudinary');
const Saree = require('../models/Saree');

// Set up multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle uploading saree details with multiple images
router.post('/upload', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'thumbnailImages', maxCount: 5 }
]), async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: 'Main image is required.' });
        }

        // Upload main image to Cloudinary
        const mainImageResult = await uploadImageToCloudinary(req.files.image[0]);
        
        // Upload thumbnail images (if any)
        let thumbnailUrls = [];
        if (req.files.thumbnailImages && req.files.thumbnailImages.length > 0) {
            const thumbnailPromises = req.files.thumbnailImages.map(file => 
                uploadImageToCloudinary(file)
            );
            
            const thumbnailResults = await Promise.all(thumbnailPromises);
            thumbnailUrls = thumbnailResults.map(result => result.secure_url);
        }

        // Create a new saree document
        const newSaree = new Saree({
            name: req.body.name,
            description: req.body.description,
            imageUrl: mainImageResult.secure_url, // URL of the main uploaded image
            thumbnailImages: thumbnailUrls,
            category: req.body.category,
            uploadDate: new Date(),
        });

        // Save saree to database
        await newSaree.save();
        res.status(200).json({ message: 'Saree uploaded successfully', saree: newSaree });
    } catch (error) {
        console.error('Error uploading saree:', error);
        res.status(500).json({ message: 'Error uploading saree', error });
    }
});

// Route to fetch sarees by category with optional limit and pagination
router.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const limit = parseInt(req.query.limit) || 20;  // default to 20 items
        const page = parseInt(req.query.page) || 1;      // default to page 1
        const skip = (page - 1) * limit;

        const sarees = await Saree.find({ category })
            .sort({ uploadDate: -1 }) // newest first
            .skip(skip)
            .limit(limit);

        if (!sarees || sarees.length === 0) {
            return res.status(404).json({ message: `No sarees found for category: ${category}` });
        }

        res.status(200).json(sarees);
    } catch (error) {
        console.error('Error fetching sarees:', error);
        res.status(500).json({ message: 'Error fetching sarees', error });
    }
});

module.exports = router;