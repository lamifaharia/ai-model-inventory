const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const syncUser = async (req, res) => {
  try {
    const { email, name, photoURL } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, name: name || 'User', photoURL: photoURL || '' });
    } else {
      user.name = name || user.name;
      user.photoURL = photoURL || user.photoURL;
      await user.save();
    }

    const token = generateToken(user);
    res.status(200).json({ 
      token, 
      user: { email: user.email, name: user.name, role: user.role, photoURL: user.photoURL }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select('-__v');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, photoURL } = req.body;
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { name, photoURL },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      User.find({}).select('-__v').sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments()
    ]);
    res.status(200).json({ users, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStats = async (req, res) => {
  try {
    const Model = require('../models/Models');
    const Contact = require('../models/Contact');

    const [totalUsers, totalModels, totalContacts, recentUsers, topModels] = await Promise.all([
      User.countDocuments(),
      Model.countDocuments(),
      Contact.countDocuments({ status: 'unread' }),
      User.find().sort({ createdAt: -1 }).limit(5).select('name email role createdAt'),
      Model.find().sort({ purchased: -1 }).limit(5).select('name purchased framework useCase')
    ]);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const modelsByMonth = await Model.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      { $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 }
      }},
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    const modelsByCategory = await Model.aggregate([
      { $group: { _id: '$useCase', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({ totalUsers, totalModels, unreadContacts: totalContacts, recentUsers, topModels, modelsByMonth, modelsByCategory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { syncUser, getProfile, updateProfile, getAllUsers, updateUserRole, deleteUser, getStats };