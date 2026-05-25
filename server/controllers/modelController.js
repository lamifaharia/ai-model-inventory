const Model = require('../models/Models'); 

const getAllModels = async (req, res) => {
  try {
    const models = await Model.find({});
    res.status(200).json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getModelById = async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }
    res.status(200).json(model);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addModel = async (req, res) => {
  try {
    const { name, framework, useCase, dataset, description, image, createdBy } = req.body;
    
    const newModel = new Model({
      name,
      framework,
      useCase,
      dataset,
      description,
      image, 
      createdBy,
      purchased: 0
    });

    await newModel.save();
    res.status(201).json(newModel);
  } catch (err) {
    console.error("Backend Save Error:", err);
    res.status(500).json({ message: err.message });
  }
};

const updateModel = async (req, res) => {
  try {
    const { name, framework, useCase, dataset, description, image } = req.body;
    let updateFields = { name, framework, useCase, dataset, description, image };

    const updatedModel = await Model.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true } 
    );

    if (!updatedModel) {
      return res.status(404).json({ message: "Model not found to update" });
    }
    res.status(200).json(updatedModel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteModel = async (req, res) => {
  try {
    const deletedModel = await Model.findByIdAndDelete(req.params.id);
    if (!deletedModel) {
      return res.status(404).json({ message: "Model not found to delete" });
    }
    res.status(200).json({ message: "Model deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const purchaseModel = async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }
    
    model.purchased = (model.purchased || 0) + 1;
    await model.save();

    res.status(200).json({ message: "Model purchased successfully!", model });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyModels = async (req, res) => {
  try {
    const models = await Model.find({});
    res.status(200).json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllModels,
  getModelById,
  addModel,
  updateModel,
  deleteModel,
  purchaseModel,
  getMyModels
};