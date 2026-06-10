const Model = require('../models/Models');
const mongoose = require('mongoose');

const getAllModels = async (req, res) => {
  try {
    const { search, framework, useCase, sort, page = 1, limit = 8 } = req.query;
    const filter = {};
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (framework) filter.framework = framework;
    if (useCase) filter.useCase = useCase;

    let sortOption = { createdAt: -1 };
    if (sort === 'purchased') sortOption = { purchased: -1 };
    if (sort === 'name') sortOption = { name: 1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [models, total] = await Promise.all([
      Model.find(filter).sort(sortOption).skip(skip).limit(parseInt(limit)),
      Model.countDocuments(filter)
    ]);
    res.status(200).json({ models, total, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getModelById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(404).json({ message: 'Invalid Model ID' });
    const model = await Model.findById(req.params.id);
    if (!model) return res.status(404).json({ message: 'Model not found' });
    res.status(200).json(model);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addModel = async (req, res) => {
  try {
    const { name, framework, useCase, category, dataset, description, image, price } = req.body;
    const newModel = new Model({
      name, framework, useCase,
      category: category || useCase,
      dataset, description, image,
      price: parseFloat(price) || 0,
      createdBy: req.user.email
    });
    await newModel.save();
    res.status(201).json(newModel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateModel = async (req, res) => {
  try {
    const existing = await Model.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Model not found' });
    if (existing.createdBy !== req.user.email && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });
    const { name, framework, useCase, category, dataset, description, image, price } = req.body;
    const updated = await Model.findByIdAndUpdate(
      req.params.id,
      { name, framework, useCase, category, dataset, description, image, price: parseFloat(price) || 0 },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteModel = async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (!model) return res.status(404).json({ message: 'Model not found' });
    if (model.createdBy !== req.user.email && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Model deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const purchaseModel = async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (!model) return res.status(404).json({ message: 'Model not found' });
    if (model.createdBy === req.user.email)
      return res.status(400).json({ message: "You can't purchase your own model" });
    if (model.purchasedBy.includes(req.user.email))
      return res.status(400).json({ message: 'Already purchased' });
    model.purchasedBy.push(req.user.email);
    model.purchased += 1;
    await model.save();
    res.status(200).json({ message: 'Purchase successful!', model });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyModels = async (req, res) => {
  try {
    const models = await Model.find({ createdBy: req.user.email }).sort({ createdAt: -1 });
    res.status(200).json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyPurchases = async (req, res) => {
  try {
    const models = await Model.find({ purchasedBy: req.user.email }).sort({ createdAt: -1 });
    res.status(200).json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllModels, getModelById, addModel, updateModel, deleteModel, purchaseModel, getMyModels, getMyPurchases };