const express = require('express');
const router = express.Router();
const upload = require('../config/multer'); // Keep this for routes that actually need file uploads (like update)
const {
  getAllModels,
  getModelById,
  addModel,
  updateModel,
  deleteModel,
  purchaseModel,
  getMyModels
} = require('../controllers/modelController');

router.get('/', getAllModels);
router.get('/my-models', getMyModels);
router.get('/:id', getModelById);

router.post('/', addModel);

router.put('/:id', upload.single('image'), updateModel); // Keep multer here if you want to allow file updates
router.delete('/:id', deleteModel);
router.post('/:id/purchase', purchaseModel);

module.exports = router;