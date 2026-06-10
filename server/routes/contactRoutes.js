const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const { submitContact, getAllContacts, updateContactStatus } = require('../controllers/contactController');

router.post('/', submitContact);
router.get('/', verifyToken, verifyAdmin, getAllContacts);
router.put('/:id', verifyToken, verifyAdmin, updateContactStatus);

module.exports = router;