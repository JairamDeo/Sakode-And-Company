const express = require('express');
const router = express.Router();
const multer = require('multer');
const { cloudinary, uploadImageToCloudinary } = require('../middleware/cloudinary');
const Saree = require('../models/Saree');

// Set up multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle uploading saree details
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        // Upload image to Cloudinary
        const result = await uploadImageToCloudinary(req.file);

        // Create a new saree document
        const newSaree = new Saree({
            name: req.body.name,
            description: req.body.description,
            imageUrl: result.secure_url, // URL of the uploaded image
            category: req.body.category,
            uploadDate: new Date().toLocaleString(),
        });

        // Save saree to database
        await newSaree.save();
        res.status(200).json({ message: 'Saree uploaded successfully', saree: newSaree });
    } catch (error) {
        console.error('Error uploading saree:', error);
        res.status(500).json({ message: 'Error uploading saree', error });
    }
});


// Route to fetch sarees by category
router.get('/category/:category', async (req, res) => {
  try {
      const category = req.params.category;
      const sarees = await Saree.find({ category });

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
