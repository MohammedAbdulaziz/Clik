const User = require('../models/User');

async function getProfile(req, res) {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function editProfile(req, res) {
    try {
      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const { email, password, name } = req.body;
      if (email) {
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== userId) {
          return res.status(409).json({ error: 'Email already taken' });
        }
        user.email = email;
      }
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
  
      if (name) {
        user.name = name;
      }
  
      const updatedUser = await user.save();
      res.status(200).json({ message: 'Edit profile successful', user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

module.exports = { getProfile, editProfile };