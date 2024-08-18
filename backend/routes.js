const express = require("express");
const User = require("./models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

// signup
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

// test signup:
// {
// 	"firstName" : "Paulo",
// 	"lastName" : "Oliveira",
// 	"username" : "paulooliveira152012",
// 	"email" : "paulo@gmail.com",
// 	"admin" : "true",
// 	"password" : "123456789"
// }

// login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Convert user to object and remove sensitive data
      const userObject = user.toObject();
      delete userObject.password;
  
      res.status(200).json(userObject);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// test login:
// 	"email" : "paulo@gmail.com",
// 	"password" : "123456789"

// video Listing for my play list
// video fetching
// user info update
// account delete



// Export the router so it can be used in server.js
module.exports = router;
