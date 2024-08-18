const express = require("express");
const User = require("./models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, profileImage, admin } = req.body;

        // Validate the presence of username, email, and password
        if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400).json({ message: 'Todos os campos sao necessarios' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuario ja existente' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const user = new User({ 
            firstName, 
            lastName,
            username,
            email,
            password: hashedPassword,
            profileImage,
            admin: admin === 'true' 
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export the router so it can be used in server.js
module.exports = router;
