const express = require('express');
const router = express.Router();
const upload = require('../config/multer'); // Imports the image upload middleware
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

router.post('/', upload.single('image'), addModel);

router.put('/:id', upload.single('image'), updateModel);
router.delete('/:id', deleteModel);
router.post('/:id/purchase', purchaseModel);

module.exports = router;