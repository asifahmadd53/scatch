const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config'); // Ensure multer is configured with memory storage
const productModel = require('../models/product-model');

router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        if (!req.file) {
            return res.status(400).send({ error: 'No image file uploaded.' });
        }

        // Convert image buffer to Base64
        const imageBase64 = req.file.buffer.toString('base64');
        const imageMimeType = req.file.mimetype;
        const imageSrc = `data:${imageMimeType};base64,${imageBase64}`;

        // Save the product with the Base64 image string
        const product = await productModel.create({
            image: imageSrc,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        });

        res.status(201).send(product);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while creating the product.' });
        console.error('Error creating product:', error);
    }
});

module.exports = router;
