const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, unique: false },
    lastName: { type: String, required: true, unique: false },
    username: { type: String, required: true },
    admin: {type: Boolean, required: false},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    profileImage: { type: String, required: false, default: "default-image-url" },

      // Other user fields...
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item' // Assuming you have an Item model
    }
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
