const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const {
  getAllModels,
  getModelById,
  addModel,
  updateModel,
  deleteModel,
  purchaseModel,
  getMyModels,
  getMyPurchases 
} = require('../controllers/modelController');

router.get('/', getAllModels);
router.get('/my-models', getMyModels);
router.get('/my-purchases', getMyPurchases); 
router.get('/:id', getModelById);

router.post('/', addModel);
router.put('/:id', upload.single('image'), updateModel);
router.delete('/:id', deleteModel);
router.post('/:id/purchase', purchaseModel);

module.exports = router;