const express = require('express');
const router = express.Router();
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
router.put('/:id', updateModel);
router.delete('/:id', deleteModel);
router.post('/:id/purchase', purchaseModel);

module.exports = router;