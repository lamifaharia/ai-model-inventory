const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getAllModels, getModelById, addModel, updateModel, deleteModel, purchaseModel, getMyModels, getMyPurchases } = require('../controllers/modelController');

router.get('/', getAllModels);
router.get('/my-models', verifyToken, getMyModels);
router.get('/my-purchases', verifyToken, getMyPurchases);
router.get('/:id', getModelById);
router.post('/', verifyToken, addModel);
router.put('/:id', verifyToken, updateModel);
router.delete('/:id', verifyToken, deleteModel);
router.post('/:id/purchase', verifyToken, purchaseModel);

module.exports = router;