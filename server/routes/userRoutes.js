const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const { syncUser, getProfile, updateProfile, getAllUsers, updateUserRole, deleteUser, getStats } = require('../controllers/userController');

router.post('/sync', syncUser);
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);
router.get('/stats', verifyToken, verifyAdmin, getStats);
router.get('/', verifyToken, verifyAdmin, getAllUsers);
router.put('/:id/role', verifyToken, verifyAdmin, updateUserRole);
router.delete('/:id', verifyToken, verifyAdmin, deleteUser);

module.exports = router;