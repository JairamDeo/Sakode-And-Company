// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Route to add a new review
router.post('/add', async (req, res) => {
    try {
        const { name, review, rating } = req.body;
        
        // Create initial from the first letter of the name
        const initial = name.charAt(0).toUpperCase();
        
        // Create a new review document
        const newReview = new Review({
            name,
            initial,
            review,
            rating
        });
        
        // Save review to database
        await newReview.save();
        res.status(200).json({ 
            success: true,
            message: 'Review added successfully', 
            review: newReview 
        });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error adding review', 
            error 
        });
    }
});

// Route to get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find()
            .sort({ createdAt: -1 }); // newest first
            
        res.status(200).json({
            success: true,
            reviews
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching reviews', 
            error 
        });
    }
});

module.exports = router;